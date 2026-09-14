# FeedPulse

Automated trending news hub across Crypto, Stocks, Forex, Gaming, Tech, AI, World, and YouTube.
Fully hands-off — RSS feeds auto-populate the site every 30 minutes. Zero writing required.

---

## Setup Guide

### Step 1 — Supabase (free database)

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project (pick any region close to you)
3. Go to **SQL Editor** and paste the entire contents of `supabase-schema.sql` and run it
4. Go to **Settings → API** and copy:
   - `Project URL` → this is your `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → this is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → this is your `SUPABASE_SERVICE_ROLE_KEY`

Also run this in the SQL editor to enable the view counter:
```sql
create or replace function increment_views(article_id uuid)
returns void as $$
  update articles set views = views + 1 where id = article_id;
$$ language sql;
```

---

### Step 2 — GitHub

1. Create a new repository on GitHub called `feedpulse`
2. Push this entire folder to it:
```bash
cd feedpulse
git init
git add .
git commit -m "Initial FeedPulse build"
git remote add origin https://github.com/YOUR_USERNAME/feedpulse.git
git push -u origin main
```

---

### Step 3 — Vercel (free hosting)

1. Go to [vercel.com](https://vercel.com) and sign in with your GitHub account
2. Click **Add New Project** and import your `feedpulse` repository
3. In **Environment Variables**, add all variables from `.env.local.example`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `CRON_SECRET` (make up any random string, e.g. `feedpulse-secret-2026`)
4. Click **Deploy**

Vercel will automatically run the RSS fetcher every 30 minutes using the cron job in `vercel.json`.

---

### Step 4 — Trigger your first feed fetch

After deploying, manually trigger the first article fetch by visiting:
```
https://your-site.vercel.app/api/fetch-feeds
```
Add the header: `Authorization: Bearer your_cron_secret`

Or just wait 30 minutes and the cron will trigger automatically.

---

### Step 5 — Google AdSense (after you have traffic)

1. Apply at [google.com/adsense](https://google.com/adsense)
2. Once approved, get your publisher ID (`ca-pub-XXXXXXXXXXXXXXXX`)
3. In `src/app/layout.tsx`, uncomment the AdSense script and add your publisher ID
4. In `src/components/AdSlot.tsx`, replace the placeholder divs with your actual `<ins>` ad units
5. Redeploy

---

## Project Structure

```
feedpulse/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Homepage
│   │   ├── layout.tsx            # Root layout + AdSense
│   │   ├── globals.css           # Global styles
│   │   ├── article/[slug]/       # Individual article pages
│   │   ├── category/[cat]/       # Category pages
│   │   └── api/fetch-feeds/      # RSS fetcher endpoint
│   ├── components/
│   │   ├── Navbar.tsx            # Navigation
│   │   ├── CryptoTicker.tsx      # Live crypto prices
│   │   ├── ArticleCard.tsx       # Article card component
│   │   └── AdSlot.tsx            # Ad placement component
│   └── lib/
│       ├── feeds.ts              # All RSS feed URLs and category config
│       └── supabase.ts           # Database client
├── supabase-schema.sql           # Run this in Supabase SQL editor
├── vercel.json                   # Cron job config (runs every 30 mins)
└── .env.local.example            # Environment variables template
```

## Adding More RSS Feeds

Open `src/lib/feeds.ts` and add a new entry to the `FEEDS` array:
```ts
{ name: 'Source Name', url: 'https://source.com/feed', category: 'tech' },
```

## Adding a New Category

1. Add the category type to `Category` in `src/lib/feeds.ts`
2. Add the metadata to `CATEGORY_META`
3. Add feeds to `FEEDS` with the new category
4. Re-deploy
