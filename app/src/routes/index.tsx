import { createFileRoute } from "@tanstack/react-router";

// "/" is answered directly by src/server.ts with the Babel Flight app page,
// so this route only exists to keep the router tree complete.
export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main style={{ padding: 24, fontFamily: "system-ui, sans-serif" }}>
      <a href="/">Babel Flight</a>
    </main>
  );
}
