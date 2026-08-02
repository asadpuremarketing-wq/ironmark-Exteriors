import { NextResponse } from "next/server";

export type LeadPayload = {
  name: string;
  phone: string;
  email?: string;
  service?: string;
  message?: string;
  source?: string;
  company?: string; // honeypot
};

export async function POST(request: Request) {
  let body: LeadPayload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: bots fill every field, real users never see or fill this one.
  if (body.company) {
    return NextResponse.json({ ok: true });
  }

  if (!body.name?.trim() || !body.phone?.trim()) {
    return NextResponse.json(
      { error: "Name and phone are required." },
      { status: 400 }
    );
  }

  // TODO: connect this to your lead pipeline before going live, e.g.:
  //   - Email via Resend/SendGrid (https://resend.com)
  //   - CRM webhook (HubSpot, Jobber, GoHighLevel, Zapier)
  // For now, leads are logged server-side so nothing is silently lost.
  console.log("[New Lead]", {
    ...body,
    company: undefined,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
