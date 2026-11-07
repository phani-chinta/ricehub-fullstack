# RiceHub

RiceHub is a rice retailer storefront and inventory/order management system built with Next.js App Router, TypeScript, Tailwind CSS, and Supabase.

## Status

Phase 1 is in progress. The workspace was empty at kickoff. Architecture and schema contracts are documented; application setup and subsequent phases follow incrementally. No Supabase, GitHub, or Vercel resources have been connected yet.

## Planned local setup

1. Install Node.js LTS and npm.
2. Copy `.env.example` to `.env.local` and add the staging Supabase URL and anon key.
3. Install dependencies with `npm ci`.
4. Start the app with `npm run dev`.
5. Apply reviewed migrations to a local/staging Supabase project using the Supabase CLI.

See [ARCHITECTURE.md](ARCHITECTURE.md), [DATABASE_SCHEMA.md](DATABASE_SCHEMA.md), and forthcoming deployment and testing guides for full setup. Never commit secrets or use a production service-role key locally.

