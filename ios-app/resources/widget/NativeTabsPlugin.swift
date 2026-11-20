import Capacitor
import UIKit

// The three tabs at the bottom as the system's own tab bar. Built with Xcode 26 (iOS 26 SDK),
// UITabBar draws Liquid Glass by itself. JS: NativeTabs.show({items:[{id,title,symbol}], selected}),
// NativeTabs.select({id}), NativeTabs.hide(). A tap comes back as the "tab" event with {id}.
@objc(NativeTabsPlugin)
public class NativeTabsPlugin: CAPPlugin, CAPBridgedPlugin, UITabBarDelegate {
    public let identifier = "NativeTabsPlugin"
    public let jsName = "NativeTabs"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "show", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "select", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "hide", returnType: CAPPluginReturnPromise),
    ]

    private var bar: UITabBar?
    private var ids: [String] = []

    @objc func show(_ call: CAPPluginCall) {
        let items = call.getArray("items", JSObject.self) ?? []
        let selected = call.getString("selected") ?? ""
        DispatchQueue.main.async {
            guard let view = self.bridge?.viewController?.view else {
                call.reject("no view")
                return
            }
            let tabBar = self.bar ?? self.makeBar(in: view)
            self.ids = items.compactMap { $0["id"] as? String }
            tabBar.items = items.enumerated().map { index, item in
                UITabBarItem(
                    title: item["title"] as? String ?? "",
                    image: UIImage(systemName: item["symbol"] as? String ?? "circle"),
                    tag: index
                )
            }
            self.select(id: selected, in: tabBar)
            tabBar.isHidden = false
            call.resolve()
        }
    }

    @objc func select(_ call: CAPPluginCall) {
        let id = call.getString("id") ?? ""
        DispatchQueue.main.async {
            if let tabBar = self.bar { self.select(id: id, in: tabBar) }
            call.resolve()
        }
    }

    @objc func hide(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            self.bar?.isHidden = true
            call.resolve()
        }
    }

    private func select(id: String, in tabBar: UITabBar) {
        guard let index = ids.firstIndex(of: id), let items = tabBar.items, index < items.count else { return }
        tabBar.selectedItem = items[index]
    }

    private func makeBar(in view: UIView) -> UITabBar {
        let tabBar = UITabBar()
        tabBar.delegate = self
        tabBar.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(tabBar)
        NSLayoutConstraint.activate([
            tabBar.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            tabBar.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            tabBar.bottomAnchor.constraint(equalTo: view.bottomAnchor),
        ])
        bar = tabBar
        return tabBar
    }

    public func tabBar(_ tabBar: UITabBar, didSelect item: UITabBarItem) {
        guard item.tag >= 0, item.tag < ids.count else { return }
        notifyListeners("tab", data: ["id": ids[item.tag]])
    }
}
