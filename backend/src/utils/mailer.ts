import nodemailer from "nodemailer";
import type { Enquiry } from "@prisma/client";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

function formatDate(date: Date): string {
  return date.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function buildHtml(e: Enquiry): string {
  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:10px 14px;border-bottom:1px solid #eef1f5;color:#5b6472;font-size:13px;white-space:nowrap;">${label}</td>
      <td style="padding:10px 14px;border-bottom:1px solid #eef1f5;color:#14213d;font-size:14px;font-weight:600;">${value || "—"}</td>
    </tr>`;

  return `
  <div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:600px;margin:0 auto;">
    <div style="background:#0F2A4A;padding:20px 24px;border-radius:10px 10px 0 0;">
      <p style="margin:0;color:#fff;font-size:16px;font-weight:600;">New Corporate Accommodation Enquiry</p>
    </div>
    <div style="border:1px solid #eef1f5;border-top:none;border-radius:0 0 10px 10px;">
      <table style="width:100%;border-collapse:collapse;">
        ${row("Company Name", e.companyName)}
        ${row("Office Location", e.officeLocation)}
        ${row("Number of Employees", e.numEmployees)}
        ${row("Duration", e.duration)}
        ${row("Budget", e.budget)}
        ${row("Check-in Date", e.checkinDate)}
        ${row("Special Requirements", e.specialRequirements || "None specified")}
        ${row("Contact Person", e.contactPersonName)}
        ${row("Company Email", e.companyEmail)}
        ${row("Mobile Number", e.mobileNumber)}
        ${row("Submitted On", formatDate(e.createdAt))}
      </table>
      <p style="padding:16px;margin:0;color:#5b6472;font-size:13px;">
        Please contact this client as soon as possible.
      </p>
    </div>
  </div>`;
}

function buildText(e: Enquiry): string {
  return `A new corporate accommodation enquiry has been received.

Company Name: ${e.companyName}
Office Location: ${e.officeLocation}
Number of Employees: ${e.numEmployees}
Duration: ${e.duration}
Budget: ${e.budget}
Check-in Date: ${e.checkinDate}
Special Requirements: ${e.specialRequirements || "None specified"}
Contact Person: ${e.contactPersonName}
Company Email: ${e.companyEmail}
Mobile Number: ${e.mobileNumber}
Submitted On: ${formatDate(e.createdAt)}

Please contact this client as soon as possible.`;
}

export async function sendEnquiryNotification(enquiry: Enquiry): Promise<void> {
  await transporter.sendMail({
    from: `"Corporate Stays Bangalore" <${process.env.FROM_EMAIL || process.env.SMTP_USER}>`,
    to: process.env.NOTIFY_EMAIL,
    subject: `New Corporate Accommodation Enquiry — ${enquiry.companyName}`,
    text: buildText(enquiry),
    html: buildHtml(enquiry),
  });
}
