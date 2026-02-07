-- Create role enum for blog users
CREATE TYPE public.app_role AS ENUM ('admin', 'editor', 'author');

-- User roles table (separate from profiles for security)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles (avoids RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Function to check if user has any blog role
CREATE OR REPLACE FUNCTION public.has_any_blog_role(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role IN ('admin', 'editor', 'author')
  )
$$;

-- Blog categories table
CREATE TABLE public.blog_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Blog tags table
CREATE TABLE public.blog_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Blog posts table
CREATE TABLE public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL DEFAULT '',
  featured_image_url TEXT,
  author_id UUID REFERENCES auth.users(id) NOT NULL,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'scheduled', 'archived')),
  published_at TIMESTAMPTZ,
  scheduled_for TIMESTAMPTZ,
  meta_title TEXT,
  meta_description TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Post-Category junction table
CREATE TABLE public.post_categories (
  post_id UUID REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  category_id UUID REFERENCES public.blog_categories(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, category_id)
);

-- Post-Tag junction table
CREATE TABLE public.post_tags (
  post_id UUID REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES public.blog_tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- Enable RLS on all tables
ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_tags ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS POLICIES FOR user_roles
-- ============================================

-- Only admins can view all roles
CREATE POLICY "Admins can view all roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can manage roles
CREATE POLICY "Admins can insert roles"
ON public.user_roles FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete roles"
ON public.user_roles FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- ============================================
-- RLS POLICIES FOR blog_categories
-- ============================================

-- Anyone can read categories
CREATE POLICY "Anyone can view categories"
ON public.blog_categories FOR SELECT
USING (true);

-- Only admins/editors can manage categories
CREATE POLICY "Admins and editors can insert categories"
ON public.blog_categories FOR INSERT
TO authenticated
WITH CHECK (
  public.has_role(auth.uid(), 'admin') OR 
  public.has_role(auth.uid(), 'editor')
);

CREATE POLICY "Admins and editors can update categories"
ON public.blog_categories FOR UPDATE
TO authenticated
USING (
  public.has_role(auth.uid(), 'admin') OR 
  public.has_role(auth.uid(), 'editor')
);

CREATE POLICY "Admins can delete categories"
ON public.blog_categories FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- ============================================
-- RLS POLICIES FOR blog_tags
-- ============================================

-- Anyone can read tags
CREATE POLICY "Anyone can view tags"
ON public.blog_tags FOR SELECT
USING (true);

-- Authorized users can manage tags
CREATE POLICY "Authorized users can insert tags"
ON public.blog_tags FOR INSERT
TO authenticated
WITH CHECK (public.has_any_blog_role(auth.uid()));

CREATE POLICY "Authorized users can update tags"
ON public.blog_tags FOR UPDATE
TO authenticated
USING (public.has_any_blog_role(auth.uid()));

CREATE POLICY "Admins can delete tags"
ON public.blog_tags FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- ============================================
-- RLS POLICIES FOR blog_posts
-- ============================================

-- Public can read published posts only
CREATE POLICY "Anyone can view published posts"
ON public.blog_posts FOR SELECT
USING (
  status = 'published' AND published_at <= now()
  OR public.has_any_blog_role(auth.uid())
);

-- Authors can create posts
CREATE POLICY "Authorized users can create posts"
ON public.blog_posts FOR INSERT
TO authenticated
WITH CHECK (
  public.has_any_blog_role(auth.uid()) AND
  author_id = auth.uid()
);

-- Authors can update their own posts, admins/editors can update any
CREATE POLICY "Authors can update own posts, admins/editors can update any"
ON public.blog_posts FOR UPDATE
TO authenticated
USING (
  (author_id = auth.uid() AND public.has_any_blog_role(auth.uid()))
  OR public.has_role(auth.uid(), 'admin')
  OR public.has_role(auth.uid(), 'editor')
);

-- Authors can delete own drafts, admins can delete any
CREATE POLICY "Authors can delete own drafts, admins can delete any"
ON public.blog_posts FOR DELETE
TO authenticated
USING (
  (author_id = auth.uid() AND status = 'draft')
  OR public.has_role(auth.uid(), 'admin')
);

-- ============================================
-- RLS POLICIES FOR post_categories
-- ============================================

CREATE POLICY "Anyone can view post categories"
ON public.post_categories FOR SELECT
USING (true);

CREATE POLICY "Authorized users can manage post categories"
ON public.post_categories FOR INSERT
TO authenticated
WITH CHECK (public.has_any_blog_role(auth.uid()));

CREATE POLICY "Authorized users can delete post categories"
ON public.post_categories FOR DELETE
TO authenticated
USING (public.has_any_blog_role(auth.uid()));

-- ============================================
-- RLS POLICIES FOR post_tags
-- ============================================

CREATE POLICY "Anyone can view post tags"
ON public.post_tags FOR SELECT
USING (true);

CREATE POLICY "Authorized users can manage post tags"
ON public.post_tags FOR INSERT
TO authenticated
WITH CHECK (public.has_any_blog_role(auth.uid()));

CREATE POLICY "Authorized users can delete post tags"
ON public.post_tags FOR DELETE
TO authenticated
USING (public.has_any_blog_role(auth.uid()));

-- ============================================
-- TRIGGERS FOR updated_at
-- ============================================

-- Create or replace the update timestamp function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Add triggers
CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_blog_categories_updated_at
BEFORE UPDATE ON public.blog_categories
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

CREATE INDEX idx_blog_posts_status ON public.blog_posts(status);
CREATE INDEX idx_blog_posts_published_at ON public.blog_posts(published_at);
CREATE INDEX idx_blog_posts_author_id ON public.blog_posts(author_id);
CREATE INDEX idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX idx_blog_categories_slug ON public.blog_categories(slug);
CREATE INDEX idx_blog_tags_slug ON public.blog_tags(slug);