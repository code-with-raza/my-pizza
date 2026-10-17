# My Pizza Website — MongoDB Database Design

## 1. Collections

- `admins`
- `categories`
- `products`
- `deals`
- `branches`
- `orders`
- `deliveryZones` (optional but recommended)

## 2. Admin

``` js
{
  _id: ObjectId,
  name: String,
  email: String,
  passwordHash: String,
  role: "admin" | "manager",
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

Indexes: - unique `email`

## 3. Category

``` js
{
  _id: ObjectId,
  name: String,
  slug: String,
  description: String,
  imageUrl: String,
  sortOrder: Number,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

Suggested categories: - Pizza - From The Fryer - Roll & Wrap - Grill
Corner - Sandwich - Potato Corner - Pasta - Beverages - Deals

## 4. Product

``` js
{
  _id: ObjectId,
  categoryId: ObjectId,
  name: String,
  slug: String,
  description: String,
  imageUrl: String,
  variants: [
    {
      name: String,
      code: String,
      price: Number
    }
  ],
  price: Number,
  addOns: [
    {
      name: String,
      price: Number,
      isActive: Boolean
    }
  ],
  isAvailable: Boolean,
  isFeatured: Boolean,
  sortOrder: Number,
  createdAt: Date,
  updatedAt: Date
}
```

Use `variants` for pizza sizes and other size-dependent products.

Pizza size codes: - `S` = 7-inch - `M` = 11-inch - `L` = 14-inch - `XL`
= 18-inch

For products with one price, either use `price` or a single variant.
Keep the implementation consistent.

## 5. Deal

``` js
{
  _id: ObjectId,
  name: String,
  slug: String,
  description: String,
  type: "combo" | "family" | "deal" | "promotion",
  items: [
    {
      productId: ObjectId,
      productNameSnapshot: String,
      quantity: Number,
      variantCode: String | null
    }
  ],
  price: Number,
  imageUrl: String,
  isAvailable: Boolean,
  sortOrder: Number,
  createdAt: Date,
  updatedAt: Date
}
```

Store a product name snapshot inside a deal item so admin changes can be
managed safely.

## 6. Branch

``` js
{
  _id: ObjectId,
  name: String,
  address: String,
  city: String,
  phones: {
    branch: String,
    order: String
  },
  latitude: Number,
  longitude: Number,
  serviceZoneIds: [ObjectId],
  openingHours: [
    {
      day: Number,
      open: String,
      close: String,
      isClosed: Boolean
    }
  ],
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

Initial data:

``` text
Branch 1
Umer Din Road, Near Iftikhar Optical, Wasan Pura, Lahore
Branch phone: 0304 890 1341
Order phone: 0309 940 8899

Branch 2
M.A.Q College, Near Haq Orthopedic Hospital, Riwaz Garden, Lahore
Branch phone: 0310 483 4236
Order phone: 0317 454 4884
```

## 7. Delivery Zone

``` js
{
  _id: ObjectId,
  branchId: ObjectId,
  name: String,
  areas: [String],
  deliveryFee: Number,
  minimumOrder: Number,
  isActive: Boolean
}
```

Do not invent actual delivery areas or fees. Let the restaurant owner
configure them.

## 8. Order

``` js
{
  _id: ObjectId,
  orderNumber: String,

  branchId: ObjectId,

  customer: {
    name: String,
    phone: String,
    address: String,
    notes: String
  },

  fulfillment: "delivery" | "pickup",

  items: [
    {
      sourceType: "product" | "deal",
      sourceId: ObjectId,
      name: String,
      variantName: String | null,
      quantity: Number,
      unitPrice: Number,
      addOns: [
        {
          name: String,
          price: Number
        }
      ],
      lineTotal: Number
    }
  ],

  pricing: {
    subtotal: Number,
    deliveryFee: Number,
    discount: Number,
    total: Number
  },

  status:
    "pending" |
    "confirmed" |
    "preparing" |
    "ready" |
    "out_for_delivery" |
    "completed" |
    "cancelled",

  paymentMethod: "cash" | "online",
  paymentStatus: "unpaid" | "paid" | "failed",

  createdAt: Date,
  updatedAt: Date
}
```

Indexes: - unique `orderNumber` - `{ status: 1, createdAt: -1 }` -
`{ branchId: 1, createdAt: -1 }` -
`{ "customer.phone": 1, createdAt: -1 }`

## 9. Menu Seed Data

The initial menu should be seeded from the supplied menu artwork.

### Pizza sizes

- Small: 7-inch
- Medium: 11-inch
- Large: 14-inch
- X-Large: 18-inch

### Pizza pricing

Standard pizzas: - Small Rs. 550 - Medium Rs. 1000 - Large Rs. 1500 -
X-Large Rs. 2000

Higher-priced pizzas: - Small Rs. 600 - Medium Rs. 1200 - Large Rs.
1700 - X-Large Rs. 2200

Extra topping: - Small Rs. 80 - Medium Rs. 100 - Large Rs. 150 - X-Large
Rs. 200

### From The Fryer

- Crunch Burger — 320
- Crunch Burger with fries — 370
- Cheesy Crunch Burger — 450
- Zinger Patty Burger — 500
- Tower Burger — 600
- Patty Burger — 240
- Patty Burger with fries — 300
- Cheesy Patty Burger — 350
- Fried Chicken 1 Pc — 240
- Nuggets 5 Pcs — 260
- Hot Wings 5 Pcs — 300
- Hot Wings 10 Pcs — 580
- Cheese Slice — 50

### Roll & Wrap

- Chicken Shawarma — S 220 / M 250 / L 300
- Zinger Shawarma — 320
- Cheesy Shawarma — 320
- Platter Shawarma (with 2 breads) — 500
- Cheesy Platter (with 2 breads) — 630
- Kabab Paratha Roll — 300
- Chicken Paratha Roll — 300
- Zinger Paratha Roll — 320
- Pizza Paratha (Tandoori + Mexican) — 500
- Grill Wrap — 550
- Zinger Wrap — 500
- Grill Shawarma — 350

### Grill Corner

- Cocktail Grill Burger — 420
- Peri Peri Burger — 420
- Jalapeno Burger — 420
- My Pizza Special — 480
- Grilled Wings 5 Pcs — 350
- Cheesy Grilled Wings 5 Pcs — 470

### Sandwich

- Chicken Sandwich — 400
- Club Sandwich — 400
- Zinger Sandwich — 430
- Grill Sandwich — 480

### Potato Corner

- Loaded Fries S — 400
- Loaded Fries L — 600
- Plain Fries S — 150
- Plain Fries M — 250
- Plain Fries Family Pack — 400
- Garlic Mayo Fries Half — 300
- Garlic Mayo Fries Full — 400
- B.B.Q Masala Fries Half — 300
- B.B.Q Masala Fries Full — 400
- Cheesy Fries Half — 300
- Cheesy Fries Full — 400

### Pasta

- Alfredo Pasta — 700
- Crunchy Chicken Pasta — 850

### Beverages

- Half Liter — 120
- 1.5 Liter — 200
- Jumbo Drink — 250
- Mineral Water S — 70
- Mineral Water L — 120

## 10. Deals From Supplied Menu

- Pizza 1+1 Small — 1000
- Pizza 1+1 Medium — 1900
- Pizza 1+1 Large — 2800
- Pizza 1+1 X-Large — 3700

Combo 1 — 1050: - 1 Small Pizza - Patty Burger - Regular Shawarma - Half
Liter Drink

Combo 2 — 1850: - 1 Medium Pizza - Crunch Burger - Patty Burger -
Regular Fries - 1.5 Liter Drink

Combo 3 — 2450: - 1 Large Pizza - Cheesy Patty Burger - Club Sandwich -
Regular Fries - 1.5 Liter Drink

Family Deal — 3300: - 1 Large Pizza - 2 Zinger Burgers - 10 Hot Wings -
1 Pizza Paratha - 1 Jumbo Drink

Deal 1 — 900: - 2 Zinger Burgers - 5 Nuggets - Half Liter Drink

Deal 2 — 1850: - 4 Zinger Burgers - 10 Hot Wings - 1.5 Liter Drink

Deal 3 — 850: - 3 Small Shawarma - Small Fries - Half Liter Drink

Deal 4 — 1050: - 1 Small Pizza - 1 Zinger Burger - 1 Small Fries - Half
Liter Drink

Deal 5 — 1100: - 1 Small Loaded Fries - 1 Club Sandwich - 1 Medium
Shawarma - Half Liter Drink

Deal 6 — 850: - 1 Zinger Patty Burger - 5 Wings - Half Liter Drink

Deal 7 — 900: - 3 Fried Chicken Pieces - 1 Small Fries - Half Liter
Drink

Deal 8 — 1950: - 6 Fried Chicken Pieces - 10 Nuggets - 1.5 Liter Drink

## 11. Important Data Rule

The menu artwork is the source for initial content. Before production
launch, the restaurant owner should verify every spelling, price,
portion size, promotion and availability. The database must be
authoritative after import.
