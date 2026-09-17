import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
  internalNotificationEmail,
  customerConfirmationEmail,
  checklistConfirmationEmail,
} from "@/lib/emailTemplates";

export type LeadPayload = {
  name: string;
  phone: string;
  email: string;
  service: string;
  message?: string;
  source?: string;
  company?: string; // honeypot
};

const LEAD_INBOX = "ironmarkexteriors@gmail.com";

function getTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) return null;

  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}

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

  if (!body.email?.trim() || !body.service?.trim()) {
    return NextResponse.json(
      { error: "Email and service are required." },
      { status: 400 }
    );
  }

  // Low-friction opt-ins (e.g. the seasonal checklist signup) only collect
  // an email address, name/phone are optional for those.
  body.name = body.name?.trim() || "Not provided";
  body.phone = body.phone?.trim() || "Not provided";

  console.log("[New Lead]", {
    ...body,
    company: undefined,
    receivedAt: new Date().toISOString(),
  });

  const transporter = getTransporter();

  if (!transporter) {
    console.warn(
      "[New Lead] GMAIL_USER / GMAIL_APP_PASSWORD are not set, email notifications were skipped."
    );
    return NextResponse.json({ ok: true });
  }

  const leadData = {
    name: body.name,
    phone: body.phone,
    email: body.email,
    service: body.service,
    message: body.message,
    source: body.source,
  };

  const fromAddress = `"Ironmark Exteriors" <${process.env.GMAIL_USER}>`;

  const internal = internalNotificationEmail(leadData);
  const confirmation =
    leadData.service === "Seasonal Maintenance Checklist"
      ? checklistConfirmationEmail()
      : customerConfirmationEmail(leadData);

  const results = await Promise.allSettled([
    transporter.sendMail({
      from: fromAddress,
      to: LEAD_INBOX,
      replyTo: body.email,
      subject: internal.subject,
      html: internal.html,
    }),
    transporter.sendMail({
      from: fromAddress,
      to: body.email,
      subject: confirmation.subject,
      html: confirmation.html,
    }),
  ]);

  results.forEach((result, i) => {
    if (result.status === "rejected") {
      console.error(`[New Lead] Email task ${i} failed:`, result.reason);
    }
  });

  return NextResponse.json({ ok: true });
}
