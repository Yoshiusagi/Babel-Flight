# Makes (and afterwards removes) a short-lived App Store distribution certificate and provisioning
# profile through the App Store Connect API, so the cloud Mac can sign without a registered iPhone.
# Xcode's automatic signing needs a development profile, which needs at least one device; the
# App Store profile made here needs none.
#
#   ruby scripts/asc-signing.rb setup   OUT_DIR   # writes key.pem, cert.pem, profile.mobileprovision, state.json
#   ruby scripts/asc-signing.rb cleanup OUT_DIR   # revokes the certificate and deletes the profile
#
# Environment: ASC_KEY (contents of the .p8), ASC_KEY_ID, ASC_ISSUER_ID, BUNDLE_ID.
# setup also appends SIGN_PROFILE_NAME / SIGN_PROFILE_UUID to $GITHUB_ENV when it is set.
# Builds that were already uploaded stay valid after the certificate is revoked.
require "openssl"
require "net/http"
require "json"
require "base64"
require "fileutils"

def b64url(s) = Base64.urlsafe_encode64(s, padding: false)

def jwt
  key = OpenSSL::PKey.read(ENV.fetch("ASC_KEY"))
  head = { alg: "ES256", kid: ENV.fetch("ASC_KEY_ID"), typ: "JWT" }
  now = Time.now.to_i
  body = { iss: ENV.fetch("ASC_ISSUER_ID"), iat: now, exp: now + 15 * 60, aud: "appstoreconnect-v1" }
  input = "#{b64url(head.to_json)}.#{b64url(body.to_json)}"
  der = key.sign(OpenSSL::Digest.new("SHA256"), input)
  r, s = OpenSSL::ASN1.decode(der).value.map { |i| i.value.to_s(2).rjust(32, "\0") }
  "#{input}.#{b64url(r + s)}"
end

def api(method, path, body = nil)
  uri = URI("https://api.appstoreconnect.apple.com#{path}")
  req = { get: Net::HTTP::Get, post: Net::HTTP::Post, delete: Net::HTTP::Delete }.fetch(method).new(uri)
  req["Authorization"] = "Bearer #{jwt}"
  req["Content-Type"] = "application/json"
  req.body = body.to_json if body
  res = Net::HTTP.start(uri.host, uri.port, use_ssl: true) { |h| h.request(req) }
  data = res.body.to_s.empty? ? {} : JSON.parse(res.body)
  unless res.is_a?(Net::HTTPSuccess)
    msg = (data["errors"] || []).map { |e| "#{e["title"]}: #{e["detail"]}" }.join(" / ")
    abort "::error::App Store Connect #{method.upcase} #{path} -> #{res.code} #{msg}"
  end
  data
end

mode, out = ARGV
abort "usage: asc-signing.rb setup|cleanup OUT_DIR" unless %w[setup cleanup].include?(mode) && out
state_path = File.join(out, "state.json")

if mode == "cleanup"
  exit 0 unless File.exist?(state_path)
  st = JSON.parse(File.read(state_path))
  api(:delete, "/v1/profiles/#{st["profile_id"]}") if st["profile_id"]
  api(:delete, "/v1/certificates/#{st["cert_id"]}") if st["cert_id"]
  puts "removed the temporary certificate and profile"
  exit 0
end

FileUtils.mkdir_p(out)
bundle = ENV.fetch("BUNDLE_ID")
ids = api(:get, "/v1/bundleIds?filter[identifier]=#{bundle}&limit=50")["data"]
bid = ids.find { |d| d["attributes"]["identifier"] == bundle && d["attributes"]["platform"] != "MAC_OS" }
abort "::error::App ID #{bundle} is not registered in the Apple Developer site (Identifiers)" unless bid

key = OpenSSL::PKey::RSA.new(2048)
csr = OpenSSL::X509::Request.new
csr.version = 0
csr.subject = OpenSSL::X509::Name.new([["CN", "Babel Flight CI"], ["C", "JP"]])
csr.public_key = key.public_key
csr.sign(key, OpenSSL::Digest.new("SHA256"))

cert = api(:post, "/v1/certificates", { data: { type: "certificates",
  attributes: { certificateType: "DISTRIBUTION", csrContent: csr.to_pem } } })["data"]
state = { "cert_id" => cert["id"] }
File.write(state_path, state.to_json)
x509 = OpenSSL::X509::Certificate.new(Base64.decode64(cert["attributes"]["certificateContent"]))

name = "Babel Flight CI #{ENV["GITHUB_RUN_NUMBER"] || Time.now.to_i}"
prof = api(:post, "/v1/profiles", { data: { type: "profiles",
  attributes: { name: name, profileType: "IOS_APP_STORE" },
  relationships: { bundleId: { data: { type: "bundleIds", id: bid["id"] } },
                   certificates: { data: [{ type: "certificates", id: cert["id"] }] } } } })["data"]
state["profile_id"] = prof["id"]
File.write(state_path, state.to_json)

File.write(File.join(out, "key.pem"), key.to_pem)
File.write(File.join(out, "cert.pem"), x509.to_pem)
File.binwrite(File.join(out, "profile.mobileprovision"), Base64.decode64(prof["attributes"]["profileContent"]))
uuid = prof["attributes"]["uuid"]
if ENV["GITHUB_ENV"]
  File.open(ENV["GITHUB_ENV"], "a") { |f| f.puts "SIGN_PROFILE_NAME=#{name}", "SIGN_PROFILE_UUID=#{uuid}" }
end
puts "made certificate #{cert["id"]} and profile \"#{name}\" (#{uuid})"
