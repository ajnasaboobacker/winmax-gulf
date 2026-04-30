# Graph Report - .  (2026-04-30)

## Corpus Check
- Large corpus: 192 files · ~705,930 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder, or use --no-semantic to run AST-only.

## Summary
- 281 nodes · 163 edges · 9 communities detected
- Extraction: 89% EXTRACTED · 11% INFERRED · 0% AMBIGUOUS · INFERRED: 18 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Admin Profiles & Toast Hooks|Admin Profiles & Toast Hooks]]
- [[_COMMUNITY_Contact Forms & GA Tracking|Contact Forms & GA Tracking]]
- [[_COMMUNITY_Auth Context & Protected Routes|Auth Context & Protected Routes]]
- [[_COMMUNITY_Blog Admin & Editor Components|Blog Admin & Editor Components]]
- [[_COMMUNITY_SEO Content Score Analysis|SEO Content Score Analysis]]
- [[_COMMUNITY_Post Editor Logic & State|Post Editor Logic & State]]
- [[_COMMUNITY_Internal Link SEO Suggestions|Internal Link SEO Suggestions]]
- [[_COMMUNITY_Supabase Lead Email Service|Supabase Lead Email Service]]
- [[_COMMUNITY_Admin Authentication UI|Admin Authentication UI]]

## God Nodes (most connected - your core abstractions)
1. `toast()` - 14 edges
2. `trackEvent()` - 8 edges
3. `useToast()` - 4 edges
4. `trackFormSubmission()` - 4 edges
5. `handleSubmit()` - 3 edges
6. `stripHtml()` - 3 edges
7. `useAuth()` - 3 edges
8. `reducer()` - 3 edges
9. `dispatch()` - 3 edges
10. `onSubmit()` - 3 edges

## Surprising Connections (you probably didn't know these)
- `copyLink()` --calls--> `toast()`  [INFERRED]
  src\components\admin\InternalLinkSuggestions.tsx → src\hooks\use-toast.ts
- `fetchPost()` --calls--> `toast()`  [INFERRED]
  src\pages\admin\PostEditor.tsx → src\hooks\use-toast.ts
- `handleSubmit()` --calls--> `toast()`  [INFERRED]
  src\components\Contact.tsx → src\hooks\use-toast.ts
- `onSubmit()` --calls--> `toast()`  [INFERRED]
  src\pages\LandingPage.tsx → src\hooks\use-toast.ts
- `fetchProfile()` --calls--> `toast()`  [INFERRED]
  src\pages\admin\AuthorProfile.tsx → src\hooks\use-toast.ts

## Communities

### Community 0 - "Admin Profiles & Toast Hooks"
Cohesion: 0.12
Nodes (13): fetchProfile(), handleAvatarUpload(), handleSave(), validate(), handleDelete(), handleSave(), handleDelete(), handleSave() (+5 more)

### Community 1 - "Contact Forms & GA Tracking"
Cohesion: 0.22
Nodes (10): handleSubmit(), trackButtonClick(), trackCTAClick(), trackEvent(), trackFormSubmission(), trackModalOpen(), trackNavigation(), trackOutboundLink() (+2 more)

### Community 2 - "Auth Context & Protected Routes"
Cohesion: 0.25
Nodes (3): BlogDashboard(), ProtectedRoute(), useAuth()

### Community 3 - "Blog Admin & Editor Components"
Cohesion: 0.29
Nodes (4): BlogPosts(), RichTextEditor(), useToast(), Toaster()

### Community 4 - "SEO Content Score Analysis"
Cohesion: 0.38
Nodes (3): countWords(), getFirstParagraph(), stripHtml()

### Community 8 - "Post Editor Logic & State"
Cohesion: 0.33
Nodes (1): fetchPost()

### Community 11 - "Internal Link SEO Suggestions"
Cohesion: 0.5
Nodes (1): copyLink()

### Community 14 - "Supabase Lead Email Service"
Cohesion: 0.83
Nodes (3): formatLeadForEmail(), formatLeadForWhatsApp(), handler()

### Community 20 - "Admin Authentication UI"
Cohesion: 1.0
Nodes (2): handleLogin(), validateForm()

## Knowledge Gaps
- **Thin community `Post Editor Logic & State`** (6 nodes): `fetchData()`, `fetchPost()`, `handleTitleChange()`, `toggleCategory()`, `toggleTag()`, `PostEditor.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Internal Link SEO Suggestions`** (4 nodes): `copyLink()`, `getKeywordVariants()`, `stripHtml()`, `InternalLinkSuggestions.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Admin Authentication UI`** (3 nodes): `handleLogin()`, `validateForm()`, `AdminLogin.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `toast()` connect `Admin Profiles & Toast Hooks` to `Post Editor Logic & State`, `Contact Forms & GA Tracking`, `Internal Link SEO Suggestions`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Why does `useToast()` connect `Blog Admin & Editor Components` to `Admin Profiles & Toast Hooks`?**
  _High betweenness centrality (0.008) - this node is a cross-community bridge._
- **Are the 11 inferred relationships involving `toast()` (e.g. with `handleSubmit()` and `copyLink()`) actually correct?**
  _`toast()` has 11 INFERRED edges - model-reasoned connections that need verification._
- **Are the 3 inferred relationships involving `useToast()` (e.g. with `RichTextEditor()` and `Toaster()`) actually correct?**
  _`useToast()` has 3 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `trackFormSubmission()` (e.g. with `handleSubmit()` and `onSubmit()`) actually correct?**
  _`trackFormSubmission()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `handleSubmit()` (e.g. with `trackFormSubmission()` and `toast()`) actually correct?**
  _`handleSubmit()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Should `Admin Profiles & Toast Hooks` be split into smaller, more focused modules?**
  _Cohesion score 0.12 - nodes in this community are weakly interconnected._