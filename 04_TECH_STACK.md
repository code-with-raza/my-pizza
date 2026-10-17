# My Pizza Website — Technical Stack

## Core

| Layer      | Technology               |
|------------|--------------------------|
| Frontend   | React                    |
| Styling    | Tailwind CSS             |
| Backend    | Node.js                  |
| API        | Express.js               |
| Database   | MongoDB                  |
| ODM        | Mongoose                 |
| Language   | JavaScript or TypeScript |
| API format | REST / JSON              |

## Frontend Recommendations

- React
- Vite
- Tailwind CSS
- React Router
- TanStack Query for server state
- Zustand for cart/UI state
- React Hook Form
- Zod for client-side schema validation
- Framer Motion or Motion for animations
- Lucide React for icons

## Backend Recommendations

- Node.js
- Express
- Mongoose
- Zod or Joi for request validation
- Helmet
- CORS
- express-rate-limit
- Pino or Winston for logging
- bcrypt/Argon2 for admin passwords
- JWT or secure session cookies for admin authentication

## Development

``` text
Node.js
npm
ESLint
Prettier
Git
```

Optional: - Husky + lint-staged - Vitest for frontend/unit tests -
Supertest for API tests

## Production

- React/Vite frontend deployed to a CDN/static host.
- Express API deployed to a Node-compatible host.
- MongoDB Atlas.
- Image CDN/object storage for food images.
- HTTPS everywhere.

## Environment Variables

Frontend:

``` text
VITE_API_BASE_URL=
```

Backend:

``` text
PORT=
MONGODB_URI=
JWT_SECRET=
FRONTEND_URL=
ADMIN_EMAIL=
ORDER_NOTIFICATION_TARGET=
```

Never expose backend secrets through `VITE_*` variables.

## Code Standards

- Components should be small and reusable.
- Keep business logic out of UI components.
- Keep database queries in services/repositories.
- Validate all API inputs.
- Use consistent API response shapes.
- Use semantic HTML.
- Use accessible labels and keyboard navigation.
- Do not duplicate product data across React components.
- Use database IDs/slugs to reference products.

## Testing Strategy

### Unit

- Price calculation
- Cart calculations
- Deal calculations
- Delivery fee rules
- Validation schemas

### API

- Product retrieval
- Order creation
- Invalid order rejection
- Admin authentication
- Product CRUD

### UI

- Menu filtering
- Add to cart
- Quantity updates
- Checkout validation
- Responsive navigation

### E2E

- Browse → cart → checkout → order confirmation
- Admin login → update price → frontend reflects new price

## Security Baseline

- Validate and sanitize all input.
- Do not trust frontend prices.
- Hash admin passwords.
- Protect admin endpoints.
- Rate-limit order creation and authentication.
- Configure CORS explicitly.
- Use secure cookies where applicable.
- Do not return internal errors or stack traces.
- Use MongoDB indexes.
- Log security-relevant failures.
