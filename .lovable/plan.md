
# Add Canonical URL and Robots Noindex/Nofollow to Blog Editor

## Overview
Add two new advanced SEO fields to the blog post editor: a custom canonical URL input and a noindex/nofollow toggle. These give you fine-grained control over how search engines index each post.

## What You'll Get

**1. Canonical URL Field**
- A text input where you can optionally set a custom canonical URL for the post (e.g., if the content was originally published elsewhere).
- If left blank, the system automatically uses the default `https://winmaxgulf.com/blog/{slug}` -- no action needed for most posts.
- Appears in the SEO Settings card below the existing meta description field.

**2. Robots Noindex/Nofollow Toggle**
- A switch/checkbox that lets you mark a post as "noindex, nofollow" -- telling search engines not to index or follow links on that page.
- Useful for test posts, thin content, or duplicate pages you want to keep live but hidden from search results.
- A small warning label will appear when enabled so you don't accidentally leave it on.

## How It Works on the Public Page
- The `BlogPost.tsx` page will pass the new `canonicalUrl` and `noIndex` values to the existing `SEOHead` component, which already supports both props -- so no changes needed to SEOHead itself.

---

## Technical Details

### Database Migration
Add two columns to `blog_posts`:

```sql
ALTER TABLE public.blog_posts ADD COLUMN canonical_url text DEFAULT null;
ALTER TABLE public.blog_posts ADD COLUMN no_index boolean DEFAULT false;
```

### Changes to `src/pages/admin/PostEditor.tsx`
- Add `canonicalUrl` and `noIndex` state variables
- Load/save the new fields from/to the database
- Add a "Canonical URL" input field and a "Noindex / Nofollow" switch inside the SEO Settings card, below the existing meta description
- Add validation: canonical URL must be a valid URL if provided (max 500 chars)

### Changes to `src/pages/BlogPost.tsx`
- Include `canonical_url` and `no_index` in the BlogPost interface
- Pass `canonicalUrl` and `noIndex` props to the `SEOHead` component (which already handles them)

### Files Changed
| File | Action |
|---|---|
| Database migration | Add `canonical_url` and `no_index` columns |
| `src/pages/admin/PostEditor.tsx` | Edit -- add canonical URL input, noindex toggle, state, and save logic |
| `src/pages/BlogPost.tsx` | Edit -- pass new fields to SEOHead |
