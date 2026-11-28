import Capacitor
import StoreKit
import Foundation

// The App Store purchases for the 英検 levels (StoreKit 2). JS calls Store.purchase / restore / owned.
// Every purchase is a one-time (non-consumable) product, made in App Store Connect with these same IDs.
@objc(StorePlugin)
public class StorePlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "StorePlugin"
    public let jsName = "Store"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "purchase", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "restore", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "owned", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "prices", returnType: CAPPluginReturnPromise)
    ]

    // the IDs that are already bought (verified by the App Store)
    @available(iOS 15.0, *)
    private func ownedIDs() async -> [String] {
        var ids: [String] = []
        for await result in Transaction.currentEntitlements {
            if case .verified(let t) = result { ids.append(t.productID) }
        }
        return ids
    }

    // the IDs bought so far, for the app to open the levels
    @objc func owned(_ call: CAPPluginCall) {
        guard #available(iOS 15.0, *) else { call.resolve(["ids": []]); return }
        Task {
            let ids = await self.ownedIDs()
            call.resolve(["ids": ids])
        }
    }

    // the prices as the App Store shows them (localized, with the currency), by product ID
    @objc func prices(_ call: CAPPluginCall) {
        guard #available(iOS 15.0, *) else { call.resolve(["prices": [:]]); return }
        let ids = call.getArray("ids", String.self) ?? []
        Task {
            do {
                let products = try await Product.products(for: ids)
                var out: [String: String] = [:]
                for p in products { out[p.id] = p.displayPrice }
                call.resolve(["prices": out])
            } catch {
                call.resolve(["prices": [:]])
            }
        }
    }

    // 「購入を復元」: asks the App Store for the purchases of this Apple ID (a new phone, a reinstall)
    @objc func restore(_ call: CAPPluginCall) {
        guard #available(iOS 15.0, *) else { call.resolve(["ok": false, "reason": "ios"]); return }
        Task {
            do {
                try await AppStore.sync()
            } catch {
                call.resolve(["ok": false, "reason": "sync"])
                return
            }
            let ids = await self.ownedIDs()
            call.resolve(["ok": true, "ids": ids])
        }
    }

    // buys one product (Apple shows its own confirmation sheet)
    @objc func purchase(_ call: CAPPluginCall) {
        guard #available(iOS 15.0, *) else { call.resolve(["ok": false, "reason": "ios"]); return }
        guard let pid = call.getString("id") else { call.resolve(["ok": false, "reason": "noid"]); return }
        Task {
            do {
                let products = try await Product.products(for: [pid])
                guard let product = products.first else {
                    call.resolve(["ok": false, "reason": "notfound"])
                    return
                }
                let result = try await product.purchase()
                switch result {
                case .success(let verification):
                    if case .verified(let tx) = verification {
                        await tx.finish()
                        call.resolve(["ok": true, "id": tx.productID])
                    } else {
                        call.resolve(["ok": false, "reason": "unverified"])
                    }
                case .userCancelled:
                    call.resolve(["ok": false, "reason": "cancelled"])
                case .pending:
                    call.resolve(["ok": false, "reason": "pending"])
                @unknown default:
                    call.resolve(["ok": false, "reason": "unknown"])
                }
            } catch {
                call.resolve(["ok": false, "reason": "error"])
            }
        }
    }
}
