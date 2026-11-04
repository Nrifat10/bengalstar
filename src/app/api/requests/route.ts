import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

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

    return NextResponse.json({ ok: true, id: saved.id }, { status: 201 });
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
    return NextResponse.json(
      { ok: false, error: "server_error" },
      { status: 500 }
    );
  }
}
