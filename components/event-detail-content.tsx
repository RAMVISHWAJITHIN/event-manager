import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { countByStatus } from "./dashboard-content";
import { Button } from "./ui/button";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { createInviteLinkAction } from "@/lib/actions/events";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export async function EventDetailsContent({
  userId,
  eventId,
}: {
  userId: string;
  eventId: string;
}) {
  const row = await prisma.event.findFirst({
    where: { id: eventId, ownerUserId: userId },
    select: {
      id: true,
      title: true,
      description: true,
      location: true,
      eventDate: true,
      invite: { select: { token: true } },
      rsvps: { select: { status: true } },
    },
  });

  if (!row) notFound();

  const counts = countByStatus(row.rsvps);

  const event = {
    id: row.id,
    title: row.title,
    description: row.description,
    location: row.location,
    eventDate: row.eventDate,
    inviteToken: row.invite?.token ?? null,
    ...counts,
  };

  const rsvpRows = await prisma.eventRsvp.findMany({
    where: { eventId },
    orderBy: { respondedAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      status: true,
      respondedAt: true,
    },
  });

  const createInviteActionForEvent = createInviteLinkAction.bind(
    null,
    event.id
  );

  return (
    <div className="mx-auto w-full max-w-4xl space-y-8 px-4 py-6">

      {/* Back */}
      <Button className="neu-btn w-fit" asChild>
        <Link href="/dashboard">← Back</Link>
      </Button>

      {/* ================= EVENT CARD ================= */}
      <Card className="neu-card p-6 space-y-5">

        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">{event.title}</h1>

          <p className="text-sm text-muted">
            {event.eventDate
              ? event.eventDate.toLocaleString()
              : "No date selected"}
            {event.location ? ` • ${event.location}` : ""}
          </p>
        </div>

        {event.description && (
          <p className="text-sm text-muted">{event.description}</p>
        )}

        {/* RSVP Stats */}
        <div className="flex gap-2 flex-wrap">
          <Badge className="neu-badge">Going {event.goingCount}</Badge>
          <Badge className="neu-badge">Maybe {event.maybeCount}</Badge>
          <Badge className="neu-badge">Not Going {event.notGoingCount}</Badge>
        </div>

        {/* Invite Section */}
        <div className="neu-card p-4 space-y-3">

          <p className="text-xs text-muted">
            Share this link with guests to collect RSVPs
          </p>

          {event.inviteToken && (
            <p className="text-sm break-all">
              {`${process.env.NEXT_PUBLIC_BASE_URL}/invite/${event.inviteToken}`}
            </p>
          )}

          <form action={createInviteActionForEvent}>
            <Button className="neu-btn w-full">
              {event.inviteToken ? "Regenerate Link" : "Generate Link"}
            </Button>
          </form>

        </div>
      </Card>

      {/* ================= ATTENDEES ================= */}
      <Card className="neu-card p-6">

        <CardHeader className="p-0 mb-4">
          <CardTitle>Attendees</CardTitle>
        </CardHeader>

        <CardContent className="p-0">

          {rsvpRows.length === 0 ? (
            <p className="text-sm text-muted">
              No responses yet
            </p>
          ) : (

            <div className="overflow-x-auto">

              <Table>

                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Updated</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {rsvpRows.map((rsvp) => (
                    <TableRow key={rsvp.id}>

                      <TableCell>{rsvp.name}</TableCell>

                      <TableCell className="text-muted">
                        {rsvp.email}
                      </TableCell>

                      <TableCell>
                        <Badge className="neu-badge">
                          {rsvp.status === "not_going"
                            ? "Not Going"
                            : rsvp.status}
                        </Badge>
                      </TableCell>

                      <TableCell className="text-sm text-muted">
                        {rsvp.respondedAt.toLocaleString()}
                      </TableCell>

                    </TableRow>
                  ))}
                </TableBody>

              </Table>

            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}