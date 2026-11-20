import UIKit
import Capacitor

// The app's only screen: Capacitor's bridge view, plus our own plugin (the widget bridge).
class ViewController: CAPBridgeViewController {
    override func capacitorDidLoad() {
        bridge?.registerPluginInstance(WidgetBridgePlugin())
    }
}
