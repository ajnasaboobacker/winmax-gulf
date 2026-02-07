-- Create storage bucket for blog images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'blog-images',
  'blog-images',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
);

-- Allow public read access to blog images
CREATE POLICY "Public can view blog images"
ON storage.objects FOR SELECT
USING (bucket_id = 'blog-images');

-- Allow authenticated users with blog roles to upload images
CREATE POLICY "Blog authors can upload images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'blog-images' 
  AND public.has_any_blog_role(auth.uid())
);

-- Allow users to update their own uploads
CREATE POLICY "Blog authors can update own images"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'blog-images' 
  AND public.has_any_blog_role(auth.uid())
);

-- Allow admins to delete any image, others can delete own
CREATE POLICY "Blog authors can delete images"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'blog-images' 
  AND (
    public.has_role(auth.uid(), 'admin')
    OR (owner_id)::text = (auth.uid())::text
  )
);