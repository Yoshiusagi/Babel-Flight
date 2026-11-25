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

# Sign in with Apple, and the App Group the home-screen widget reads from (ホーム画面のウィジェット)
Xcodeproj::Plist.write_to_path({
  "com.apple.developer.applesignin" => ["Default"],
  "com.apple.security.application-groups" => ["group.com.babelflight.app"],
}, File.join(APP_DIR, "App.entitlements"))

# ---------- Info.plist ----------
info_path = File.join(APP_DIR, "Info.plist")
info = Xcodeproj::Plist.read_from_path(info_path)
info["CFBundleDisplayName"] = "Babel Flight"
info["CFBundleDevelopmentRegion"] = "ja"
info["CFBundleLocalizations"] = ["ja"]
info["ITSAppUsesNonExemptEncryption"] = false
info["UISupportedInterfaceOrientations"] = ["UIInterfaceOrientationPortrait"]
info["UIRequiresFullScreen"] = true
info["NSSupportsLiveActivities"] = true   # Dynamic Island / ロック画面 (LiveActivity)
schemes = (info["CFBundleURLTypes"] || []).reject { |t| (t["CFBundleURLSchemes"] || []).any? { |s| s.start_with?("com.googleusercontent.apps.") } }
schemes << { "CFBundleURLName" => "google-sign-in", "CFBundleURLSchemes" => [google["REVERSED_CLIENT_ID"]] }
info["CFBundleURLTypes"] = schemes
Xcodeproj::Plist.write_to_path(info, info_path)

# ---------- Home-screen widget (WidgetKit extension) ----------
WIDGET = "BabelWidget"
WIDGET_DIR = File.join(ROOT, "ios/App", WIDGET)
WIDGET_RES = File.join(RES, "widget")
widget_bid = "#{cap["appId"]}.widget"
FileUtils.mkdir_p(WIDGET_DIR)
%w[BabelWidget.swift WidgetShared.swift LiveActivityShared.swift LiveActivityWidget.swift Info.plist BabelWidget.entitlements].each do |f|
  FileUtils.cp(File.join(WIDGET_RES, f), File.join(WIDGET_DIR, f))
end
%w[WidgetShared.swift WidgetBridgePlugin.swift NativeTabsPlugin.swift LiveActivityShared.swift LiveActivityPlugin.swift ViewController.swift].each do |f|
  FileUtils.cp(File.join(WIDGET_RES, f), File.join(APP_DIR, f))
end

# Capacitor's storyboard opens a plain CAPBridgeViewController, which never calls our capacitorDidLoad,
# so our native plugins (widget, Live Activity, tabs) were never registered. Point the first screen at ours.
storyboard = File.join(APP_DIR, "Base.lproj/Main.storyboard")
if File.exist?(storyboard)
  sb = File.read(storyboard)
  fixed = sb.gsub(/customClass="CAPBridgeViewController"( customModule="Capacitor")?/, 'customClass="ViewController" customModule="App"')
  File.write(storyboard, fixed)
  warn(fixed == sb ? "storyboard: first screen already ViewController? (no CAPBridgeViewController found)" : "storyboard: first screen -> ViewController")
else
  warn "storyboard not found: #{storyboard}"
end

# ---------- Xcode project ----------
project = Xcodeproj::Project.open(File.join(ROOT, "ios/App/App.xcodeproj"))
target = project.targets.find { |t| t.name == "App" } or abort "App target not found"
group = project.main_group.children.find { |g| g.respond_to?(:path) && g.path == "App" } || project.main_group["App"]

%w[GoogleService-Info.plist PrivacyInfo.xcprivacy].each do |name|
  ref = group.files.find { |f| f.path == name } || group.new_reference(name)
  target.resources_build_phase.add_file_reference(ref, true)
end
group.new_reference("App.entitlements") unless group.files.any? { |f| f.path == "App.entitlements" }

# the app's Swift files (the plugin is registered in ViewController.swift)
%w[WidgetShared.swift WidgetBridgePlugin.swift NativeTabsPlugin.swift LiveActivityShared.swift LiveActivityPlugin.swift ViewController.swift].each do |name|
  ref = group.files.find { |f| f.path == name } || group.new_reference(name)
  target.source_build_phase.add_file_reference(ref, true) unless target.source_build_phase.files_references.include?(ref)
end

# the widget target, embedded in the app (PlugIns)
widget = project.targets.find { |t| t.name == WIDGET } || project.new_target(:app_extension, WIDGET, :ios, "15.0")
wgroup = project.main_group.children.find { |g| g.respond_to?(:path) && g.path == WIDGET } || project.main_group.new_group(WIDGET, WIDGET)
%w[BabelWidget.swift WidgetShared.swift LiveActivityShared.swift LiveActivityWidget.swift].each do |name|
  ref = wgroup.files.find { |f| f.path == name } || wgroup.new_reference(name)
  widget.source_build_phase.add_file_reference(ref, true) unless widget.source_build_phase.files_references.include?(ref)
end
%w[Info.plist BabelWidget.entitlements].each { |name| wgroup.files.find { |f| f.path == name } || wgroup.new_reference(name) }
widget.build_configurations.each do |c|
  s = c.build_settings
  s["PRODUCT_BUNDLE_IDENTIFIER"] = widget_bid
  s["INFOPLIST_FILE"] = "#{WIDGET}/Info.plist"
  s["GENERATE_INFOPLIST_FILE"] = "NO"
  s["CODE_SIGN_ENTITLEMENTS"] = "#{WIDGET}/BabelWidget.entitlements"
  s["SWIFT_VERSION"] = "5.0"
  s["IPHONEOS_DEPLOYMENT_TARGET"] = "16.2"   # the Lock Screen widgets and the Live Activity need iOS 16
  s["TARGETED_DEVICE_FAMILY"] = "1"
  s["SKIP_INSTALL"] = "YES"
  s["PRODUCT_NAME"] = WIDGET
  s["MARKETING_VERSION"] = version
  s["CURRENT_PROJECT_VERSION"] = build
  s["CODE_SIGN_STYLE"] = "Automatic"
  s["DEVELOPMENT_TEAM"] = team unless team.empty?
  # App Store upload: the widget is signed with its own profile (made by asc-signing.rb), like the app
  wprofile = ENV["SIGN_WIDGET_PROFILE_NAME"].to_s
  if c.name == "Release" && !wprofile.empty?
    s["CODE_SIGN_STYLE"] = "Manual"
    s["CODE_SIGN_IDENTITY"] = "Apple Distribution"
    s["CODE_SIGN_IDENTITY[sdk=iphoneos*]"] = "Apple Distribution"
    s["PROVISIONING_PROFILE_SPECIFIER"] = ENV["SIGN_WIDGET_PROFILE_UUID"].to_s.empty? ? wprofile : ENV["SIGN_WIDGET_PROFILE_UUID"]
  end
end
widget.product_reference.name = "#{WIDGET}.appex"
widget.product_reference.path = "#{WIDGET}.appex"
target.add_dependency(widget) unless target.dependencies.any? { |d| d.target == widget }
embed = target.copy_files_build_phases.find { |p| p.name == "Embed Foundation Extensions" } || target.new_copy_files_build_phase("Embed Foundation Extensions")
embed.dst_subfolder_spec = Xcodeproj::Constants::COPY_FILES_BUILD_PHASE_DESTINATIONS[:plug_ins]
unless embed.files_references.include?(widget.product_reference)
  bf = embed.add_file_reference(widget.product_reference, true)
  bf.settings = { "ATTRIBUTES" => ["RemoveHeadersOnCopy", "CodeSignOnCopy"] }
end

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
  # App Store upload: sign Release with the profile made by asc-signing.rb (no device needed)
  profile = ENV["SIGN_PROFILE_NAME"].to_s
  if c.name == "Release" && !profile.empty?
    s["CODE_SIGN_STYLE"] = "Manual"
    s["CODE_SIGN_IDENTITY"] = "Apple Distribution"
    s["CODE_SIGN_IDENTITY[sdk=iphoneos*]"] = "Apple Distribution"
    s["PROVISIONING_PROFILE_SPECIFIER"] = ENV["SIGN_PROFILE_UUID"].to_s.empty? ? profile : ENV["SIGN_PROFILE_UUID"]
  end
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
