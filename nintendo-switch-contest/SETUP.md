# 🔧 Setup Guide - Firebase + Stripe

## 🔥 Firebase Setup (Database Gratuito)

### 1. Crea un Progetto Firebase
1. Vai su [Firebase Console](https://console.firebase.google.com/)
2. Clicca "Add project" / "Aggiungi progetto"
3. Scegli un nome (es. "nintendo-switch-contest")
4. Disabilita Google Analytics (non necessario)

### 2. Configura Firestore Database
1. Nel menu laterale, vai su "Firestore Database"
2. Clicca "Create database"
3. Scegli "Start in test mode" (per ora)
4. Seleziona una location (europe-west3 per l'Europa)

### 3. Ottieni le Credenziali
1. Vai su "Project Settings" (icona ingranaggio)
2. Nella tab "General", scorri fino a "Your apps"
3. Clicca l'icona "</>" per aggiungere una web app
4. Nome: "Nintendo Switch Contest Web"
5. **COPIA** la configurazione che appare!

### 4. Configura l'App
1. Copia `.env.example` in `.env`:
   ```bash
   cp .env.example .env
   ```
2. Incolla le tue credenziali Firebase nel file `.env`

## 💳 Stripe Setup (Pagamenti)

### 1. Crea Account Stripe
1. Vai su [Stripe.com](https://stripe.com)
2. Clicca "Sign up"
3. Completa la registrazione

### 2. Ottieni le Chiavi
1. Nel dashboard Stripe, vai su "Developers" > "API keys"
2. **COPIA** la "Publishable key" (inizia con `pk_test_`)
3. Incollala in `.env` come `VITE_STRIPE_PUBLISHABLE_KEY`

### 3. Test Mode
- Per ora usiamo solo test mode (gratuito)
- I pagamenti sono simulati
- Potrai usare carte di test come `4242 4242 4242 4242`

## ⚡ Quick Start

1. **Setup Credentials:**
   ```bash
   cp .env.example .env
   # Modifica .env con le tue credenziali
   ```

2. **Install & Run:**
   ```bash
   npm install
   npm run dev
   ```

3. **Test tutto:**
   - Compila il form di pagamento
   - Usa email di test
   - I biglietti appariranno nella lista

## 🗄️ Struttura Database

**Collections Firestore:**
```
users/
  ├── userId
  │   ├── email: string
  │   ├── name: string
  │   └── createdAt: timestamp

tickets/
  ├── ticketId
  │   ├── ticketNumber: number
  │   ├── userId: string
  │   ├── userEmail: string
  │   ├── userName: string
  │   ├── purchasedAt: timestamp
  │   ├── paymentId: string
  │   └── isActive: boolean

payments/
  ├── paymentId
  │   ├── userId: string
  │   ├── userEmail: string
  │   ├── amount: number
  │   ├── ticketCount: number
  │   ├── stripePaymentId: string
  │   ├── status: 'pending' | 'completed' | 'failed'
  │   └── createdAt: timestamp
```

## 🔒 Sicurezza (Per Produzione)

1. **Firebase Rules:** Configura regole di sicurezza
2. **Environment Variables:** Non committare mai `.env`
3. **Stripe Webhook:** Configura webhook per verificare pagamenti
4. **Backend API:** Crea API backend per gestire pagamenti reali

## 💰 Costi

- **Firebase:** Tier gratuito fino a 50,000 letture/giorno
- **Stripe:** 2.9% + €0.25 per transazione
- **Hosting:** Gratis con Netlify/Vercel

---

🚀 **Tutto pronto!** Ora hai un sistema completo per contest/raffles con database e pagamenti!
