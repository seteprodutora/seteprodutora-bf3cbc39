-- Allow anyone to upload images to the submissions folder
CREATE POLICY "Anyone can upload submission images"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'artist-images' AND
  (storage.foldername(name))[1] = 'submissions'
);
