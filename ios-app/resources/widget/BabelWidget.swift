import SwiftUI
import WidgetKit

// The yellow of the airplane, used by the widget and the Dynamic Island.
let babelYellow = Color(red: 1.0, green: 0.81, blue: 0.15)

// The home-screen and Lock Screen widget: streak, today's progress ring, next destination, reviews.
// Everything is read from the App Group; the app writes it after each lesson.
struct SummaryEntry: TimelineEntry {
    let date: Date
    let streak: Int
    let done: Int
    let goal: Int
    let dest: String
    let reviews: Int
    let lines: [String]
}

struct SummaryProvider: TimelineProvider {
    func placeholder(in context: Context) -> SummaryEntry {
        SummaryEntry(date: Date(), streak: 3, done: 1, goal: 3, dest: "ソウル", reviews: 5, lines: ["Babel Flight", "", ""])
    }

    func getSnapshot(in context: Context, completion: @escaping (SummaryEntry) -> Void) {
        completion(loadEntry())
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<SummaryEntry>) -> Void) {
        // The app pushes new numbers after every lesson; this refresh is only a fallback.
        let next = Date().addingTimeInterval(3 * 60 * 60)
        completion(Timeline(entries: [loadEntry()], policy: .after(next)))
    }

    private func loadEntry() -> SummaryEntry {
        let d = UserDefaults(suiteName: widgetAppGroup)
        let lines = widgetLineKeys.map { d?.string(forKey: $0) ?? "" }
        return SummaryEntry(
            date: Date(),
            streak: d?.integer(forKey: "streak") ?? 0,
            done: d?.integer(forKey: "done") ?? 0,
            goal: max(1, d?.integer(forKey: "goal") ?? 1),
            dest: d?.string(forKey: "dest") ?? "",
            reviews: d?.integer(forKey: "reviews") ?? 0,
            lines: lines[0].isEmpty ? ["Babel Flight", "", ""] : lines)
    }
}

// A ring that fills up as today's lessons get done.
struct ProgressRing: View {
    let fraction: Double
    let lineWidth: CGFloat

    var body: some View {
        ZStack {
            Circle()
                .stroke(Color.secondary.opacity(0.25), lineWidth: lineWidth)
            Circle()
                .trim(from: 0, to: CGFloat(min(1, max(0, fraction))))
                .stroke(babelYellow, style: StrokeStyle(lineWidth: lineWidth, lineCap: .round))
                .rotationEffect(.degrees(-90))
        }
    }
}

struct SummaryView: View {
    @Environment(\.widgetFamily) private var family
    var entry: SummaryEntry

    private var fraction: Double {
        Double(entry.done) / Double(max(1, entry.goal))
    }

    var body: some View {
        switch family {
        case .accessoryCircular:
            Gauge(value: min(1, fraction)) {
                Image(systemName: "airplane")
            } currentValueLabel: {
                Text("\(entry.done)")
            }
            .gaugeStyle(.accessoryCircularCapacity)
        case .accessoryRectangular:
            VStack(alignment: .leading, spacing: 2) {
                Text("Babel Flight").font(.headline)
                Text("今日 \(entry.done)/\(entry.goal) ・ 連続\(entry.streak)日").font(.caption)
                if !entry.dest.isEmpty {
                    Text("→ \(entry.dest)").font(.caption2)
                }
            }
        case .systemMedium:
            HStack(spacing: 16) {
                ring(size: 96)
                VStack(alignment: .leading, spacing: 6) {
                    Text("連続 \(entry.streak)日").font(.title3.bold())
                    Text(entry.dest.isEmpty ? "Babel Flight" : "次の目的地 \(entry.dest)").font(.subheadline)
                    Text("復習 \(entry.reviews)フレーズ").font(.caption).foregroundColor(.secondary)
                }
                Spacer(minLength: 0)
            }
            .padding(14)
            .frame(maxWidth: .infinity, maxHeight: .infinity)
            .background(Color(.secondarySystemBackground))
        default:
            VStack(alignment: .leading, spacing: 6) {
                Text("連続 \(entry.streak)日").font(.headline)
                Spacer(minLength: 0)
                HStack {
                    Spacer()
                    ring(size: 80)
                    Spacer()
                }
                Spacer(minLength: 0)
                Text(entry.dest.isEmpty ? "Babel Flight" : "→ \(entry.dest)")
                    .font(.caption)
                    .foregroundColor(.secondary)
                    .lineLimit(1)
            }
            .padding(12)
            .frame(maxWidth: .infinity, maxHeight: .infinity)
            .background(Color(.secondarySystemBackground))
        }
    }

    private func ring(size: CGFloat) -> some View {
        ZStack {
            ProgressRing(fraction: fraction, lineWidth: 9)
            VStack(spacing: 0) {
                Text("\(entry.done)/\(entry.goal)").font(.title3.bold())
                Text("今日").font(.caption2).foregroundColor(.secondary)
            }
        }
        .frame(width: size, height: size)
    }
}

struct BabelWidget: Widget {
    let kind = "BabelWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: SummaryProvider()) { entry in
            SummaryView(entry: entry)
        }
        .configurationDisplayName("Babel Flight")
        .description("連続日数・今日の進み・次の目的地")
        .supportedFamilies([.systemSmall, .systemMedium, .accessoryCircular, .accessoryRectangular])
    }
}

// The widget bundle: the home-screen widget, and the Dynamic Island / Lock Screen card during a lesson.
@main
struct BabelWidgetBundle: WidgetBundle {
    var body: some Widget {
        BabelWidget()
        BabelLiveActivity()
    }
}
