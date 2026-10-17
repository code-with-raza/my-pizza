# Master AI Implementation Prompt — My Pizza Restaurant Website

You are a senior full-stack engineer, UI/UX designer and product
architect.

Build a production-quality restaurant ordering website for **My Pizza,
Lahore** using:

- React
- Vite
- Tailwind CSS
- Node.js
- Express.js
- MongoDB
- Mongoose
- React Router
- TanStack Query
- Zustand
- React Hook Form
- Zod
- Motion/Framer Motion
- Lucide icons

Do not replace the requested stack with Next.js, Firebase, Supabase or
another backend/database.

------------------------------------------------------------------------

## 1. Business Context

Brand: **My Pizza**  
Tagline: **“Pizza — Little Place Big Taste!”**

The supplied menu artwork is the source for the initial menu, prices and
promotions.

### Branch 1

Umer Din Road, Near Iftikhar Optical, Wasan Pura, Lahore  
Branch phone: 0304 890 1341  
Order phone: 0309 940 8899

### Branch 2

M.A.Q College, Near Haq Orthopedic Hospital, Riwaz Garden, Lahore  
Branch phone: 0310 483 4236  
Order phone: 0317 454 4884

The site should clearly communicate that service/delivery is centered
around these two Lahore branches. Do not invent an exact delivery radius
or delivery fee. Make delivery zones configurable in the database/admin
panel.

------------------------------------------------------------------------

# 2. Primary Objective

Create a visually impressive, high-converting restaurant website that
feels like a real modern food brand rather than a generic CRUD
application.

The site must:

1.  Look excellent on mobile first.
2.  Look polished on desktop.
3.  Make food discovery fast.
4.  Make ordering obvious.
5.  Use smooth, purposeful animations.
6.  Load quickly.
7.  Be SEO-friendly.
8.  Use database-driven menu data.
9.  Support two branches.
10. Include an extensible online ordering architecture.
11. Include an admin panel for menu and order management.

------------------------------------------------------------------------

# 3. Visual Direction

Use the supplied menu artwork as visual inspiration, but do NOT simply
copy the flyer layout.

Build a modern restaurant identity from the existing palette:

- Warm yellow/gold
- Deep red
- Dark green
- Black
- Cream/white
- Small amounts of orange for highlights

Use strong food photography, bold headings, rounded cards, layered
sections and high-contrast CTA buttons.

The visual personality should be:

- energetic
- appetizing
- modern
- bold
- premium but accessible
- Pakistani local-food friendly
- highly usable

Avoid: - generic SaaS dashboard aesthetics - excessive gradients -
excessive glassmorphism - tiny text - huge empty whitespace -
over-animation - cluttered menu cards

------------------------------------------------------------------------

# 4. Required Pages

Create:

## Home

Sections: 1. Sticky navbar 2. Hero section 3. Primary “Order Now” CTA 4.
Featured deals 5. Popular menu items 6. Category shortcuts 7. Pizza
size/offer highlight 8. Food promotional section 9. Branch/service area
section 10. Customer CTA 11. Footer

Hero should include an appetizing food visual, strong headline and
animated CTA.

## Menu

Features: - Category tabs/chips - Search - Product grid - Product
image - Product name - Description - Price - Size selector where
applicable - Add-ons where applicable - Add-to-cart button - Featured
badge - Availability state

Categories: - Pizza - From The Fryer - Roll & Wrap - Grill Corner -
Sandwich - Potato Corner - Pasta - Beverages - Deals

## Deals

Create visually strong cards for: - Pizza 1+1 offers - Combo 1 - Combo
2 - Combo 3 - Family Deal - Deal 1–8

## Branches

Show both branches with: - address - branch phone - order phone - call
button - order button - directions button - service-area explanation

Do not invent business hours.

## Cart

- items
- variants
- add-ons
- quantity controls
- remove
- subtotal
- delivery fee
- total
- checkout

## Checkout

Fields: - customer name - phone - fulfillment: delivery/pickup -
branch - address when delivery is selected - notes - order summary

## Order Confirmation

Show: - order number - branch - items - total - status - call/order
contact - continue browsing

## Admin

Build protected: - dashboard - products - categories - deals -
branches - delivery zones - orders - order detail/status

------------------------------------------------------------------------

# 5. Animation Requirements

Use Motion/Framer Motion or Motion for React.

Implement tasteful animations such as:

### Navbar

- transparent/overlay state on hero
- transitions to solid background on scroll

### Hero

- food image subtle entrance
- staggered text reveal
- CTA hover animation
- floating decorative shapes

### Menu

- cards fade/slide in when entering viewport
- category changes animate smoothly
- product modal uses scale/fade
- add-to-cart button has a micro-interaction

### Cart

- item add/remove animation
- cart badge pop animation
- total transition

### Deals

- hover lift
- subtle image zoom
- highlighted promotional badge animation

### Scroll

- reveal sections on viewport entry

Rules: - Keep animation under control. - Do not delay core
interaction. - Respect `prefers-reduced-motion`. - Avoid animations that
make the menu slow to scan.

------------------------------------------------------------------------

# 6. Responsive Requirements

Design mobile-first.

Test mentally and visually at: - 320px - 375px - 390px - 430px - 768px -
1024px - 1280px - 1440px

Mobile requirements: - hamburger navigation - sticky order/cart CTA -
large touch targets - horizontally scrollable categories - 1-column
product cards where necessary - optimized image sizes - phone numbers as
`tel:` links - no horizontal overflow

Desktop: - max-width content container - multi-column food grid - strong
hero composition - sticky/compact navigation - clean whitespace

------------------------------------------------------------------------

# 7. Database Architecture

Use MongoDB + Mongoose.

Collections:

### admins

``` js
{
  name,
  email,
  passwordHash,
  role,
  isActive,
  createdAt,
  updatedAt
}
```

### categories

``` js
{
  name,
  slug,
  description,
  imageUrl,
  sortOrder,
  isActive,
  createdAt,
  updatedAt
}
```

### products

``` js
{
  categoryId,
  name,
  slug,
  description,
  imageUrl,
  price,
  variants: [
    {
      name,
      code,
      price
    }
  ],
  addOns: [
    {
      name,
      price,
      isActive
    }
  ],
  isAvailable,
  isFeatured,
  sortOrder,
  createdAt,
  updatedAt
}
```

### deals

Use bundle items and a fixed deal price.

### branches

Store: - name - address - city - branch phone - order phone -
coordinates - opening hours - active status - delivery zone references

### deliveryZones

Store: - branch - zone name - areas - fee - minimum order - active

### orders

Store immutable product/deal snapshots so historical orders are not
changed when menu prices change.

------------------------------------------------------------------------

# 8. Important Pricing Rule

NEVER trust prices sent by the frontend.

Frontend sends: - product ID - variant ID/code - quantity - add-on IDs

Backend: 1. fetches product from MongoDB 2. checks availability 3. gets
current server-side price 4. validates variants/add-ons 5. calculates
totals 6. creates order

The final price must be calculated by Express.

------------------------------------------------------------------------

# 9. Menu Data

Use all supplied menu items.

## Pizza

Sizes: - S = 7-inch - M = 11-inch - L = 14-inch - XL = 18-inch

Standard: - Chicken Tikka — 550 / 1000 / 1500 / 2000 - Chicken Fajita —
550 / 1000 / 1500 / 2000 - Chicken Supreme — 550 / 1000 / 1500 / 2000 -
Cheese Lover — 550 / 1000 / 1500 / 2000 - Pepperoni — 550 / 1000 / 1500
/ 2000 - Sausages — 550 / 1000 / 1500 / 2000 - Makhni — 550 / 1000 /
1500 / 2000 - Tandoori — 550 / 1000 / 1500 / 2000 - Signature — 550 /
1000 / 1500 / 2000 - Kabab Pizza — 550 / 1000 / 1500 / 2000 - Afghani —
550 / 1000 / 1500 / 2000 - Cheese Stuff Pizza — 550 / 1000 / 1500 /
2000 - Malai Boti Pizza — 550 / 1000 / 1500 / 2000

Premium: - Kabab Crust Pizza — 600 / 1200 / 1700 / 2200 - Cheese Stuff
With Makhni — 600 / 1200 / 1700 / 2200 - Lazania — 600 / 1200 / 1700 /
2200 - Peri Peri Pizza — 600 / 1200 / 1700 / 2200 - Crown Crust Pizza —
600 / 1200 / 1700 / 2200

Extra topping: S 80 / M 100 / L 150 / XL 200

## From The Fryer

- Crunch Burger 320
- Crunch Burger with fries 370
- Cheesy Crunch Burger 450
- Zinger Patty Burger 500
- Tower Burger 600
- Patty Burger 240
- Patty Burger with fries 300
- Cheesy Patty Burger 350
- Fried Chicken 1 Pc 240
- Nuggets 5 Pcs 260
- Hot Wings 5 Pcs 300
- Hot Wings 10 Pcs 580
- Cheese Slice 50

## Roll & Wrap

- Chicken Shawarma S/M/L = 220/250/300
- Zinger Shawarma 320
- Cheesy Shawarma 320
- Platter Shawarma 500
- Cheesy Platter 630
- Kabab Paratha Roll 300
- Chicken Paratha Roll 300
- Zinger Paratha Roll 320
- Pizza Paratha 500
- Grill Wrap 550
- Zinger Wrap 500
- Grill Shawarma 350

## Grill Corner

- Cocktail Grill Burger 420
- Peri Peri Burger 420
- Jalapeno Burger 420
- My Pizza Special 480
- Grilled Wings 5 Pcs 350
- Cheesy Grilled Wings 5 Pcs 470

## Sandwich

- Chicken Sandwich 400
- Club Sandwich 400
- Zinger Sandwich 430
- Grill Sandwich 480

## Potato Corner

- Loaded Fries S 400
- Loaded Fries L 600
- Plain Fries S 150
- Plain Fries M 250
- Plain Fries Family Pack 400
- Garlic Mayo Fries Half 300
- Garlic Mayo Fries Full 400
- B.B.Q Masala Fries Half 300
- B.B.Q Masala Fries Full 400
- Cheesy Fries Half 300
- Cheesy Fries Full 400

## Pasta

- Alfredo Pasta 700
- Crunchy Chicken Pasta 850

## Beverages

- Half Liter 120
- 1.5 Liter 200
- Jumbo Drink 250
- Mineral Water S 70
- Mineral Water L 120

## Deals

Pizza 1+1: - Small 1000 - Medium 1900 - Large 2800 - X-Large 3700

Combo 1 — 1050 - Small Pizza - Patty Burger - Regular Shawarma - Half
Liter

Combo 2 — 1850 - Medium Pizza - Crunch Burger - Patty Burger - Regular
Fries - 1.5 Liter

Combo 3 — 2450 - Large Pizza - Cheesy Patty Burger - Club Sandwich -
Regular Fries - 1.5 Liter

Family Deal — 3300 - Large Pizza - 2 Zinger Burgers - 10 Hot Wings -
Pizza Paratha - Jumbo Drink

Deal 1 — 900 - 2 Zinger Burgers - 5 Nuggets - Half Liter

Deal 2 — 1850 - 4 Zinger Burgers - 10 Hot Wings - 1.5 Liter

Deal 3 — 850 - 3 Small Shawarma - Small Fries - Half Liter

Deal 4 — 1050 - Small Pizza - Zinger Burger - Small Fries - Half Liter

Deal 5 — 1100 - Small Loaded Fries - Club Sandwich - Medium Shawarma -
Half Liter

Deal 6 — 850 - Zinger Patty Burger - 5 Wings - Half Liter

Deal 7 — 900 - 3 Fried Chicken Pieces - Small Fries - Half Liter

Deal 8 — 1950 - 6 Fried Chicken Pieces - 10 Nuggets - 1.5 Liter

------------------------------------------------------------------------

# 10. API Requirements

Create REST endpoints.

Public:

``` text
GET    /api/categories
GET    /api/products
GET    /api/products/:slug
GET    /api/deals
GET    /api/branches
POST   /api/orders
GET    /api/orders/:orderNumber
```

Admin:

``` text
POST   /api/admin/auth/login
POST   /api/admin/auth/logout

GET    /api/admin/products
POST   /api/admin/products
PATCH  /api/admin/products/:id
DELETE /api/admin/products/:id

GET    /api/admin/orders
GET    /api/admin/orders/:id
PATCH  /api/admin/orders/:id/status

CRUD categories
CRUD deals
CRUD branches
CRUD delivery zones
```

Use centralized error middleware.

------------------------------------------------------------------------

# 11. Frontend State

Use: - TanStack Query for API/server state. - Zustand for cart and
lightweight client state. - localStorage persistence for cart.

Do not put all API data into Zustand.

------------------------------------------------------------------------

# 12. Component Design

Create reusable components such as:

``` text
Navbar
Hero
SectionHeading
CategoryPill
ProductCard
ProductGrid
ProductModal
VariantSelector
AddOnSelector
DealCard
BranchCard
CartDrawer
CartItem
OrderSummary
CheckoutForm
Footer
MobileOrderBar
LoadingSkeleton
EmptyState
ErrorState
```

Admin components should be separate from customer UI.

------------------------------------------------------------------------

# 13. SEO

Implement: - page titles - meta descriptions - Open Graph metadata -
canonical URLs - semantic headings - clean slugs - sitemap-ready
structure - robots configuration

Target local intent around: - pizza in Lahore - pizza Wasan Pura - pizza
Riwaz Garden - food delivery Lahore - burgers/shawarma/pizza near the
two branches

Do not claim rankings or unverified delivery coverage.

------------------------------------------------------------------------

# 14. Accessibility

Implement: - semantic HTML - keyboard navigation - visible focus
states - alt text - accessible buttons - form labels - proper heading
hierarchy - sufficient contrast - reduced-motion support

------------------------------------------------------------------------

# 15. Image Strategy

Do not use the original flyer as the entire website UI.

Use: - optimized food images - consistent aspect ratios - lazy loading -
responsive image sizes - fallback image - descriptive alt text

If food photos are unavailable, create a clean visual placeholder system
rather than broken image links.

------------------------------------------------------------------------

# 16. Admin UX

Dashboard: - today’s orders - pending orders - completed orders - total
order count - quick actions

Orders: - filter by status - filter by branch - order details - update
status

Menu: - category - product - price - variants - availability - featured
flag - sort order

Deals: - bundle items - price - availability

Branches: - addresses - phone numbers - service configuration

------------------------------------------------------------------------

# 17. Project Structure

Use a clean monorepo-like structure:

``` text
my-pizza/
├── client/
│   ├── src/
│   └── package.json
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── validators/
│   │   ├── seeds/
│   │   └── app.js
│   └── package.json
├── README.md
└── .gitignore
```

------------------------------------------------------------------------

# 18. Implementation Rules

1.  First create the architecture and folder structure.
2.  Then implement database models.
3.  Then seed all menu/category/deal/branch data.
4.  Then implement Express APIs.
5.  Then implement frontend pages.
6.  Then implement cart.
7.  Then implement checkout.
8.  Then implement admin.
9.  Then add animations.
10. Then perform responsive and accessibility cleanup.
11. Then test the full order flow.

Do not dump the entire application into one file.

Do not hard-code menu data into JSX.

Do not duplicate pricing logic between frontend and backend.

Do not use fake APIs once the Express backend exists.

Do not expose admin credentials.

------------------------------------------------------------------------

# 19. Visual Quality Bar

The result should look like a polished restaurant brand website.

Use: - strong hero typography - high-quality food imagery -
yellow/red/green/black brand accents - smooth rounded cards - subtle
shadows - tasteful motion - clean spacing - clear price hierarchy -
strong CTA buttons - attractive deal cards - mobile-first navigation

The menu should remain highly readable despite visual effects.

------------------------------------------------------------------------

# 20. Final Testing Checklist

Before declaring the project complete:

### UI

- [ ] Desktop responsive
- [ ] Mobile responsive
- [ ] No horizontal overflow
- [ ] Animations work
- [ ] Reduced motion works
- [ ] Images have fallbacks

### Menu

- [ ] All categories
- [ ] All supplied products
- [ ] Pizza sizes
- [ ] Correct prices
- [ ] Deals
- [ ] Availability

### Cart

- [ ] Add
- [ ] Remove
- [ ] Quantity
- [ ] Variants
- [ ] Add-ons
- [ ] Correct totals
- [ ] Persistence

### Backend

- [ ] MongoDB connection
- [ ] Validation
- [ ] Error handling
- [ ] Rate limiting
- [ ] Auth
- [ ] Server-side pricing

### Orders

- [ ] Branch selection
- [ ] Delivery/pickup
- [ ] Customer details
- [ ] Order creation
- [ ] Order number
- [ ] Status updates

### SEO/accessibility

- [ ] Metadata
- [ ] semantic HTML
- [ ] keyboard support
- [ ] alt text
- [ ] focus states

------------------------------------------------------------------------

# 21. Deliverable

Return a complete runnable project, not a prototype mockup.

Include: - source code - database schemas - seed scripts - API routes -
frontend - admin - `.env.example` - README - setup commands - production
build commands

At the end, explain: 1. how to install 2. how to configure MongoDB 3.
how to seed the database 4. how to run frontend/backend 5. how to create
the first admin 6. how to change menu prices 7. how to configure
branches and delivery zones
