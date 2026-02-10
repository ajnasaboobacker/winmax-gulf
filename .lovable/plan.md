

# Scheduled Auto-Publish + Internal Linking Suggestions

## Feature 1: Scheduled Post Auto-Publish

A backend function that runs on a schedule (every minute via pg_cron) to automatically publish posts whose `status = 'scheduled'` and `scheduled_for <= now()`.

### How It Works
- A new edge function `publish-scheduled-posts` queries for due scheduled posts and updates them to `status = 'published'` with `published_at = now()`.
- A pg_cron job calls this function every minute automatically.
- No user action needed -- posts go live at the scheduled time.

### Technical Details

**New Edge Function: `supabase/functions/publish-scheduled-posts/index.ts`**
- Uses the Supabase service role key to bypass RLS
- Queries `blog_posts` where `status = 'scheduled'` AND `scheduled_for <= now()`
- Updates matching posts: sets `status = 'published'` and `published_at = now()`
- Returns a count of published posts for logging

**Config update: `supabase/config.toml`**
- Add `[functions.publish-scheduled-posts]` with `verify_jwt = false`

**pg_cron job (SQL insert, not migration)**
- Calls the edge function every minute via `net.http_post`
- Requires `pg_cron` and `pg_net` extensions to be enabled

---

## Feature 2: Internal Linking Suggestions

A new panel in the post editor sidebar that suggests other published blog posts to link to, based on the current post's focus keyword.

### How It Works
- When a focus keyword is entered, the system searches all other published posts for matches in their title, excerpt, or content
- Displays up to 5 matching posts with their title, slug, and a "Copy Link" button
- Editors can quickly copy the URL and paste it into their content as an internal link
- Runs entirely client-side using existing Supabase queries -- no new backend needed

### Technical Details

**New Component: `src/components/admin/InternalLinkSuggestions.tsx`**
- Accepts `focusKeyword` and `currentPostId` as props
- Queries `blog_posts` where `status = 'published'` and `id != currentPostId`
- Filters results client-side checking if title, excerpt, or stripped content contains any keyword variant (reuses the plural/variant logic)
- Shows up to 5 suggestions with post title, URL path, and a copy button
- Displays a "No suggestions" message when no matches are found

**Edit: `src/pages/admin/PostEditor.tsx`**
- Import and render `InternalLinkSuggestions` in the sidebar, below the Tags card
- Pass `focusKeyword` and the current post `id` as props

### Files Changed

| File | Action |
|---|---|
| `supabase/functions/publish-scheduled-posts/index.ts` | Create -- auto-publish edge function |
| `supabase/config.toml` | Edit -- add function config |
| pg_cron SQL | Insert via SQL tool (not migration) |
| `src/components/admin/InternalLinkSuggestions.tsx` | Create -- link suggestion panel |
| `src/pages/admin/PostEditor.tsx` | Edit -- add InternalLinkSuggestions to sidebar |

