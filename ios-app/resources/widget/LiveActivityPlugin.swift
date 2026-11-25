import Capacitor
import ActivityKit
import Foundation

// JS calls LiveActivity.start / update / end around a lesson. On iOS 15 or without the Dynamic Island
// the calls do nothing (they still resolve, so the lesson never waits on them).
@objc(LiveActivityPlugin)
public class LiveActivityPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "LiveActivityPlugin"
    public let jsName = "LiveActivity"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "start", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "update", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "end", returnType: CAPPluginReturnPromise)
    ]

    @available(iOS 16.2, *)
    private func state(_ call: CAPPluginCall) -> BabelFlightAttributes.ContentState {
        return BabelFlightAttributes.ContentState(
            done: call.getInt("done") ?? 0,
            goal: max(1, call.getInt("goal") ?? 1),
            dest: call.getString("dest") ?? "",
            phase: call.getString("phase") ?? "")
    }

    @objc func start(_ call: CAPPluginCall) {
        guard #available(iOS 16.2, *) else { call.resolve(["started": false]); return }
        guard ActivityAuthorizationInfo().areActivitiesEnabled else { call.resolve(["started": false]); return }
        let content = ActivityContent(state: state(call), staleDate: nil)
        Task {
            // one flight at a time: close any that is still showing
            for a in Activity<BabelFlightAttributes>.activities {
                await a.end(nil, dismissalPolicy: .immediate)
            }
            do {
                _ = try Activity<BabelFlightAttributes>.request(
                    attributes: BabelFlightAttributes(title: "Babel Flight"),
                    content: content,
                    pushType: nil)
                call.resolve(["started": true])
            } catch {
                call.resolve(["started": false])
            }
        }
    }

    @objc func update(_ call: CAPPluginCall) {
        guard #available(iOS 16.2, *) else { call.resolve(); return }
        let content = ActivityContent(state: state(call), staleDate: nil)
        Task {
            for a in Activity<BabelFlightAttributes>.activities {
                await a.update(content)
            }
            call.resolve()
        }
    }

    @objc func end(_ call: CAPPluginCall) {
        guard #available(iOS 16.2, *) else { call.resolve(); return }
        Task {
            for a in Activity<BabelFlightAttributes>.activities {
                await a.end(nil, dismissalPolicy: .immediate)
            }
            call.resolve()
        }
    }
}
