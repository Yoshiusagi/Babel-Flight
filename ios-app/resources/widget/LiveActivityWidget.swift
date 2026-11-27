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

    // the flash colour for a correct answer
    private let gold = Color(red: 1.0, green: 0.84, blue: 0.28)

    private func destText(_ s: BabelFlightAttributes.ContentState) -> String {
        s.dest.isEmpty ? "Babel Flight" : "→ \(s.dest)"
    }

    // The airplane hops each time a question is answered (iOS 17 and later).
    // and it turns gold, with a glow, for a moment after each correct answer
    @ViewBuilder
    private func plane(_ s: BabelFlightAttributes.ContentState, font: Font) -> some View {
        if #available(iOS 17.0, *) {
            Image(systemName: "airplane")
                .font(font)
                .foregroundColor(s.hit ? gold : babelYellow)
                .shadow(color: gold.opacity(s.hit ? 0.9 : 0), radius: s.hit ? 6 : 0)
                .animation(.easeOut(duration: 0.25), value: s.hit)
                .symbolEffect(.bounce, value: s.done)
        } else {
            Image(systemName: "airplane")
                .font(font)
                .foregroundColor(s.hit ? gold : babelYellow)
                .shadow(color: gold.opacity(s.hit ? 0.9 : 0), radius: s.hit ? 6 : 0)
                .animation(.easeOut(duration: 0.25), value: s.hit)
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
                // long press: a bigger island with the next stop, the count left and the miles
                DynamicIslandExpandedRegion(.leading) {
                    plane(context.state, font: .title)
                }
                DynamicIslandExpandedRegion(.trailing) {
                    VStack(alignment: .trailing, spacing: 2) {
                        Text("\(context.state.done)/\(context.state.goal)")
                            .font(.title3.bold())
                            .foregroundColor(babelYellow)
                            .contentTransition(.numericText())
                        Text("あと\(max(0, context.state.goal - context.state.done))問")
                            .font(.caption2)
                            .foregroundColor(.white.opacity(0.6))
                    }
                }
                DynamicIslandExpandedRegion(.center) {
                    VStack(spacing: 2) {
                        Text(destText(context.state))
                            .font(.headline.bold())
                            .foregroundColor(.white)
                            .lineLimit(1)
                        Text("次の目的地")
                            .font(.caption2)
                            .foregroundColor(.white.opacity(0.6))
                    }
                }
                DynamicIslandExpandedRegion(.bottom) {
                    VStack(alignment: .leading, spacing: 8) {
                        route(context.state)
                        HStack {
                            Text(context.state.phase)
                                .font(.caption.bold())
                                .foregroundColor(.white.opacity(0.8))
                            Spacer()
                            Text("マイル \(context.state.mi)")
                                .font(.caption.bold())
                                .foregroundColor(babelYellow)
                        }
                    }
                }
            } compactLeading: {
                // a small progress ring with the plane inside
                ZStack {
                    ProgressRing(fraction: progress(context.state), lineWidth: 2)
                    plane(context.state, font: .system(size: 8))
                }
                .frame(width: 20, height: 20)
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
