import { business } from "@/lib/data";

type LeadEmailData = {
  name: string;
  phone: string;
  email?: string;
  service?: string;
  message?: string;
  source?: string;
};

const NAVY = "#0a1424";
const NAVY_DARK = "#050a14";
const BLUE = "#2f7fd6";
const SILVER = "#d7dce3";
const LOGO_URL = `${business.siteUrl}/images/logo.png`;

function wrapper(bodyHtml: string) {
  return `
<!doctype html>
<html>
  <body style="margin:0;padding:0;background-color:#f4f6f8;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 16px rgba(10,20,36,0.08);">
            <tr>
              <td style="background-color:${NAVY_DARK};padding:28px 32px;">
                <img src="${LOGO_URL}" alt="${business.name}" height="36" style="display:block;" />
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                ${bodyHtml}
              </td>
            </tr>
            <tr>
              <td style="background-color:${NAVY};padding:24px 32px;color:${SILVER};font-size:12px;line-height:1.6;">
                <strong style="color:#ffffff;">${business.name}</strong><br />
                ${business.address}, ${business.city}<br />
                ${business.phone} &nbsp;•&nbsp; ${business.email}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`.trim();
}

function row(label: string, value: string) {
  if (!value) return "";
  return `
    <tr>
      <td style="padding:8px 0;border-bottom:1px solid #eef1f4;font-size:13px;color:#7a8494;width:120px;vertical-align:top;">${label}</td>
      <td style="padding:8px 0;border-bottom:1px solid #eef1f4;font-size:14px;color:#0a1424;font-weight:600;">${value}</td>
    </tr>`;
}

export function internalNotificationEmail(data: LeadEmailData) {
  const subject = `New Lead: ${data.name}${data.service ? ` — ${data.service}` : ""}`;
  const html = wrapper(`
    <div style="display:inline-block;background-color:${BLUE}1a;color:${BLUE};font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;padding:6px 12px;border-radius:999px;margin-bottom:16px;">
      New Website Lead
    </div>
    <h1 style="margin:0 0 20px;font-size:20px;color:${NAVY};">You've got a new estimate request</h1>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${row("Name", data.name)}
      ${row("Phone", `<a href="tel:${data.phone}" style="color:${BLUE};text-decoration:none;">${data.phone}</a>`)}
      ${row("Email", data.email ? `<a href="mailto:${data.email}" style="color:${BLUE};text-decoration:none;">${data.email}</a>` : "")}
      ${row("Service", data.service || "")}
      ${row("Source", data.source || "")}
    </table>
    ${
      data.message
        ? `<div style="margin-top:20px;padding:16px;background-color:#f7f9fb;border-radius:10px;font-size:14px;line-height:1.6;color:#0a1424;">${data.message}</div>`
        : ""
    }
    <p style="margin-top:24px;font-size:13px;color:#7a8494;">Reach out within 1 business hour to keep your response-time promise.</p>
  `);
  return { subject, html };
}

export function customerConfirmationEmail(data: LeadEmailData) {
  const subject = `We received your request — ${business.name}`;
  const html = wrapper(`
    <div style="width:48px;height:48px;background-color:${BLUE};border-radius:999px;text-align:center;line-height:48px;margin-bottom:20px;">
      <span style="color:#ffffff;font-size:22px;">&#10003;</span>
    </div>
    <h1 style="margin:0 0 12px;font-size:20px;color:${NAVY};">Thanks, ${data.name.split(" ")[0] || data.name}!</h1>
    <p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#3a4453;">
      We've received your request${data.service ? ` for <strong>${data.service}</strong>` : ""} and a member of our team will
      reach out within <strong>1 business hour</strong> to schedule your free, no-obligation estimate.
    </p>
    <div style="margin:24px 0;padding:16px 20px;background-color:#f7f9fb;border-radius:10px;">
      <p style="margin:0;font-size:13px;color:#7a8494;">In the meantime, feel free to call us directly:</p>
      <p style="margin:6px 0 0;font-size:16px;font-weight:700;color:${NAVY};">
        <a href="tel:${business.phoneHref.replace("tel:", "")}" style="color:${NAVY};text-decoration:none;">${business.phone}</a>
      </p>
    </div>
    <p style="margin:0;font-size:13px;color:#7a8494;">
      ${business.name} — Licensed &amp; insured exterior contractor serving Hamilton, Stoney Creek, Burlington, Ancaster, Dundas and surrounding areas.
    </p>
  `);
  return { subject, html };
}
