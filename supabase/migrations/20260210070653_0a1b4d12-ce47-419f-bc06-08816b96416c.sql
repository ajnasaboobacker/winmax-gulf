ALTER TABLE public.blog_posts ADD COLUMN canonical_url text DEFAULT null;
ALTER TABLE public.blog_posts ADD COLUMN no_index boolean DEFAULT false;