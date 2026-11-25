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

    // The airplane hops each time a question is answered (iOS 17 and later).
    @ViewBuilder
    private func plane(_ s: BabelFlightAttributes.ContentState, font: Font) -> some View {
        if #available(iOS 17.0, *) {
            Image(systemName: "airplane")
                .font(font)
                .foregroundColor(babelYellow)
                .symbolEffect(.bounce, value: s.done)
        } else {
            Image(systemName: "airplane")
                .font(font)
                .foregroundColor(babelYellow)
        }
    }

    // A thin route with the plane on it: it moves forward as the lessons get done.
    private func route(_ s: BabelFlightAttributes.ContentState) -> some View {
        GeometryReader { g in
            ZStack(alignment: .leading) {
                Capsule()
                    .fill(Color.white.opacity(0.2))
                    .frame(height: 4)
                Capsule()
                    .fill(babelYellow)
                    .frame(width: max(4, g.size.width * progress(s)), height: 4)
                Image(systemName: "airplane")
                    .font(.caption)
                    .foregroundColor(babelYellow)
                    .offset(x: max(0, g.size.width * progress(s) - 8))
            }
            .frame(height: 14)
            .animation(.easeOut(duration: 0.6), value: progress(s))
        }
        .frame(height: 14)
    }

    var body: some WidgetConfiguration {
        ActivityConfiguration(for: BabelFlightAttributes.self) { context in
            // Lock Screen and banner
            VStack(alignment: .leading, spacing: 10) {
                HStack(spacing: 12) {
                    plane(context.state, font: .title2)
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
                        .contentTransition(.numericText())
                }
                route(context.state)
            }
            .padding(16)
            .activityBackgroundTint(navy)
            .activitySystemActionForegroundColor(.white)
        } dynamicIsland: { context in
            DynamicIsland {
                DynamicIslandExpandedRegion(.leading) {
                    plane(context.state, font: .title3)
                }
                DynamicIslandExpandedRegion(.trailing) {
                    Text("\(context.state.done)/\(context.state.goal)")
                        .font(.headline)
                        .foregroundColor(babelYellow)
                        .contentTransition(.numericText())
                }
                DynamicIslandExpandedRegion(.center) {
                    Text(destText(context.state))
                        .font(.subheadline)
                        .lineLimit(1)
                }
                DynamicIslandExpandedRegion(.bottom) {
                    VStack(alignment: .leading, spacing: 6) {
                        route(context.state)
                        Text(context.state.phase)
                            .font(.caption)
                            .foregroundColor(.secondary)
                    }
                }
            } compactLeading: {
                plane(context.state, font: .caption)
            } compactTrailing: {
                Text("\(context.state.done)/\(context.state.goal)")
                    .font(.caption.bold())
                    .foregroundColor(babelYellow)
                    .contentTransition(.numericText())
            } minimal: {
                Image(systemName: "airplane")
                    .foregroundColor(babelYellow)
            }
        }
    }
}
