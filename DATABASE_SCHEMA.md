# RiceHub Database Schema

The canonical schema will be implemented as ordered SQL migrations in `supabase/migrations/`. Amounts use integer paise (minor units); bag counts use integers; bag weight uses `numeric(8,3)` kilograms.

| Table | Core fields and constraints |
|---|---|
| profiles | `user_id` PK/FK auth.users, name, phone, timestamps |
| user_roles | user FK, role enum (`customer`,`admin`), unique user/role; writes restricted to provisioning |
| categories | UUID, unique slug, name, active flag |
| products | UUID, category FK, unique slug, variety, grade, origin, description, image path, active flag |
| product_variants | product FK, unique SKU, label, positive `weight_kg`, nonnegative `price_paise`, active flag |
| inventory | variant PK/FK, nonnegative `available_bags`, low-stock threshold |
| inventory_movements | variant FK, signed `bag_delta`, reason, actor, order FK, idempotency key, created_at |
| carts / cart_items | one cart per user; unique cart/variant; positive quantity |
| customer_addresses | customer FK, postal code, contact and address fields |
| orders | customer FK, unique customer/idempotency key, fulfillment, statuses, paise totals, address snapshot |
| order_items | order FK, variant FK, immutable SKU/name/weight/price snapshots, positive bag quantity |
| payment_records | order FK, amount paise, method, status, collected actor/time |
| product_reviews | product/customer/order FKs, rating check 1–5, unique customer/product/order |
| notifications | customer FK, type, payload, read/created timestamps |
| shop_settings | singleton configuration, pickup details and delivery fee settings |
| supported_delivery_zones | postal code PK, enabled flag, fee in paise |

Required indexes include active catalog/category, variant/product, movement variant/time and order, order customer/time, order status/time, review product/time, and enabled postal code. SQL functions will implement atomic checkout and one-time cancellation restoration using row locks, stable lock ordering, database constraints, and unique idempotency keys.

