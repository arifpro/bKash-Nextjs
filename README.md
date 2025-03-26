# bKash Payment Gateway Integration with Next.js (including API)

- Deployed link
  - <https://bkash-nextjs.vercel.app>
  - <https://bkash.devarif.me>

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open <http://localhost:3000> with your browser to see the result.

## Routes

- `/` - Home page
- `/checkout` - Checkout page
- `/success` - Success page
- `/cancel` - Cancel page

## API

- `/api/payment` - Payment API
- `/api/callback` - Callback API

## Environment Variables

Create a `.env.local` file in the root directory and add the following environment variables:

```bash
# bKash
BKASH_BASE_URL=''
BKASH_CHECKOUT_URL_USER_NAME=''
BKASH_CHECKOUT_URL_PASSWORD=''
BKASH_CHECKOUT_URL_APP_KEY=''
BKASH_CHECKOUT_URL_APP_SECRET=''

# Database
MONGO_URI=""
```

## Screenshots

![Home](./screenshots/home.png)
![Checkout](./screenshots/checkout.png)
![Success](./screenshots/success.png)
![Cancel](./screenshots/cancel.png)

## Task left

- [ ] Add refund API
- [ ] Add payment query API
