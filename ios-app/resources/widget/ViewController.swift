import UIKit
import Capacitor

// The app's only screen: Capacitor's bridge view, plus our own plugins (the widget bridge and the native tab bar).
class ViewController: CAPBridgeViewController {
    override func capacitorDidLoad() {
        bridge?.registerPluginInstance(WidgetBridgePlugin())
        bridge?.registerPluginInstance(NativeTabsPlugin())
        bridge?.registerPluginInstance(LiveActivityPlugin())
        bridge?.registerPluginInstance(StorePlugin())
    }
}
