import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ================= NAVBAR ================= */}
      <header className="flex items-center justify-between px-6 py-5">
        <h1 className="text-xl font-semibold tracking-tight">
          Eventify
        </h1>

        <div className="flex gap-3">
          <Button variant="ghost" asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>

          <Button className="neu-btn" asChild>
            <Link href="/auth/sign-in">Get Started</Link>
          </Button>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="flex flex-col items-center text-center px-6 py-24">

        <div className="neu-card p-10 max-w-3xl space-y-6">

          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Plan Events Effortlessly
          </h1>

          <p className="text-muted text-lg">
            Create events, share invite links, and track RSVPs —
            all from one simple dashboard.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Button className="neu-btn" size="lg" asChild>
              <Link href="/events/new">Create Event</Link>
            </Button>

            <Button className="neu-btn" size="lg" asChild>
              <Link href="/dashboard">View Dashboard</Link>
            </Button>
          </div>

        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="px-6 py-16 max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

        {[
          {
            title: "Create Events",
            desc: "Quickly create events with title, location, and time.",
          },
          {
            title: "Share Invite Links",
            desc: "Send a simple link — no signup required for guests.",
          },
          {
            title: "Track RSVPs",
            desc: "See responses in real-time with clear insights.",
          },
        ].map((f, i) => (
          <Card key={i} className="neu-card">
            <CardContent className="p-6 space-y-3">
              <h3 className="text-lg font-semibold">
                {f.title}
              </h3>
              <p className="text-sm text-muted">
                {f.desc}
              </p>
            </CardContent>
          </Card>
        ))}

      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="px-6 py-20 text-center">
        <h2 className="text-3xl font-bold mb-12">
          How it works
        </h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">

          {[
            "Create your event in seconds",
            "Share your unique invite link",
            "Track responses instantly",
          ].map((step, i) => (
            <div key={i} className="neu-card p-6">
              <h4 className="font-semibold mb-2">
                Step {i + 1}
              </h4>
              <p className="text-sm text-muted">{step}</p>
            </div>
          ))}

        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="px-6 py-20 flex justify-center">
        <div className="neu-card p-10 text-center max-w-xl space-y-6">
          <h2 className="text-2xl font-bold">
            Ready to organize your next event?
          </h2>

          <p className="text-muted text-sm">
            Start now and simplify your event planning workflow.
          </p>

          <Button size="lg" className="neu-btn w-full" asChild>
            <Link href="/events/new">Get Started</Link>
          </Button>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="text-center text-sm text-muted py-8">
        © {new Date().getFullYear()} Eventify
      </footer>
    </div>
  );
}