# My Pizza — Restaurant Website

A production-quality restaurant ordering website for **My Pizza, Lahore**.

**Stack:** React + Vite + Tailwind CSS + Node.js + Express + MongoDB + Mongoose

---

## Project Structure

```
my-pizza/
├── frontend/   — React + Vite + Tailwind CSS customer website + admin panel
├── backend/    — Node.js + Express REST API + MongoDB
└── README.md
```

---

## Setup

### 1. Backend

```bash
cd backend

# Copy environment variables
copy .env.example .env
# Edit .env — set MONGODB_URI and JWT_SECRET

npm install
npm run seed      # Seeds DB with menu, categories, deals, branches, admin
npm run dev       # Starts API on http://localhost:5000
```

### 2. Frontend

```bash
cd frontend

# Copy environment variables
copy .env.example .env
# Edit .env — VITE_API_BASE_URL=http://localhost:5000/api

npm install
npm run dev       # Starts app on http://localhost:5173
```

---

## Default Admin Credentials

After running `npm run seed` in the backend:

- **Email:** `admin@mypizza.com`
- **Password:** `admin123`

> ⚠️ Change these in `.env` before deploying to production!

---

## API Endpoints

### Public
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/categories` | All active categories |
| GET | `/api/products` | Products (filter: `category`, `featured`) |
| GET | `/api/products/:slug` | Single product |
| GET | `/api/deals` | All active deals |
| GET | `/api/branches` | All active branches |
| POST | `/api/orders` | Create order |
| GET | `/api/orders/:orderNumber` | Order status |

### Admin (JWT required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/admin/auth/login` | Admin login |
| GET | `/api/admin/orders` | List orders |
| PATCH | `/api/admin/orders/:id/status` | Update order status |
| CRUD | `/api/admin/products` | Manage products |
| CRUD | `/api/admin/categories` | Manage categories |
| CRUD | `/api/admin/deals` | Manage deals |
| PATCH | `/api/admin/branches/:id` | Update branch info |

---

## Branches

**Wasan Pura:** Umer Din Road, Near Iftikhar Optical, Wasan Pura, Lahore  
Order: 0309 940 8899 | Branch: 0304 890 1341

**Riwaz Garden:** M.A.Q College, Near Haq Orthopedic Hospital, Riwaz Garden, Lahore  
Order: 0317 454 4884 | Branch: 0310 483 4236

---

## Production Deployment

1. Build frontend: `cd frontend && npm run build` → deploy `dist/` to CDN/static host
2. Deploy backend to Node.js host (Railway, Render, VPS)
3. Use MongoDB Atlas for production database
4. Set all environment variables on the hosting platform
5. Configure CORS `FRONTEND_URL` in backend `.env`
