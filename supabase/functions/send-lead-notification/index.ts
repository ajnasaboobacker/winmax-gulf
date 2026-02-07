import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface LeadData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  company?: string;
  service_interest: string;
  message?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

const serviceLabels: Record<string, string> = {
  pdlc_smart_glass: "PDLC Smart Glass",
  led_display: "LED Display Systems",
  dj_club_solutions: "DJ Club Solutions",
  other: "General Inquiry",
};

const formatLeadForEmail = (lead: LeadData): string => {
  return `
New Lead Received!

Contact Information:
-------------------
Name: ${lead.first_name} ${lead.last_name}
Email: ${lead.email}
Phone: ${lead.phone}
${lead.company ? `Company: ${lead.company}` : ""}

Service Interest: ${serviceLabels[lead.service_interest] || lead.service_interest}

${lead.message ? `Message:\n${lead.message}` : "No message provided"}

Campaign Data:
-------------
${lead.utm_source ? `Source: ${lead.utm_source}` : "Direct visit"}
${lead.utm_medium ? `Medium: ${lead.utm_medium}` : ""}
${lead.utm_campaign ? `Campaign: ${lead.utm_campaign}` : ""}

---
This is an automated notification from WinmaxGulf Lead Capture
  `.trim();
};

const formatLeadForWhatsApp = (lead: LeadData): string => {
  const lines = [
    `🔔 *New Lead Alert!*`,
    ``,
    `👤 *${lead.first_name} ${lead.last_name}*`,
    `📧 ${lead.email}`,
    `📱 ${lead.phone}`,
  ];

  if (lead.company) {
    lines.push(`🏢 ${lead.company}`);
  }

  lines.push(``);
  lines.push(`📋 *Service:* ${serviceLabels[lead.service_interest] || lead.service_interest}`);

  if (lead.message) {
    lines.push(``);
    lines.push(`💬 *Message:*`);
    lines.push(lead.message);
  }

  if (lead.utm_campaign) {
    lines.push(``);
    lines.push(`📊 Campaign: ${lead.utm_campaign}`);
  }

  return lines.join("\n");
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const lead: LeadData = await req.json();
    console.log("Processing lead notification for:", lead.email);

    const results = {
      email: false,
      whatsapp: false,
      errors: [] as string[],
    };

    // Send email notification using Resend default domain
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const notificationEmail = Deno.env.get("NOTIFICATION_EMAIL");

    if (resendApiKey && notificationEmail) {
      try {
        const emailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "WinmaxGulf Leads <onboarding@resend.dev>",
            to: [notificationEmail],
            subject: `New Lead: ${lead.first_name} ${lead.last_name} - ${serviceLabels[lead.service_interest]}`,
            text: formatLeadForEmail(lead),
          }),
        });

        if (emailResponse.ok) {
          results.email = true;
          console.log("Email notification sent successfully");
        } else {
          const errorText = await emailResponse.text();
          console.error("Email send failed:", errorText);
          results.errors.push(`Email failed: ${errorText}`);
        }
      } catch (emailError) {
        console.error("Email notification error:", emailError);
        results.errors.push(`Email error: ${emailError}`);
      }
    } else {
      console.log("Email notification skipped: RESEND_API_KEY or NOTIFICATION_EMAIL not configured");
    }

    // Send WhatsApp notification via Whapi.cloud
    const whapiToken = Deno.env.get("WHAPI_TOKEN");
    const whatsappNumber = Deno.env.get("WHATSAPP_NOTIFICATION_NUMBER");
    
    if (whapiToken && whatsappNumber) {
      try {
        const whatsappMessage = formatLeadForWhatsApp(lead);
        
        // Format phone number for Whapi (remove + if present, add @s.whatsapp.net)
        const formattedNumber = whatsappNumber.replace(/^\+/, "");
        
        const whapiResponse = await fetch("https://gate.whapi.cloud/messages/text", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${whapiToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: formattedNumber,
            body: whatsappMessage,
          }),
        });

        if (whapiResponse.ok) {
          results.whatsapp = true;
          console.log("WhatsApp notification sent successfully via Whapi");
        } else {
          const errorText = await whapiResponse.text();
          console.error("WhatsApp send failed:", errorText);
          results.errors.push(`WhatsApp failed: ${errorText}`);
        }
      } catch (whatsappError) {
        console.error("WhatsApp notification error:", whatsappError);
        results.errors.push(`WhatsApp error: ${whatsappError}`);
      }
    } else {
      console.log("WhatsApp notification skipped: WHAPI_TOKEN or WHATSAPP_NOTIFICATION_NUMBER not configured");
    }

    return new Response(
      JSON.stringify({
        success: true,
        notifications: results,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Lead notification error:", error);
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
