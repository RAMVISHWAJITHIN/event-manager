import Link from "next/link";
import { Button } from "./ui/button";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import type { RsvpStatus as PrismaRsvpStatus } from "@/generated/prisma/enums";

export function countByStatus(rsvps: { status: PrismaRsvpStatus }[]) {
  let goingCount = 0;
  let maybeCount = 0;
  let notGoingCount = 0;

  for (const r of rsvps) {
    if (r.status === "going") goingCount++;
    else if (r.status === "maybe") maybeCount++;
    else if (r.status === "not_going") notGoingCount++;
  }

  return { goingCount, maybeCount, notGoingCount };
}

export async function DashboardContent({ userId }: { userId: string }) {
  const rows = await prisma.event.findMany({
    where: { ownerUserId: userId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      eventDate: true,
      location: true,
      rsvps: { select: { status: true } },
    },
  });

  const events = rows.map((e) => ({
    id: e.id,
    title: e.title,
    eventDate: e.eventDate,
    location: e.location,
    ...countByStatus(e.rsvps),
  }));

  return (
    <div className="flex flex-1 flex-col gap-10 px-4 py-6">

      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Your Events
          </h1>
          <p className="text-sm text-muted mt-1">
            Track attendees and manage your events
          </p>
        </div>

        <Button className="neu-btn" asChild>
          <Link href="/events/new">+ Create Event</Link>
        </Button>
      </div>

      {/* ================= EMPTY STATE ================= */}
      {events.length === 0 ? (
        <Card className="neu-card text-center py-12">
          <CardContent className="space-y-4">
            <p className="text-muted">No events yet</p>
            <Button className="neu-btn" asChild>
              <Link href="/events/new">Create your first event</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (

        /* ================= EVENTS GRID ================= */
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {events.map((event) => (
            <Card
              key={event.id}
              className="neu-card p-5 transition-transform duration-200 hover:scale-[1.02]"
            >

              {/* HEADER */}
              <CardHeader className="p-0 mb-4">
                <div className="flex items-start justify-between gap-4">
                  <CardTitle className="text-lg font-semibold">
                    {event.title}
                  </CardTitle>

                  <Button size="sm" className="neu-btn" asChild>
                    <Link href={`/events/${event.id}`}>Open</Link>
                  </Button>
                </div>
              </CardHeader>

              {/* BODY */}
              <CardContent className="p-0 space-y-4">

                {/* RSVP Stats */}
                <div className="flex flex-wrap gap-2">
                  <Badge className="neu-badge">
                    Going {event.goingCount}
                  </Badge>

                  <Badge className="neu-badge">
                    Maybe {event.maybeCount}
                  </Badge>

                  <Badge className="neu-badge">
                    Not Going {event.notGoingCount}
                  </Badge>
                </div>

                {/* Info */}
                <div className="text-sm text-muted space-y-1">
                  <p>
                    {event.eventDate
                      ? event.eventDate.toLocaleDateString()
                      : "No date selected"}
                  </p>

                  {event.location && (
                    <p>{event.location}</p>
                  )}
                </div>

              </CardContent>
            </Card>
          ))}

        </div>
      )}
    </div>
  );
}