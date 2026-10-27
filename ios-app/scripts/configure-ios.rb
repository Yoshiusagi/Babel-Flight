# Applies Babel Flight's settings to the Xcode project that `npx cap add ios` generates.
# The ios/ folder is generated fresh on every cloud build, so everything custom lives here
# (and in ../resources) instead of being edited by hand in Xcode.
#
#   ruby scripts/configure-ios.rb
#
# Environment (all optional):
#   APP_VERSION           version shown on the App Store (default: package.json "version")
#   BUILD_NUMBER          build number, must go up with every upload (default: 1)
#   APPLE_TEAM_ID         10-character Team ID for signing
#   GOOGLE_SERVICE_PLIST  path to GoogleService-Info.plist (default: ios-app/GoogleService-Info.plist)
#   ALLOW_PLACEHOLDER_FIREBASE=1  test builds only: use a dummy Firebase config if the real one is missing
require "json"
require "fileutils"
require "xcodeproj"

ROOT = File.expand_path("..", __dir__)
APP_DIR = File.join(ROOT, "ios/App/App")
RES = File.join(ROOT, "resources")
abort "ios/ not found: run `npx cap add ios` first" unless Dir.exist?(APP_DIR)

pkg = JSON.parse(File.read(File.join(ROOT, "package.json")))
cap = JSON.parse(File.read(File.join(ROOT, "capacitor.config.json")))
version = ENV.fetch("APP_VERSION", pkg["version"] || "1.0.0")
build = ENV.fetch("BUILD_NUMBER", "1")
team = ENV["APPLE_TEAM_ID"].to_s.strip

# ---------- images ----------
def write_json(path, obj)
  File.write(path, JSON.pretty_generate(obj) + "\n")
end

icon_set = File.join(APP_DIR, "Assets.xcassets/AppIcon.appiconset")
Dir.glob(File.join(icon_set, "*.png")).each { |f| File.delete(f) }
FileUtils.cp(File.join(RES, "AppIcon-1024.png"), File.join(icon_set, "AppIcon-1024.png"))
write_json(File.join(icon_set, "Contents.json"), {
  "images" => [{ "filename" => "AppIcon-1024.png", "idiom" => "universal", "platform" => "ios", "size" => "1024x1024" }],
  "info" => { "author" => "xcode", "version" => 1 },
})

splash_set = File.join(APP_DIR, "Assets.xcassets/Splash.imageset")
if Dir.exist?(splash_set)
  Dir.glob(File.join(splash_set, "*.png")).each { |f| File.delete(f) }
  FileUtils.cp(File.join(RES, "Splash-2732.png"), File.join(splash_set, "splash.png"))
  write_json(File.join(splash_set, "Contents.json"), {
    "images" => [{ "filename" => "splash.png", "idiom" => "universal" }],
    "info" => { "author" => "xcode", "version" => 1 },
  })
end

# ---------- Firebase config (Google / Apple sign-in) ----------
gplist_src = ENV["GOOGLE_SERVICE_PLIST"].to_s.empty? ? File.join(ROOT, "GoogleService-Info.plist") : ENV["GOOGLE_SERVICE_PLIST"]
gplist = File.join(APP_DIR, "GoogleService-Info.plist")
if File.exist?(gplist_src)
  FileUtils.cp(gplist_src, gplist)
elsif ENV["ALLOW_PLACEHOLDER_FIREBASE"] == "1"
  warn "GoogleService-Info.plist missing: using a placeholder (sign-in won't work in this build)"
  Xcodeproj::Plist.write_to_path({
    "API_KEY" => "AIzaSyPLACEHOLDERPLACEHOLDERPLACEHOLD", "GCM_SENDER_ID" => "000000000000",
    "BUNDLE_ID" => cap["appId"], "PROJECT_ID" => "babel-flight", "STORAGE_BUCKET" => "babel-flight.appspot.com",
    "GOOGLE_APP_ID" => "1:000000000000:ios:0000000000000000000000",
    "CLIENT_ID" => "000000000000-placeholder.apps.googleusercontent.com",
    "REVERSED_CLIENT_ID" => "com.googleusercontent.apps.000000000000-placeholder",
    "IS_ADS_ENABLED" => false, "IS_ANALYTICS_ENABLED" => false, "IS_APPINVITE_ENABLED" => false,
    "IS_GCM_ENABLED" => false, "IS_SIGNIN_ENABLED" => true, "PLIST_VERSION" => "1",
  }, gplist)
else
  abort "GoogleService-Info.plist not found. Download it from the Firebase console (iOS app #{cap["appId"]}) and put it in ios-app/, or set GOOGLE_SERVICE_PLIST."
end
google = Xcodeproj::Plist.read_from_path(gplist)

FileUtils.cp(File.join(RES, "PrivacyInfo.xcprivacy"), File.join(APP_DIR, "PrivacyInfo.xcprivacy"))

# Sign in with Apple
Xcodeproj::Plist.write_to_path({ "com.apple.developer.applesignin" => ["Default"] }, File.join(APP_DIR, "App.entitlements"))

# ---------- Info.plist ----------
info_path = File.join(APP_DIR, "Info.plist")
info = Xcodeproj::Plist.read_from_path(info_path)
info["CFBundleDisplayName"] = "Babel Flight"
info["CFBundleDevelopmentRegion"] = "ja"
info["CFBundleLocalizations"] = ["ja"]
info["ITSAppUsesNonExemptEncryption"] = false
info["UISupportedInterfaceOrientations"] = ["UIInterfaceOrientationPortrait"]
info["UIRequiresFullScreen"] = true
schemes = (info["CFBundleURLTypes"] || []).reject { |t| (t["CFBundleURLSchemes"] || []).any? { |s| s.start_with?("com.googleusercontent.apps.") } }
schemes << { "CFBundleURLName" => "google-sign-in", "CFBundleURLSchemes" => [google["REVERSED_CLIENT_ID"]] }
info["CFBundleURLTypes"] = schemes
Xcodeproj::Plist.write_to_path(info, info_path)

# ---------- Xcode project ----------
project = Xcodeproj::Project.open(File.join(ROOT, "ios/App/App.xcodeproj"))
target = project.targets.find { |t| t.name == "App" } or abort "App target not found"
group = project.main_group.children.find { |g| g.respond_to?(:path) && g.path == "App" } || project.main_group["App"]

%w[GoogleService-Info.plist PrivacyInfo.xcprivacy].each do |name|
  ref = group.files.find { |f| f.path == name } || group.new_reference(name)
  target.resources_build_phase.add_file_reference(ref, true)
end
group.new_reference("App.entitlements") unless group.files.any? { |f| f.path == "App.entitlements" }

target.build_configurations.each do |c|
  s = c.build_settings
  s["CODE_SIGN_ENTITLEMENTS"] = "App/App.entitlements"
  s["MARKETING_VERSION"] = version
  s["CURRENT_PROJECT_VERSION"] = build
  s["TARGETED_DEVICE_FAMILY"] = "1"            # iPhone (iPads run it in iPhone mode)
  s["IPHONEOS_DEPLOYMENT_TARGET"] = "15.0"
  s["PRODUCT_BUNDLE_IDENTIFIER"] = cap["appId"]
  s["CODE_SIGN_STYLE"] = "Automatic"
  s["DEVELOPMENT_TEAM"] = team unless team.empty?
end
project.build_configurations.each { |c| c.build_settings["IPHONEOS_DEPLOYMENT_TARGET"] = "15.0" }
project.save

# ---------- Podfile: Google sign-in needs the plugin's Google subspec; Firebase needs iOS 15 ----------
podfile_path = File.join(ROOT, "ios/App/Podfile")
if File.exist?(podfile_path)
  pod = File.read(podfile_path)
  pod.sub!(/^platform :ios, '[\d.]+'/, "platform :ios, '15.0'")
  google_pod = "  pod 'CapacitorFirebaseAuthentication/Google', :path => '../../node_modules/@capacitor-firebase/authentication'"
  unless pod.include?("CapacitorFirebaseAuthentication/Google")
    pod.sub!(/^(target 'App' do\n\s*capacitor_pods\n)/) { "#{$1}#{google_pod}\n" } or abort "Podfile: target 'App' block not found"
  end
  File.write(podfile_path, pod)
  # the lock from `cap add` was made without the Google subspec; let CocoaPods resolve again
  lock = File.join(ROOT, "ios/App/Podfile.lock")
  File.delete(lock) if File.exist?(lock)
end

puts "configured #{cap["appId"]} #{version} (#{build})#{team.empty? ? "" : " team #{team}"}"
