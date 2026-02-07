-- Create enum for service interest
CREATE TYPE public.service_interest AS ENUM (
  'pdlc_smart_glass',
  'led_display',
  'dj_club_solutions',
  'other'
);

-- Create leads table for storing form submissions
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company TEXT,
  service_interest service_interest NOT NULL,
  message TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_content TEXT,
  utm_term TEXT,
  referrer_url TEXT,
  landing_page_url TEXT,
  ip_address TEXT,
  user_agent TEXT,
  notification_sent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous inserts (for public form submission)
CREATE POLICY "Anyone can submit leads"
ON public.leads
FOR INSERT
TO anon
WITH CHECK (true);

-- Create policy to prevent direct reads (data should only be accessed via admin/edge functions)
CREATE POLICY "No direct read access"
ON public.leads
FOR SELECT
USING (false);

-- Create index for faster querying
CREATE INDEX idx_leads_created_at ON public.leads(created_at DESC);
CREATE INDEX idx_leads_service_interest ON public.leads(service_interest);
CREATE INDEX idx_leads_utm_campaign ON public.leads(utm_campaign);