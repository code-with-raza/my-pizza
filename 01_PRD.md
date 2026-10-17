# My Pizza Website — Product Requirements Document (PRD)

## 1. Product Overview

**Brand:** My Pizza  
**Tagline from menu:** “Pizza — Little Place Big Taste!”  
**Business:** Pizza, burgers, shawarma, wraps, fries, sandwiches, pasta,
beverages, deals and family combos.  
**Primary service area:** Lahore, with delivery/service centered around
the two listed branches.

The website should be a modern, fast, mobile-first restaurant website
that converts visitors into orders. The visual direction should be
energetic, food-focused and premium while preserving the brand’s
existing yellow/red/green/black palette.

## 2. Branches and Service Coverage

### Branch 1

- **Location:** Umer Din Road, Near Iftikhar Optical, Wasan Pura, Lahore
- **Branch phone:** 0304 890 1341
- **Order phone:** 0309 940 8899
- **Service area:** Delivery/service coverage around this branch,
  configurable by admin.

### Branch 2

- **Location:** M.A.Q College, Near Haq Orthopedic Hospital, Riwaz
  Garden, Lahore
- **Branch phone:** 0310 483 4236
- **Order phone:** 0317 454 4884
- **Service area:** Delivery/service coverage around this branch,
  configurable by admin.

> Do not hard-code an exact delivery radius unless the business confirms
> it. The system should support branch-specific delivery zones/rules
> later.

## 3. Goals

1.  Make the complete menu easy to browse on mobile and desktop.
2.  Make “Order Now” the dominant conversion action.
3.  Let customers choose a nearby branch before ordering.
4.  Make phone ordering one tap away on mobile.
5.  Support a cart and online order flow as the website evolves.
6.  Give the owner an admin panel for products, prices, categories,
    deals, branches and orders.
7.  Make the menu data database-driven instead of hard-coded into React
    components.
8.  Optimize for fast loading, SEO, accessibility and local discovery.

## 4. MVP Scope

### Customer-facing

- Home page
- Menu page
- Category filters
- Product detail/modal
- Deals and combos
- Branch selector
- Cart
- Checkout/order form
- Click-to-call ordering
- Branch/service-area information
- Contact/footer
- Responsive navigation
- Loading, empty and error states
- SEO metadata
- Social sharing metadata

### Admin

- Secure admin login
- Dashboard
- CRUD for categories
- CRUD for products
- CRUD for deals/combos
- CRUD for branches
- Price/availability management
- Order list and order status updates
- Basic delivery-zone configuration

## 5. Recommended Customer Flow

Home → Choose Branch → Browse Menu → Add Items → Cart → Checkout →
Select delivery/pickup → Enter customer details → Confirm order → Show
order number and selected branch.

For the first production version, online payment should remain optional.
Phone ordering should always remain available.

## 6. Core Pages

### `/`

Hero, featured deals, best sellers, categories, branch/service section,
CTA and footer.

### `/menu`

All products grouped by category with filters, search and branch-aware
availability.

### `/deals`

Combo offers, family deals and promotional packages.

### `/branches`

Two branch cards with address, branch phone, order phone, hours
placeholder/configuration and directions CTA.

### `/cart`

Selected items, quantities, subtotal, delivery fee, total and checkout
CTA.

### `/checkout`

Customer name, phone, delivery/pickup, address, branch, notes and order
confirmation.

### `/order/:id`

Order confirmation/status page.

### `/admin/*`

Protected dashboard for operational management.

## 7. UX Requirements

- Mobile-first.
- Large tap targets.
- Sticky mobile “Order Now” / cart action.
- Fast category navigation.
- Product cards must clearly show price and availability.
- Use real food imagery where available.
- Avoid excessive text in cards.
- Preserve strong contrast.
- Use subtle animation; do not make the menu difficult to scan.
- Respect `prefers-reduced-motion`.

## 8. Functional Requirements

### Menu

- Categories stored in MongoDB.
- Products stored in MongoDB.
- Multiple size/variant prices supported.
- Add-ons supported.
- Availability can be toggled.
- Featured/best-seller flags supported.
- Sort order supported.

### Cart

- Quantity changes.
- Remove item.
- Variant selection.
- Add-ons.
- Subtotal/total calculation.
- Persist cart locally for returning users.

### Orders

- Generate unique public order number.
- Store branch.
- Store customer details.
- Store immutable item snapshot: name, variant, quantity, price.
- Status: `pending`, `confirmed`, `preparing`, `ready`,
  `out_for_delivery`, `completed`, `cancelled`.
- Never calculate historical order totals from current product prices.

### Branches

- Two initial branches.
- Each branch has address, phones, coordinates, service zones and active
  state.
- Admin can update branch information.

## 9. Non-functional Requirements

- Responsive at 320px through large desktop widths.
- Good Core Web Vitals.
- Lazy-load non-critical images.
- Compress/serve modern image formats.
- API validation on every write operation.
- Centralized error handling.
- No secrets in frontend.
- Rate-limit public order endpoints.
- Sanitize user-generated text.
- Secure admin authentication.
- Database indexes for menu/order queries.
- Environment variables for configuration.

## 10. Acceptance Criteria

The MVP is accepted when: - Every product in the supplied menu is
represented in the database. - Category filtering works. - Size-based
pizza pricing works. - Deals can be displayed as bundles. - Branch
selection works. - Cart totals are correct. - Checkout creates an order
in MongoDB. - Admin can change product price/availability without
changing frontend code. - Website works cleanly on mobile. - Main CTA
and branch phone numbers are clickable on mobile. - No critical console
errors exist. - API validation prevents malformed orders.
