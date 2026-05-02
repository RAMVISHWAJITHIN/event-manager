import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Field,
  FieldLabel,
  FieldContent,
  FieldDescription,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createEventAction } from "@/lib/actions/events";

export default function NewEventPage() {
  return (
    <div className="mx-auto w-full max-w-2xl py-10 px-4">

      {/* ================= CARD ================= */}
      <Card className="neu-card p-8">
        
        <CardHeader className="p-0 mb-6">
          <CardTitle className="text-2xl font-semibold">
            Create Event
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          <form className="space-y-6" action={createEventAction}>

            {/* ================= TITLE ================= */}
            <Field>
              <FieldLabel htmlFor="title">Title</FieldLabel>
              <FieldContent>
                <Input
                  id="title"
                  name="title"
                  required
                  placeholder="Team dinner"
                  className="neu-input"
                />
              </FieldContent>
            </Field>

            {/* ================= DESCRIPTION ================= */}
            <Field>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <FieldContent>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Optional details about the event"
                  className="neu-input"
                />
              </FieldContent>
            </Field>

            {/* ================= LOCATION ================= */}
            <Field>
              <FieldLabel htmlFor="location">Location</FieldLabel>
              <FieldContent>
                <Input
                  id="location"
                  name="location"
                  placeholder="Optional location"
                  className="neu-input"
                />
              </FieldContent>
            </Field>

            {/* ================= DATE ================= */}
            <Field>
              <FieldLabel htmlFor="eventDate">Date and Time</FieldLabel>
              <FieldContent>
                <Input
                  id="eventDate"
                  name="eventDate"
                  type="datetime-local"
                  className="neu-input"
                />
                <FieldDescription>
                  Optional, you can set this later
                </FieldDescription>
              </FieldContent>
            </Field>

            {/* ================= ACTION BUTTONS ================= */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">

              <Button type="submit" className="neu-btn flex-1">
                Create Event
              </Button>

              <Button type="button" className="neu-btn flex-1" asChild>
                <Link href="/dashboard">Cancel</Link>
              </Button>

            </div>

          </form>
        </CardContent>
      </Card>

    </div>
  );
}