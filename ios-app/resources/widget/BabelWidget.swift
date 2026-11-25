import SwiftUI
import WidgetKit

// The home-screen widget: streak, today's lessons and reviews, read from the App Group.
struct SummaryEntry: TimelineEntry {
    let date: Date
    let lines: [String]
}

struct SummaryProvider: TimelineProvider {
    func placeholder(in context: Context) -> SummaryEntry {
        SummaryEntry(date: Date(), lines: ["Babel Flight", "", ""])
    }

    func getSnapshot(in context: Context, completion: @escaping (SummaryEntry) -> Void) {
        completion(loadEntry())
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<SummaryEntry>) -> Void) {
        // The app pushes new lines whenever they change; this refresh is only a fallback.
        let next = Date().addingTimeInterval(3 * 60 * 60)
        completion(Timeline(entries: [loadEntry()], policy: .after(next)))
    }

    private func loadEntry() -> SummaryEntry {
        let defaults = UserDefaults(suiteName: widgetAppGroup)
        let lines = widgetLineKeys.map { defaults?.string(forKey: $0) ?? "" }
        return SummaryEntry(date: Date(), lines: lines[0].isEmpty ? ["Babel Flight", "", ""] : lines)
    }
}

struct SummaryView: View {
    var entry: SummaryEntry

    var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            Text(entry.lines[0])
                .font(.headline)
                .lineLimit(1)
            Text(entry.lines[1])
                .font(.subheadline)
                .lineLimit(1)
            Text(entry.lines[2])
                .font(.caption)
                .foregroundColor(.secondary)
                .lineLimit(1)
            Spacer(minLength: 0)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .leading)
        .padding(12)
        .background(Color(.secondarySystemBackground))
    }
}

struct BabelWidget: Widget {
    let kind = "BabelWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: SummaryProvider()) { entry in
            SummaryView(entry: entry)
        }
        .configurationDisplayName("Babel Flight")
        .description("Streak, today's lessons and reviews.")
        .supportedFamilies([.systemSmall, .systemMedium])
    }
}

// The widget bundle: the home-screen widget, and (iOS 16.2+) the Dynamic Island / Lock Screen card.
@main
struct BabelWidgetBundle: WidgetBundle {
    var body: some Widget {
        BabelWidget()
        if #available(iOS 16.2, *) {
            BabelLiveActivity()
        }
    }
}
