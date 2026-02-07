-- Add new fields to artists table
ALTER TABLE public.artists
ADD COLUMN category text,
ADD COLUMN city text,
ADD COLUMN state text,
ADD COLUMN experience_years integer,
ADD COLUMN genres text[],
ADD COLUMN instagram text,
ADD COLUMN youtube text,
ADD COLUMN spotify text,
ADD COLUMN youtube_video_url text;

-- Create testimonials table
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  role text,
  content text NOT NULL,
  image_url text,
  is_visible boolean NOT NULL DEFAULT true,
  order_index integer NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on testimonials
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Anyone can view visible testimonials
CREATE POLICY "Anyone can view visible testimonials"
ON public.testimonials
FOR SELECT
USING (is_visible = true);

-- Admins can manage all testimonials
CREATE POLICY "Admins can manage testimonials"
ON public.testimonials
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Create contact_requests table
CREATE TABLE public.contact_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  artist_id UUID REFERENCES public.artists(id) ON DELETE SET NULL,
  name text NOT NULL,
  company text,
  email text NOT NULL,
  phone text,
  event_type text,
  event_date date,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  admin_notes text,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on contact_requests
ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;

-- Anyone can submit contact request
CREATE POLICY "Anyone can submit contact request"
ON public.contact_requests
FOR INSERT
WITH CHECK (true);

-- Admins can view all contact requests
CREATE POLICY "Admins can view contact requests"
ON public.contact_requests
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can update contact requests
CREATE POLICY "Admins can update contact requests"
ON public.contact_requests
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Admins can delete contact requests
CREATE POLICY "Admins can delete contact requests"
ON public.contact_requests
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));