import ActivityKit
import Foundation

// Shared by the app and the widget: what the Dynamic Island and the Lock Screen show during a lesson.
// Needs iOS 16.2 or later, so the app checks the version before it starts one.
@available(iOS 16.2, *)
struct BabelFlightAttributes: ActivityAttributes {
    public struct ContentState: Codable, Hashable {
        var done: Int
        var goal: Int
        var dest: String
        var phase: String
        // true for a moment after a correct answer (the plane flashes gold)
        var hit: Bool
        // total miles, shown in the expanded island
        var mi: Int
    }
    var title: String
}
