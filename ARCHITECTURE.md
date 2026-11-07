# RiceHub Architecture

## Application shape

RiceHub is a single Next.js App Router application. Server Components read public catalog data, Server Actions handle authenticated application mutations, and Route Handlers expose health and integration endpoints. The Supabase server SDK is used only on the server; browser clients use the anon key and rely on RLS. Business rules live in server modules and PostgreSQL functions, not in UI components.

```text
Browser -> Next.js App Router -> server actions / route handlers
                                  | Supabase Auth (session)
                                  | PostgreSQL + RLS + RPC transactions
                                  | Supabase Storage (product images)
GitHub PR -> Actions CI -> Vercel Preview; main -> Vercel Production
```

## Security and authentication

Supabase Auth owns identity and email/password flows. A profile row is created for each auth user; roles are stored separately and users cannot mutate that table. Server-side role checks protect every `/admin` page and mutation. RLS remains the final data boundary. Administrative provisioning is an operator-only script or secured server process using the service role key, never a public registration option. No service-role key is sent to the browser.

## Inventory and checkout transaction

Inventory is integer packaged-bag quantity per product variant. Variant `weight_kg` is numeric and total weight is derived as bags times weight. `place_order` is a PostgreSQL function: validate idempotency key and customer, lock inventory rows in stable variant order, verify availability, snapshot current unit prices, calculate totals from server-owned settings, create order and order items, decrement inventory, and append movements in one transaction. A unique `(customer_id, idempotency_key)` constraint makes retries safe. Cancellation uses a guarded state transition and a unique restoration movement per order line, ensuring stock is restored once. Price and payment status writes are denied to customers by RLS.

## Environments and operations

Use separate Supabase staging and production projects and separate Vercel environment variables. Migrations are reviewed and applied explicitly through the Supabase CLI; application builds never mutate production schema. GitHub Actions validates formatting, lint, typecheck, unit tests, and build. Vercel's Git integration handles preview and production deployments. Health checks report service availability without exposing customer data.

## Proposed source layout

```text
src/app/                 App Router pages, layouts, route handlers
src/app/(shop)/          Customer storefront and account routes
src/app/admin/           Protected admin routes
src/components/          Shared UI and feature components
src/lib/supabase/        Browser/server Supabase clients
src/lib/auth/            Session and role checks
src/lib/domain/          Pricing, order transitions, validation
src/actions/             Authenticated server actions
src/types/               Generated database types
supabase/migrations/     Versioned schema, RLS, RPC functions
supabase/seed.sql        Development-only seed data
tests/                   Unit and component tests
e2e/                      Playwright flows
```

## Initial normalized schema

`profiles` references `auth.users`; `user_roles` references users and restricts role values. `categories` has unique slugs. `products` references categories; `product_variants` has unique SKU, precise `weight_kg`, and integer minor-unit price. `inventory` has one nonnegative integer bag count per variant. `inventory_movements` records signed bag delta, reason, actor, optional order and variant, and timestamp. `carts` is unique per customer; `cart_items` is unique per cart/variant. `customer_addresses` belongs to a customer. `orders` stores fulfillment/payment/order status, idempotency key, price totals in minor units, and address snapshot. `order_items` stores variant and price/name/weight snapshots. `payment_records` records collection events. `product_reviews` links customer, product, and optional order. `notifications` belongs to a user. `shop_settings` stores delivery and pickup configuration. `supported_delivery_zones` keys postal codes and fees. All customer-owned tables use owner-scoped RLS; catalog reads expose active records; privileged writes use server authorization and tightly scoped RPCs.

