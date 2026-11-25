import ActivityKit
import SwiftUI
import WidgetKit

// The Dynamic Island (iPhone 14 Pro and later) and the Lock Screen card while a lesson is running.
@available(iOS 16.2, *)
struct BabelLiveActivity: Widget {
    private let navy = Color(red: 0.07, green: 0.09, blue: 0.16)

    private func progress(_ s: BabelFlightAttributes.ContentState) -> Double {
        min(1, Double(s.done) / Double(max(1, s.goal)))
    }

    private func destText(_ s: BabelFlightAttributes.ContentState) -> String {
        s.dest.isEmpty ? "Babel Flight" : "→ \(s.dest)"
    }

    var body: some WidgetConfiguration {
        ActivityConfiguration(for: BabelFlightAttributes.self) { context in
            // Lock Screen and banner
            VStack(alignment: .leading, spacing: 10) {
                HStack(spacing: 12) {
                    Image(systemName: "airplane")
                        .font(.title2)
                        .foregroundColor(babelYellow)
                    VStack(alignment: .leading, spacing: 2) {
                        Text(context.state.phase)
                            .font(.headline)
                            .foregroundColor(.white)
                        Text(destText(context.state))
                            .font(.caption)
                            .foregroundColor(.white.opacity(0.7))
                    }
                    Spacer()
                    Text("\(context.state.done)/\(context.state.goal)")
                        .font(.title3.bold())
                        .foregroundColor(babelYellow)
                }
                ProgressView(value: progress(context.state))
                    .tint(babelYellow)
            }
            .padding(16)
            .activityBackgroundTint(navy)
            .activitySystemActionForegroundColor(.white)
        } dynamicIsland: { context in
            DynamicIsland {
                DynamicIslandExpandedRegion(.leading) {
                    Image(systemName: "airplane")
                        .font(.title3)
                        .foregroundColor(babelYellow)
                }
                DynamicIslandExpandedRegion(.trailing) {
                    Text("\(context.state.done)/\(context.state.goal)")
                        .font(.headline)
                        .foregroundColor(babelYellow)
                }
                DynamicIslandExpandedRegion(.center) {
                    Text(destText(context.state))
                        .font(.subheadline)
                        .lineLimit(1)
                }
                DynamicIslandExpandedRegion(.bottom) {
                    VStack(alignment: .leading, spacing: 6) {
                        ProgressView(value: progress(context.state))
                            .tint(babelYellow)
                        Text(context.state.phase)
                            .font(.caption)
                            .foregroundColor(.secondary)
                    }
                }
            } compactLeading: {
                Image(systemName: "airplane")
                    .foregroundColor(babelYellow)
            } compactTrailing: {
                Text("\(context.state.done)/\(context.state.goal)")
                    .font(.caption.bold())
                    .foregroundColor(babelYellow)
            } minimal: {
                Image(systemName: "airplane")
                    .foregroundColor(babelYellow)
            }
        }
    }
}
