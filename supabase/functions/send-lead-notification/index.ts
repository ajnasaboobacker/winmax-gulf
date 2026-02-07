import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.95.3";

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
    };

    // Send email notification if RESEND_API_KEY is configured
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
            from: "WinmaxGulf Leads <leads@winmaxgulf.com>",
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
        }
      } catch (emailError) {
        console.error("Email notification error:", emailError);
      }
    } else {
      console.log("Email notification skipped: RESEND_API_KEY or NOTIFICATION_EMAIL not configured");
    }

    // Send WhatsApp notification if configured
    const whatsappNumber = Deno.env.get("WHATSAPP_NOTIFICATION_NUMBER");
    
    if (whatsappNumber) {
      // Generate WhatsApp click-to-chat link with pre-filled message
      const whatsappMessage = formatLeadForWhatsApp(lead);
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
      
      // Log the WhatsApp URL for manual sending or webhook integration
      console.log("WhatsApp notification URL:", whatsappUrl);
      results.whatsapp = true;
      
      // If you have a WhatsApp Business API configured, you can send directly:
      // const whatsappApiKey = Deno.env.get("WHATSAPP_API_KEY");
      // if (whatsappApiKey) {
      //   // Send via WhatsApp Business API
      // }
    } else {
      console.log("WhatsApp notification skipped: WHATSAPP_NOTIFICATION_NUMBER not configured");
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
