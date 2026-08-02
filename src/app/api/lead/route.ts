import { NextResponse } from "next/server";
import { Resend } from "resend";
import { internalNotificationEmail, customerConfirmationEmail } from "@/lib/emailTemplates";

export type LeadPayload = {
  name: string;
  phone: string;
  email?: string;
  service?: string;
  message?: string;
  source?: string;
  company?: string; // honeypot
};

const LEAD_INBOX = "ironmarkexteriors@gmail.com";
// Resend requires a verified sending domain to send from your own address.
// Until ironmarkexteriors.ca is verified in Resend, this uses their shared
// test sender, which works but shows "via resend.dev" to recipients.
const FROM_ADDRESS = "Ironmark Exteriors <onboarding@resend.dev>";

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

  console.log("[New Lead]", {
    ...body,
    company: undefined,
    receivedAt: new Date().toISOString(),
  });

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.warn(
      "[New Lead] RESEND_API_KEY is not set — email notifications were skipped."
    );
    return NextResponse.json({ ok: true });
  }

  const resend = new Resend(apiKey);
  const leadData = {
    name: body.name,
    phone: body.phone,
    email: body.email,
    service: body.service,
    message: body.message,
    source: body.source,
  };

  const emailTasks: Promise<unknown>[] = [];

  const internal = internalNotificationEmail(leadData);
  emailTasks.push(
    resend.emails.send({
      from: FROM_ADDRESS,
      to: LEAD_INBOX,
      replyTo: body.email || undefined,
      subject: internal.subject,
      html: internal.html,
    })
  );

  if (body.email?.trim()) {
    const confirmation = customerConfirmationEmail(leadData);
    emailTasks.push(
      resend.emails.send({
        from: FROM_ADDRESS,
        to: body.email,
        subject: confirmation.subject,
        html: confirmation.html,
      })
    );
  }

  const results = await Promise.allSettled(emailTasks);
  results.forEach((result, i) => {
    if (result.status === "rejected") {
      console.error(`[New Lead] Email task ${i} failed:`, result.reason);
    }
  });

  return NextResponse.json({ ok: true });
}
