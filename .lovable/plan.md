

# Add SEO Toolkit to Blog Post Editor

## Overview
Enhance the blog post editor with a focus keyword field, a real-time SEO score indicator, and a keyword density checker -- all computed client-side with no database changes needed.

## What You'll Get

**1. Focus Keyword Field**
- A text input where you enter the main keyword/phrase you want the post to rank for (e.g., "PDLC smart film UAE").
- The keyword is saved to the database so it persists when you re-open the post.

**2. SEO Score Indicator**
- A visual progress bar (color-coded: red / yellow / green) with a score from 0-100.
- The score is calculated in real-time based on these checks:
  - Focus keyword appears in the title
  - Focus keyword appears in the slug
  - Focus keyword appears in the meta title
  - Focus keyword appears in the meta description
  - Focus keyword appears in the excerpt
  - Focus keyword appears in the content (first paragraph)
  - Meta title length is 50-60 characters
  - Meta description length is 120-160 characters
  - Content length is 300+ words
  - Excerpt is filled in
- Each check shows a pass/fail indicator so you know exactly what to improve.

**3. Keyword Density Checker**
- Shows how many times the focus keyword appears in the content body.
- Displays the density as a percentage of total words.
- Flags if density is too low (under 0.5%) or too high (over 2.5%), with a "good" range highlighted in green.

## Where It Appears
The new SEO toolkit will be added as an enhanced version of the existing "SEO Settings" card in the main content column of the editor. The focus keyword field goes at the top, followed by the existing meta title/description fields, then the score indicator and checklist below.

---

## Technical Details

### Database Migration
Add a `focus_keyword` column to the `blog_posts` table:

```sql
ALTER TABLE public.blog_posts ADD COLUMN focus_keyword text DEFAULT null;
```

### New Component: `src/components/admin/SEOScorePanel.tsx`
A self-contained component that receives `title`, `slug`, `content`, `excerpt`, `metaTitle`, `metaDescription`, and `focusKeyword` as props, and renders:
- The checklist of SEO checks with pass/fail icons
- The overall score progress bar (using the existing `Progress` UI component)
- The keyword density display

All logic is pure client-side string analysis -- no API calls needed.

### Changes to `src/pages/admin/PostEditor.tsx`
- Add `focusKeyword` state variable
- Load/save `focus_keyword` from/to the database alongside existing fields
- Add the focus keyword `Input` field inside the SEO Settings card
- Add the `focusKeyword` field to the Zod validation schema (optional, max 100 chars)
- Import and render `SEOScorePanel` below the meta fields
- Strip HTML tags from TipTap content for word count / density analysis using a simple regex helper

### Files Changed
| File | Action |
|---|---|
| `src/components/admin/SEOScorePanel.tsx` | Create (new component) |
| `src/pages/admin/PostEditor.tsx` | Edit (add focus keyword state, wire up SEO panel) |
| Database migration | Add `focus_keyword` column to `blog_posts` |

