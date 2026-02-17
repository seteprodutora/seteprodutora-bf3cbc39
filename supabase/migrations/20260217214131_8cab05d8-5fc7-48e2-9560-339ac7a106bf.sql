
-- Drop the restrictive INSERT policy and replace with a permissive one
DROP POLICY IF EXISTS "Anyone can submit application" ON public.artist_submissions;

CREATE POLICY "Anyone can submit application"
ON public.artist_submissions
FOR INSERT
WITH CHECK (true);
