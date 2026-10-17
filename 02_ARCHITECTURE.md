# My Pizza Website — System Architecture

## 1. High-Level Architecture

``` text
                 ┌──────────────────────────────┐
                 │          Customer             │
                 │ Mobile / Tablet / Desktop     │
                 └──────────────┬───────────────┘
                                │ HTTPS
                                ▼
                 ┌──────────────────────────────┐
                 │ React + Tailwind Frontend     │
                 │ Pages / Components / Cart     │
                 └──────────────┬───────────────┘
                                │ REST / JSON
                                ▼
                 ┌──────────────────────────────┐
                 │ Node.js + Express API         │
                 │ Auth / Menu / Orders / Branch │
                 └──────────────┬───────────────┘
                                │ Mongoose
                                ▼
                 ┌──────────────────────────────┐
                 │ MongoDB                       │
                 │ Products / Categories / Orders│
                 │ Branches / Admins / Zones     │
                 └──────────────────────────────┘
```

## 2. Frontend Architecture

Suggested structure:

``` text
client/
├── src/
│   ├── app/
│   │   ├── router/
│   │   └── providers/
│   ├── components/
│   │   ├── common/
│   │   ├── layout/
│   │   ├── menu/
│   │   ├── cart/
│   │   ├── checkout/
│   │   └── branches/
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Menu.jsx
│   │   ├── Deals.jsx
│   │   ├── Branches.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   └── OrderStatus.jsx
│   ├── admin/
│   ├── hooks/
│   ├── services/
│   │   └── api.js
│   ├── store/
│   ├── utils/
│   └── assets/
└── package.json
```

## 3. Backend Architecture

``` text
server/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── validators/
│   ├── utils/
│   ├── seeds/
│   └── app.js
└── package.json
```

### Responsibilities

**Routes:** Define HTTP endpoints only.  
**Controllers:** Parse request and return response.  
**Services:** Business logic and database orchestration.  
**Models:** Mongoose schemas.  
**Validators:** Request validation.  
**Middleware:** Auth, rate limiting, errors, logging.  
**Seeds:** Initial menu and branch data.

## 4. API Design

### Public

- `GET /api/categories`
- `GET /api/products`
- `GET /api/products/:slug`
- `GET /api/deals`
- `GET /api/branches`
- `POST /api/orders`
- `GET /api/orders/:orderNumber`

### Admin

- `POST /api/admin/auth/login`
- `POST /api/admin/auth/logout`
- `GET /api/admin/orders`
- `PATCH /api/admin/orders/:id/status`
- `POST /api/admin/products`
- `PATCH /api/admin/products/:id`
- `DELETE /api/admin/products/:id`
- `POST /api/admin/deals`
- `PATCH /api/admin/deals/:id`
- `POST /api/admin/categories`
- `PATCH /api/admin/categories/:id`
- `PATCH /api/admin/branches/:id`

## 5. Order Creation Flow

``` text
Customer cart
   ↓
Frontend sends product IDs + selected variants + quantities
   ↓
Express validates payload
   ↓
Server fetches current product/variant prices from MongoDB
   ↓
Server validates availability
   ↓
Server calculates subtotal / delivery / total
   ↓
Server stores immutable item snapshots
   ↓
MongoDB creates order
   ↓
API returns public order number
   ↓
Customer sees confirmation
```

Never trust the frontend-provided price.

## 6. Branch Logic

The branch is a first-class database entity.

At checkout: 1. Customer selects branch. 2. Server confirms branch is
active. 3. Server validates that the selected delivery area is
serviceable when zones are enabled. 4. Order stores the branch
snapshot/reference.

Initial branches: - Umer Din Road / Wasan Pura - M.A.Q College / Riwaz
Garden

## 7. Admin Architecture

Use protected admin routes.

Recommended: - Short-lived access token. - HTTP-only secure cookie where
possible. - Password hashing with Argon2 or bcrypt. - Role field for
future roles such as `admin` and `manager`.

Admin should not expose database credentials or privileged APIs to the
browser.

## 8. Deployment Architecture

``` text
Browser
  │
  ├── Frontend hosting/CDN
  │
  └── HTTPS API
          │
          ├── Node/Express hosting
          │
          └── MongoDB Atlas
```

Store images in object storage or a dedicated image/CDN provider rather
than MongoDB binary documents.

## 9. Error Strategy

API errors use a consistent shape:

``` json
{
  "success": false,
  "message": "Human-readable message",
  "code": "ORDER_UNAVAILABLE",
  "errors": []
}
```

Frontend displays useful errors and never exposes stack traces.

## 10. Performance Strategy

- Code split admin area.
- Lazy-load route-level pages.
- Lazy-load images.
- Use responsive image sizes.
- Cache public menu responses.
- Add MongoDB indexes.
- Avoid N+1 queries.
- Keep API payloads small.
- Debounce menu search.
