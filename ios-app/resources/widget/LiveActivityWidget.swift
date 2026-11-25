import ActivityKit
import SwiftUI
import WidgetKit

// The Dynamic Island (iPhone 14 Pro and later) and the Lock Screen card while a lesson is running.
@available(iOS 16.2, *)
struct BabelLiveActivity: Widget {
    private let plane = Color(red: 1.0, green: 0.81, blue: 0.15)

    var body: some WidgetConfiguration {
        ActivityConfiguration(for: BabelFlightAttributes.self) { context in
            HStack(spacing: 12) {
                Image(systemName: "airplane")
                    .font(.title2)
                    .foregroundColor(plane)
                VStack(alignment: .leading, spacing: 2) {
                    Text(context.state.phase)
                        .font(.headline)
                        .foregroundColor(.white)
                    Text(context.state.dest)
                        .font(.caption)
                        .foregroundColor(.white.opacity(0.7))
                }
                Spacer()
                Text("\(context.state.done)/\(context.state.goal)")
                    .font(.title3.bold())
                    .foregroundColor(plane)
            }
            .padding(16)
            .activityBackgroundTint(Color(red: 0.07, green: 0.09, blue: 0.16))
            .activitySystemActionForegroundColor(.white)
        } dynamicIsland: { context in
            DynamicIsland {
                DynamicIslandExpandedRegion(.leading) {
                    Image(systemName: "airplane")
                        .foregroundColor(plane)
                }
                DynamicIslandExpandedRegion(.trailing) {
                    Text("\(context.state.done)/\(context.state.goal)")
                        .font(.headline)
                }
                DynamicIslandExpandedRegion(.bottom) {
                    VStack(alignment: .leading, spacing: 2) {
                        Text(context.state.phase)
                            .font(.subheadline)
                        Text(context.state.dest)
                            .font(.caption)
                            .foregroundColor(.secondary)
                    }
                }
            } compactLeading: {
                Image(systemName: "airplane")
                    .foregroundColor(plane)
            } compactTrailing: {
                Text("\(context.state.done)/\(context.state.goal)")
            } minimal: {
                Image(systemName: "airplane")
                    .foregroundColor(plane)
            }
        }
    }
}
