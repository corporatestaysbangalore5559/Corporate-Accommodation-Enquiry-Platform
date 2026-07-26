import { Resend } from "resend";
import type { Enquiry } from "@prisma/client";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEnquiryNotification(enquiry: Enquiry) {
  await resend.emails.send({
    from: "Corporate Stays Bangalore <noreply@corporatestaysbangalore.com>",
    to: "jashwanth.raju@corporatestaysbangalore.com",
    subject: `New Corporate Accommodation Enquiry - ${enquiry.companyName}`,
    html: `
      <h2>New Corporate Accommodation Enquiry</h2>

      <p><strong>Company:</strong> ${enquiry.companyName}</p>

      <p><strong>Office Location:</strong> ${enquiry.officeLocation}</p>

      <p><strong>Employees:</strong> ${enquiry.numEmployees}</p>

      <p><strong>Duration:</strong> ${enquiry.duration}</p>

      <p><strong>Budget:</strong> ${enquiry.budget}</p>

      <p><strong>Check-in Date:</strong> ${enquiry.checkinDate}</p>

      <p><strong>Special Requirements:</strong> ${enquiry.specialRequirements}</p>

      <hr>

      <h3>Contact Details</h3>

      <p><strong>Name:</strong> ${enquiry.contactPersonName}</p>

      <p><strong>Email:</strong> ${enquiry.companyEmail}</p>

      <p><strong>Mobile:</strong> ${enquiry.mobileNumber}</p>
    `,
  });

  await resend.emails.send({
    from: "Corporate Stays Bangalore <noreply@corporatestaysbangalore.com>",
    to: enquiry.companyEmail,
    subject: "Thank you for contacting Corporate Stays Bangalore",
    html: `
      <h2>Thank you for your enquiry.</h2>

      <p>Dear ${enquiry.contactPersonName},</p>

      <p>We have received your accommodation requirement.</p>

      <p>Our corporate sales team will review your request and contact you shortly with the best accommodation options.</p>

      <br>

      <p>Regards,</p>

      <h3>Corporate Stays Bangalore</h3>

      <p>https://corporatestaysbangalore.com</p>
    `,
  });
}