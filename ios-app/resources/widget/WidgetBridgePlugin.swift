import Capacitor
import Foundation
import WidgetKit

// JS calls WidgetBridge.setSummary({line1, line2, line3}) after the lessons or the streak change.
// The lines go to the App Group, and the widget is asked to redraw.
@objc(WidgetBridgePlugin)
public class WidgetBridgePlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "WidgetBridgePlugin"
    public let jsName = "WidgetBridge"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "setSummary", returnType: CAPPluginReturnPromise)
    ]

    @objc func setSummary(_ call: CAPPluginCall) {
        guard let defaults = UserDefaults(suiteName: widgetAppGroup) else {
            call.reject("app group unavailable")
            return
        }
        for key in widgetLineKeys {
            defaults.set(call.getString(key) ?? "", forKey: key)
        }
        if #available(iOS 14.0, *) {
            WidgetCenter.shared.reloadAllTimelines()
        }
        call.resolve()
    }
}
