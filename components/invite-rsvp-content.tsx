import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { submitOrUpdateRsvpAction } from "@/lib/actions/events";

import {
  Field,
  FieldLabel,
  FieldContent,
  FieldDescription,
} from "@/components/ui/field";

export async function InviteRsvpContent({
  token,
  submitted,
}: {
  token: string;
  submitted: boolean;
}) {
  const row = await prisma.eventInvite.findFirst({
    where: { token },
    include: {
      event: {
        select: {
          title: true,
          description: true,
          location: true,
          eventDate: true,
        },
      },
    },
  });

  if (!row) notFound();

  const e = row.event;

  const event = {
    title: e.title,
    description: e.description,
    location: e.location,
    eventDate: e.eventDate,
  };

  const submitRsvpForToken = submitOrUpdateRsvpAction.bind(null, token);

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-10">

      {/* ================= CARD ================= */}
      <Card className="neu-card p-6 space-y-6">

        {/* Header */}
        <CardHeader className="p-0 space-y-3">

          <Badge className="neu-badge w-fit">RSVP</Badge>

          <CardTitle className="text-xl font-semibold">
            {event.title}
          </CardTitle>

          <div className="text-sm text-muted space-y-1">
            <p>
              {event.eventDate
                ? event.eventDate.toLocaleString()
                : "No date selected"}
              {event.location ? ` • ${event.location}` : ""}
            </p>

            {event.description && (
              <p>{event.description}</p>
            )}
          </div>

        </CardHeader>

        {/* Body */}
        <CardContent className="p-0 space-y-5">

          {/* Success message */}
          {submitted && (
            <div className="neu-card p-3 text-sm text-center">
              Thanks! Your RSVP has been recorded.
            </div>
          )}

          {/* Form */}
          <form action={submitRsvpForToken} className="space-y-5">

            {/* Name */}
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <FieldContent>
                <Input
                  id="name"
                  name="name"
                  required
                  placeholder="Your Name"
                  className="neu-input"
                />
              </FieldContent>
            </Field>

            {/* Email */}
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <FieldContent>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="neu-input"
                />
              </FieldContent>
            </Field>

            {/* Status */}
            <Field>
              <FieldLabel htmlFor="status">Attendance</FieldLabel>
              <FieldContent>
                <select
                  id="status"
                  name="status"
                  required
                  defaultValue="going"
                  className="neu-input w-full appearance-none"
                >
                  <option value="going">Going</option>
                  <option value="maybe">Maybe</option>
                  <option value="not_going">Not Going</option>
                </select>
              </FieldContent>

              <FieldDescription>
                Let the host know your availability
              </FieldDescription>
            </Field>

            {/* Submit */}
            <Button type="submit" className="neu-btn w-full">
              Submit RSVP
            </Button>

          </form>

        </CardContent>
      </Card>
    </div>
  );
}