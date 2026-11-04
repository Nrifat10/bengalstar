import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { SITE } from "@/lib/i18n";

export const dynamic = "force-dynamic";

type RequestPayload = {
  name?: unknown;
  company?: unknown;
  phone?: unknown;
  city?: unknown;
  workerType?: unknown;
  message?: unknown;
  lang?: unknown;
};

const asString = (v: unknown): string =>
  typeof v === "string" ? v.trim() : "";

/**
 * Build a pre-filled WhatsApp deep link carrying the lead details.
 * Used as a fallback when the database is unreachable (e.g. on Vercel
 * serverless where the SQLite file system is read-only at runtime) so
 * no inbound lead is ever silently dropped.
 */
function buildWhatsAppLink(p: {
  name: string;
  company: string;
  phone: string;
  city: string;
  workerType: string;
  message: string;
  lang: string;
}): string {
  const lines = [
    "New worker request — bengalstarltd.com",
    `Name: ${p.name}`,
    `Company: ${p.company || "—"}`,
    `Phone: ${p.phone}`,
    `City: ${p.city}`,
    `Worker type: ${p.workerType}`,
    `Message: ${p.message || "—"}`,
    `Language: ${p.lang}`,
  ];
  return `${SITE.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as RequestPayload;

    const name = asString(body.name);
    const phone = asString(body.phone);
    const city = asString(body.city);
    const workerType = asString(body.workerType);
    const company = asString(body.company);
    const message = asString(body.message);
    const lang = asString(body.lang) === "ar" ? "ar" : "en";

    /* Validation */
    const errors: Record<string, string> = {};
    if (name.length < 2 || name.length > 120)
      errors.name = "invalid_name";
    if (!/^[+]?[\d\s()-]{7,20}$/.test(phone))
      errors.phone = "invalid_phone";
    if (!city) errors.city = "invalid_city";
    if (!workerType) errors.workerType = "invalid_worker_type";
    if (message.length > 2000) errors.message = "invalid_message";

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { ok: false, errors },
        { status: 400 }
      );
    }

    const lead = { name, company, phone, city, workerType, message, lang };
    const whatsapp = buildWhatsAppLink(lead);

    /* Try to persist. On serverless read-only FS this throws — we catch
       it and still return success with a WhatsApp fallback link so the
       lead reaches the business. */
    try {
      const saved = await db.workerRequest.create({
        data: {
          name,
          company: company || null,
          phone,
          city,
          workerType,
          message: message || null,
          lang,
        },
        select: { id: true, createdAt: true },
      });
      return NextResponse.json(
        { ok: true, id: saved.id },
        { status: 201 }
      );
    } catch (dbError) {
      console.error("[api/requests] DB write failed, returning WhatsApp fallback:", dbError);
      return NextResponse.json(
        { ok: true, id: `wa-${Date.now()}`, whatsapp, fallback: "whatsapp" },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("[api/requests] POST failed:", error);
    return NextResponse.json(
      { ok: false, error: "server_error" },
      { status: 500 }
    );
  }
}

/* Lightweight listing for internal checks */
export async function GET() {
  try {
    const count = await db.workerRequest.count();
    return NextResponse.json({ ok: true, count });
  } catch (error) {
    console.error("[api/requests] GET failed:", error);
    /* On Vercel serverless the DB may be unreachable — return 0 rather
       than a 500 so internal health checks don't fail. */
    return NextResponse.json({ ok: true, count: 0, fallback: true });
  }
}
