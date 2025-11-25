import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NotificationRequest {
  type: "meeting" | "newsletter" | "rsvp";
  data: {
    name?: string;
    email: string;
    phone?: string;
    preferred_date?: string;
    message?: string;
    interests?: string[];
    guests?: number;
    dietary_restrictions?: string;
  };
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, data }: NotificationRequest = await req.json();
    console.log(`Processing ${type} notification for`, data.email);

    let emailSubject = "";
    let emailHtml = "";

    switch (type) {
      case "meeting":
        emailSubject = `New Meeting Request - ${data.name}`;
        emailHtml = `
          <h2>New Meeting Request</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <p><strong>Preferred Date:</strong> ${data.preferred_date}</p>
          ${data.message ? `<p><strong>Message:</strong> ${data.message}</p>` : ''}
          <hr>
          <p><small>Submitted from Smart Financial Planning website</small></p>
        `;
        break;

      case "newsletter":
        emailSubject = `New Newsletter Subscription - ${data.email}`;
        emailHtml = `
          <h2>New Newsletter Subscriber</h2>
          <p><strong>Email:</strong> ${data.email}</p>
          ${data.name ? `<p><strong>Name:</strong> ${data.name}</p>` : ''}
          ${data.interests && data.interests.length > 0 ? `<p><strong>Interests:</strong> ${data.interests.join(', ')}</p>` : ''}
          <hr>
          <p><small>Subscribed from Smart Financial Planning website</small></p>
        `;
        break;

      case "rsvp":
        emailSubject = `New RSVP Submission - ${data.name}`;
        emailHtml = `
          <h2>New RSVP Submission</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Guests:</strong> ${data.guests || 1}</p>
          ${data.dietary_restrictions ? `<p><strong>Dietary Restrictions:</strong> ${data.dietary_restrictions}</p>` : ''}
          ${data.message ? `<p><strong>Message:</strong> ${data.message}</p>` : ''}
          <hr>
          <p><small>Submitted from Smart Financial Planning RSVP page</small></p>
        `;
        break;
    }

    // Send notification email to business owner
    const emailResponse = await resend.emails.send({
      from: "Smart Financial Planning <onboarding@resend.dev>",
      to: ["vince@thesmartfinancialplan.com"], // Business email
      subject: emailSubject,
      html: emailHtml,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailId: emailResponse.id }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
