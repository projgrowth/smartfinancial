import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "X-Robots-Tag": "noindex, nofollow",
  "Cache-Control": "no-store, no-cache, must-revalidate",
};

// Simple in-memory rate limiting (resets on function cold start)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

// Allowed origins for origin validation
const ALLOWED_ORIGINS = [
  "https://ffmmdltyhwebbrkinzcz.lovableproject.com",
  "https://thesmartfinancialplan.com",
  "https://www.thesmartfinancialplan.com",
  "http://localhost:5173", // Local development
  "http://localhost:3000",
];

function isOriginAllowed(origin: string | null): boolean {
  if (!origin) return false;
  return ALLOWED_ORIGINS.some(allowed => 
    origin === allowed || origin.endsWith(".lovableproject.com")
  );
}

function getRateLimitKey(req: Request): string {
  // Use a combination of origin and forwarded IP for rate limiting
  const origin = req.headers.get("origin") || "unknown";
  const forwardedFor = req.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim() || "unknown";
  return `${origin}:${ip}`;
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(key);
  
  if (!record || now > record.resetTime) {
    // Reset or create new record
    rateLimitMap.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  
  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }
  
  record.count++;
  return false;
}

interface NotificationRequest {
  type: "meeting";
  data: {
    name: string;
    email: string;
    phone: string;
    preferred_date?: string;
    message?: string;
  };
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Origin validation
    const origin = req.headers.get("origin");
    if (!isOriginAllowed(origin)) {
      console.warn(`Blocked request from unauthorized origin: ${origin}`);
      return new Response(
        JSON.stringify({ error: "Unauthorized origin" }),
        { status: 403, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Rate limiting
    const rateLimitKey = getRateLimitKey(req);
    if (isRateLimited(rateLimitKey)) {
      console.warn(`Rate limited request from: ${rateLimitKey}`);
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        { status: 429, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const { type, data }: NotificationRequest = await req.json();
    console.log(`Processing ${type} notification for`, data.email);

    if (type !== "meeting") {
      throw new Error(`Unknown notification type: ${type}`);
    }

    // Basic input validation
    if (!data.name || !data.email || typeof data.name !== "string" || typeof data.email !== "string") {
      return new Response(
        JSON.stringify({ error: "Invalid input: name and email are required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Sanitize inputs for email HTML
    const sanitize = (str: string | undefined) => 
      str ? str.replace(/[<>&"']/g, (c) => `&#${c.charCodeAt(0)};`) : "";

    const emailSubject = `New Meeting Request - ${sanitize(data.name)}`;
    const emailHtml = `
      <h2>New Meeting Request</h2>
      <p><strong>Name:</strong> ${sanitize(data.name)}</p>
      <p><strong>Email:</strong> ${sanitize(data.email)}</p>
      <p><strong>Phone:</strong> ${sanitize(data.phone)}</p>
      <p><strong>Preferred Date:</strong> ${sanitize(data.preferred_date)}</p>
      ${data.message ? `<p><strong>Message:</strong> ${sanitize(data.message)}</p>` : ''}
      <hr>
      <p><small>Submitted from Smart Financial Planning website</small></p>
    `;

    // Send notification email to business owner
    const emailResponse = await resend.emails.send({
      from: "Smart Financial Planning <onboarding@resend.dev>",
      to: ["vince@thesmartfinancialplan.com"],
      subject: emailSubject,
      html: emailHtml,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailId: emailResponse.id }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error("Error in send-notification function:", errorMessage);
    return new Response(
      JSON.stringify({ error: "An error occurred processing your request" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
