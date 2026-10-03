import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";
import { authMiddleware } from "@/lib/auth/middleware";
import { SERVICES, PLACES, validateBookingRequest, type BookingRequestInput } from "@/lib/booking-request";

const STUDIO = "glow-me";

const requestSchema = z.object({
  name: z.string().max(80),
  email: z.string().max(120),
  phone: z.string().max(30),
  service: z.string().max(40),
  place: z.string().max(20),
  preferredDate: z.string().max(12),
  preferredTime: z.string().max(8),
  partySize: z.string().max(4),
  suburb: z.string().max(80),
  note: z.string().max(500),
});

export type DeskRequest = {
  id: string;
  service: string;
  place: string;
  preferredDate: string;
  preferredTime: string;
  partySize: number | null;
  suburb: string;
  note: string;
  status: string;
  createdAt: string;
  clientId: string;
  clientName: string;
  email: string;
  phone: string;
  shadeNote: string;
};

async function requireMember(userId: string): Promise<"owner" | "staff" | null> {
  const sql = await getSql();
  await sql`
    insert into studio_members (user_id, studio_id, role)
    select ${userId}, ${STUDIO}, 'owner'
    where not exists (select 1 from studio_members where studio_id = ${STUDIO})
  `;
  const rows = await sql<{ role: "owner" | "staff" }>`
    select role from studio_members where user_id = ${userId} and studio_id = ${STUDIO}
  `;
  return rows[0]?.role ?? null;
}

export const submitBookingRequest = createServerFn({ method: "POST" })
  .validator((input: BookingRequestInput) => requestSchema.parse(input))
  .handler(async ({ data }) => {
    const errors = validateBookingRequest(data);
    if (Object.keys(errors).length > 0) return { ok: false as const, errors };
    const sql = await getSql();
    const email = data.email.trim().toLowerCase();
    const phone = data.phone.trim();
    const existing = await sql<{ id: string }>`
      select id from clients where studio_id = ${STUDIO} and lower(email) = ${email} limit 1
    `;
    const clientId = existing[0]?.id ?? crypto.randomUUID();
    if (existing[0]) {
      await sql`
        update clients set name = ${data.name.trim()}, phone = ${phone}, updated_at = now()
        where id = ${clientId} and studio_id = ${STUDIO}
      `;
    } else {
      await sql`
        insert into clients (id, studio_id, name, email, phone)
        values (${clientId}, ${STUDIO}, ${data.name.trim()}, ${email}, ${phone})
      `;
    }
    const party = Number.parseInt(data.partySize, 10);
    await sql`
      insert into booking_requests (
        id, studio_id, client_id, service, place, preferred_date, preferred_time, party_size, suburb, note
      ) values (
        ${crypto.randomUUID()}, ${STUDIO}, ${clientId}, ${data.service}, ${data.place},
        ${data.preferredDate}, ${data.preferredTime},
        ${Number.isFinite(party) && party > 0 ? party : null}, ${data.suburb.trim()}, ${data.note.trim()}
      )
    `;
    return { ok: true as const };
  });

export const loadDesk = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const role = await requireMember(context.userId);
    if (!role) return { allowed: false as const, role: null, requests: [] as DeskRequest[] };
    const sql = await getSql();
    const rows = await sql<{
      id: string;
      service: string;
      place: string;
      preferred_date: string;
      preferred_time: string;
      party_size: number | null;
      suburb: string;
      note: string;
      status: string;
      created_at: string;
      client_id: string;
      client_name: string;
      email: string;
      phone: string;
      shade_note: string;
    }>`
      select r.id, r.service, r.place, r.preferred_date, r.preferred_time, r.party_size, r.suburb,
             r.note, r.status, r.created_at, c.id as client_id, c.name as client_name, c.email, c.phone, c.shade_note
      from booking_requests r
      join clients c on c.id = r.client_id
      where r.studio_id = ${STUDIO}
      order by r.created_at desc
      limit 100
    `;
    return {
      allowed: true as const,
      role,
      requests: rows.map((row) => ({
        id: row.id,
        service: row.service,
        place: row.place,
        preferredDate: row.preferred_date,
        preferredTime: row.preferred_time,
        partySize: row.party_size,
        suburb: row.suburb,
        note: row.note,
        status: row.status,
        createdAt: row.created_at,
        clientId: row.client_id,
        clientName: row.client_name,
        email: row.email,
        phone: row.phone,
        shadeNote: row.shade_note,
      })),
    };
  });

export const setRequestStatus = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { id: string; status: string }) =>
    z.object({ id: z.string().min(8), status: z.enum(["new", "confirmed", "done", "declined"]) }).parse(input),
  )
  .handler(async ({ context, data }) => {
    const role = await requireMember(context.userId);
    if (!role) return { ok: false as const };
    const sql = await getSql();
    await sql`
      update booking_requests set status = ${data.status}
      where id = ${data.id} and studio_id = ${STUDIO}
    `;
    return { ok: true as const };
  });

export const saveShadeNote = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { clientId: string; shadeNote: string }) =>
    z.object({ clientId: z.string().min(8), shadeNote: z.string().max(300) }).parse(input),
  )
  .handler(async ({ context, data }) => {
    const role = await requireMember(context.userId);
    if (!role) return { ok: false as const };
    const sql = await getSql();
    await sql`
      update clients set shade_note = ${data.shadeNote.trim()}, updated_at = now()
      where id = ${data.clientId} and studio_id = ${STUDIO}
    `;
    return { ok: true as const };
  });

export const serviceOptions = SERVICES;
export const placeOptions = PLACES;
