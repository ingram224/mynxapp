import nodemailer from "nodemailer";

type LeadPayload = {
  email: string;
  name?: string | null;
  source?: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
};

function getTransport() {
  const { SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_USER || !SMTP_PASS) return null;
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "smtp.yandex.ru",
    port: Number(process.env.SMTP_PORT ?? 465),
    secure: true,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });
}

export async function sendLeadNotification(lead: LeadPayload): Promise<void> {
  const to = process.env.LEAD_NOTIFY_EMAIL;
  const transport = getTransport();
  if (!to || !transport) {
    console.warn("Lead notification skipped: SMTP_USER/SMTP_PASS/LEAD_NOTIFY_EMAIL not set");
    return;
  }

  const rows = [
    ["Email", lead.email],
    ["Имя", lead.name],
    ["Источник", lead.source],
    ["UTM source", lead.utm_source],
    ["UTM medium", lead.utm_medium],
    ["UTM campaign", lead.utm_campaign],
  ].filter(([, v]) => v);

  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html = `<table cellpadding="6" style="border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><td style="color:#888">${k}</td><td>${v}</td></tr>`)
    .join("")}</table>`;

  await transport.sendMail({
    from: `Mynx сайт <${process.env.SMTP_USER}>`,
    to,
    subject: `Новая заявка с сайта: ${lead.email}`,
    text,
    html,
  });
}
