# 🎮 Nintendo Switch Contest

A complete web application to manage a Nintendo Switch contest/lottery with Stripe payments and Supabase database.

## ✨ Features

- 🎯 **Modern Frontend** - React 19 + TypeScript + Material-UI
- 💳 **Secure Payments** - Stripe Checkout integration
- 🗄️ **Cloud Database** - Supabase for participant management
- 🚀 **Serverless Deploy** - Optimized for Vercel
- 📱 **Responsive Design** - Perfect on desktop and mobile
- 🎨 **Custom UI** - Nintendo theme with glassmorphism effects

## 🛠️ Technologies Used

### Frontend

- React 19 with TypeScript
- Material-UI (MUI) for UI components
- React Router for navigation
- Vite for build and development
- ESLint for code quality

### Backend

- Vercel Functions (Node.js)
- Stripe for payment processing
- Supabase for PostgreSQL database
- Stripe webhooks for payment events

## 📋 Prerequisites

- Node.js 18+
- Stripe account (for payments)
- Supabase account (for database)
- Vercel account (for deployment)

## 🚀 Installation and Setup

### 1. Repository Clone

```bash
git clone <repo-url>
cd nintendo-switch-contest
npm install
```

### 2. Environment Variables Configuration

Create a `.env` file:

```bash
# Frontend Variables (VITE_ prefix required)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# Backend Variables (for Vercel Functions)
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

### 3. Supabase Setup

1. Create a new project on [Supabase](https://supabase.com)
2. Create the `participants` table with the following schema:

```sql
CREATE TABLE participants (
  id SERIAL PRIMARY KEY,
  nome VARCHAR NOT NULL,
  cognome VARCHAR NOT NULL,
  email VARCHAR UNIQUE NOT NULL,
  twitter_handle VARCHAR,
  numero_biglietto VARCHAR UNIQUE NOT NULL,
  importo DECIMAL(10,2) NOT NULL,
  ticket_count INTEGER DEFAULT 1,
  stato_pagamento VARCHAR DEFAULT 'pending',
  stripe_session_id VARCHAR,
  stripe_payment_intent_id VARCHAR,
  data_creazione TIMESTAMP DEFAULT NOW(),
  data_pagamento TIMESTAMP
);
```

### 4. Stripe Setup

1. Create account on [Stripe](https://stripe.com)
2. Get API keys from dashboard
3. Configure webhook endpoint (see VERCEL_DEPLOY.md)

### 5. Local Development

```bash
npm run dev
```

## 📁 Project Structure

```
├── api/                    # Vercel Functions (Backend)
│   ├── create-checkout-session.ts
│   ├── payment-status.ts
│   └── webhook.ts
├── src/                    # Frontend React
│   ├── components/         # Reusable components
│   ├── pages/             # Main pages
│   └── services/          # Services (Stripe, Supabase)
├── public/                # Static assets
└── VERCEL_DEPLOY.md       # Complete deployment guide
```

## 🌐 Production Deploy

Follow the detailed guide in `VERCEL_DEPLOY.md` for complete deployment on Vercel with:

- Environment variables configuration
- Stripe webhook setup
- Complete integration testing

## 🧪 Testing

### Local Tests

```bash
npm run lint      # Code check
npm run typecheck # TypeScript verification
npm run build     # Production build
```

### Payment Testing

Use Stripe test cards:

- **Success**: `4242 4242 4242 4242`
- **Failure**: `4000 0000 0000 0002`

## 📝 API Endpoints

- `POST /api/create-checkout-session` - Create payment session
- `GET /api/payment-status?session_id=xxx` - Check payment status
- `POST /api/webhook` - Handle Stripe events

## 🔒 Security

- ✅ CORS configured for authorized domains
- ✅ Stripe webhook validation with signature
- ✅ Environment variables for API keys
- ✅ Server-side input validation
- ✅ Complete error handling

## 🐛 Troubleshooting

### Common Issues

1. **CORS Error**: Check configuration in `vercel.json`
2. **Webhook fails**: Check Stripe signature secret
3. **Database error**: Verify Supabase credentials
4. **Payment not working**: Check Stripe API keys

### Logs and Debug

- Vercel Dashboard > Functions for backend logs
- Browser DevTools for frontend errors
- Stripe Dashboard > Events for webhooks

## 📞 Support

For issues or questions:

1. Check documentation in `VERCEL_DEPLOY.md`
2. Verify error logs
3. Test with Stripe test cards

## 📄 License

This project is for educational/demonstration purposes.

---

🎮 **Good luck with your Nintendo Switch contest!**
