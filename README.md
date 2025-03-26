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

- `/api/payment-methods` - Payment Methods API
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

<details>
<summary>Click to expand project screenshots</summary>

### User Flow Screenshots

| Stage | Screenshot |
|-------|------------|
| Home Page | ![Home](./screenshots/1-home.png) |
| Checkout - Fetching Payment Methods | ![Checkout Fetching](./screenshots/2-checkout-fetching-payment-method.png) |
| Checkout - No Payment Methods | ![No Payment Methods](./screenshots/3-checkout-no-payment-method.png) |

### Payment Method Flow

| Stage | Screenshot |
|-------|------------|
| Add Payment Method | ![Add Payment Method](./screenshots/4-checkout-payment-method-add.png) |
| bKash Wallet Input | ![bKash Wallet Input](./screenshots/5-bkash-wallet-input.png) |
| Save Wallet UI | ![Save Wallet UI](./screenshots/6-bkash-ui-to-save-wallet.png) |

### Authentication and Confirmation

| Stage | Screenshot |
|-------|------------|
| OTP Input | ![OTP Input](./screenshots/7-bkash-ui-otp-input.png) |
| Wallet Save Success | ![Wallet Save Success](./screenshots/8-bkash-ui-wallet-save-success.png) |
| Checkout with Payment Method | ![Checkout Payment Method](./screenshots/9-checkout-payment-method.png) |

### Transaction States

| Stage | Screenshot |
|-------|------------|
| Confirm Order PIN | ![Confirm Order PIN](./screenshots/10-bkash-ui-confirm-order-pin-input.png) |
| Payment Failed | ![Payment Failed](./screenshots/11-bkash-ui-payment-failed.png) |
| Transaction Cancelled | ![Transaction Cancelled](./screenshots/12-payment-failed.png) |
| Payment Success | ![Payment Success](./screenshots/13-payment-success.png) |

</details>

### Screenshot Viewing Tips

- Click on the "Click to expand project screenshots" dropdown to view all screenshots
- Screenshots are organized by user flow and transaction stages
- Each screenshot is labeled for easy reference

## Task left

- [ ] Add refund API
- [ ] Add payment query API
