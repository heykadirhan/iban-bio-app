# iban.bio

A link-in-bio for getting paid. Users claim a `iban.bio/username` handle and share a single page that holds their IBANs, crypto wallets, payment-app handles and payment links — so the recipient copies the right details in one tap instead of pasting an account number into a chat.

Payment details are stored encrypted (AES-256-CBC) and profiles can be public, private, or reachable only through an expiring share link.

## Features

- **Payment methods** — IBAN, crypto wallet, payment app, or plain link; each with a title, appearance, ordering, and copy counters.
- **Encrypted at rest** — every payment value is encrypted with `ENCRYPTION_KEY` before it hits MongoDB; only the metadata (bank name, currency, coin, network) is stored in plain text.
- **Profile visibility** — `public`, `private`, or `expirable`, the default.
- **Expiring share links** — one-time or time-boxed tokens (15m / 1h / 24h / single view) that expire on their own via a MongoDB TTL index.
- **Auth** — Google OAuth and phone number + OTP (Twilio Verify) through NextAuth.
- **Lookup** — find a profile by username or by phone number.
- **IBAN QR generator** — a standalone public tool at `/tools/iban-qr-generator`.
- **Dashboard & admin** — profile views, copy counts and device/session activity; an admin area with a global maintenance-mode switch enforced in middleware.
- **i18n** — English and Turkish, cookie-based with automatic detection and no locale prefix in the URL.
- **Avatar uploads** — presigned uploads to S3-compatible storage (AWS S3 / Cloudflare R2).

## Tech stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack), React 19, TypeScript |
| Styling | Tailwind CSS 4, shadcn/ui, Radix UI, Framer Motion |
| Data | MongoDB via Mongoose |
| Auth | NextAuth (Google + credentials/OTP) |
| Forms | React Hook Form + Zod |
| i18n | next-intl |
| Storage | AWS S3 / Cloudflare R2 |
| Messaging | Twilio (OTP), Nodemailer |

## Getting started

Requirements: Node.js 20+, Yarn, and a MongoDB instance.

```bash
yarn install
cp .env.example .env      # then fill in the values
docker compose up -d      # optional: local MongoDB on :27017
yarn dev
```

The app runs at [http://localhost:3000](http://localhost:3000).

### Environment

Copy `.env.example` and set at least:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_APP_URL`, `NEXTAUTH_URL` | Public app URL |
| `NEXTAUTH_SECRET` | NextAuth session secret |
| `MONGODB_URI` | MongoDB connection string |
| `ENCRYPTION_KEY` | **64-char hex string** — required at boot; payment data is unreadable without it |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | Google sign-in |
| `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_SERVICE_SID`, `TWILIO_PHONE_NUMBER` | Phone OTP |
| `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_BUCKET_NAME`, `AWS_STORAGE_URL`, `R2_ACCOUNT_ID` | Avatar storage |
| `IBAN_API_KEY`, `NEXT_PUBLIC_CRYPTO_API_URL` | IBAN validation, crypto price data |
| `GA_ID`, `HOTJAR_SITE_ID` | Analytics (optional) |

Never commit a real `.env`. Rotating `ENCRYPTION_KEY` invalidates every stored payment method.

## Scripts

```bash
yarn dev      # dev server (Turbopack)
yarn build    # production build
yarn start    # serve the production build
yarn lint     # ESLint
```

## Project structure

```
app/
  [locale]/          # localized pages: home, dashboard, settings, admin,
                     # search, onboarding, tools, /[username] profile
  api/               # route handlers: auth, profile, payment-methods,
                     # share-tokens, upload, activity, admin, og
components/          # shared components + shadcn/ui primitives
core/
  config/            # NextAuth and toast config
  constants/         # routes, endpoints, regex, option lists
  dtos/              # Zod request schemas
  enums/             # PaymentMethodType, ProfileVisibility, Locale, ...
  models/            # Mongoose models (user, payment-method, share-token,
                     # otp, activity, maintenance)
  services/          # http client, cookie storage
lib/                 # db, auth, crypto, s3, twilio, nodemailer, maintenance
layouts/             # home / dashboard / admin shells
views/               # page-level compositions
locales/             # en.json, tr.json, next-intl setup
middleware.ts        # i18n routing, maintenance redirect, admin guard, rate limit
```

Path aliases: `@/*` → project root, `@core/*` → `core/*`.

## Middleware

Every non-asset request passes through `middleware.ts`, which redirects to `/maintenance` while maintenance mode is on (cached 5s), blocks `/admin` for non-admin tokens, rate-limits non-GET requests to 30/min per IP, and then applies next-intl routing.

## Deployment

`Dockerfile` and `docker-compose.yml` cover a containerized setup; `docker-compose.yml` on its own just brings up MongoDB for local development. Pushes to `main` trigger the GitHub Actions workflow in `.github/workflows/`, which builds the project with secrets injected and deploys to a self-hosted runner.

## Notes

- Soft deletes: users and payment methods set `deletedAt` and are filtered out of queries rather than removed.
- Security headers (HSTS, `X-Frame-Options`, `X-Content-Type-Options`) are set in `next.config.ts`.
