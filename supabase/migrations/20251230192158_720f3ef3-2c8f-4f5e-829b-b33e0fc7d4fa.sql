-- Create artist submissions table for pending registrations
CREATE TABLE public.artist_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  bio TEXT NOT NULL,
  profile_image TEXT NOT NULL,
  category TEXT NOT NULL,
  instagram TEXT,
  youtube TEXT,
  spotify TEXT,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  experience_years INTEGER,
  genres TEXT[],
  status TEXT NOT NULL DEFAULT 'pending',
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by UUID REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.artist_submissions ENABLE ROW LEVEL SECURITY;

-- Anyone can submit (insert)
CREATE POLICY "Anyone can submit application"
ON public.artist_submissions
FOR INSERT
WITH CHECK (true);

-- Only admins can view submissions
CREATE POLICY "Admins can view all submissions"
ON public.artist_submissions
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can update submissions
CREATE POLICY "Admins can update submissions"
ON public.artist_submissions
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can delete submissions
CREATE POLICY "Admins can delete submissions"
ON public.artist_submissions
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));