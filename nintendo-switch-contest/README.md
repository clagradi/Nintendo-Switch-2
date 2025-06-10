# 🎮 Nintendo Switch Contest

Un'applicazione web completa per gestire un concorso/lotteria Nintendo Switch con pagamenti Stripe e database Supabase.

## ✨ Caratteristiche

- 🎯 **Frontend moderno** - React 19 + TypeScript + Material-UI
- 💳 **Pagamenti sicuri** - Integrazione Stripe Checkout
- 🗄️ **Database cloud** - Supabase per gestione partecipanti
- 🚀 **Deploy serverless** - Ottimizzato per Vercel
- 📱 **Design responsive** - Perfetto su desktop e mobile
- 🎨 **UI personalizzata** - Tema Nintendo con effetti glassmorphism

## 🛠️ Tecnologie Utilizzate

### Frontend
- React 19 con TypeScript
- Material-UI (MUI) per componenti UI
- React Router per navigazione
- Vite per build e development
- ESLint per code quality

### Backend
- Vercel Functions (Node.js)
- Stripe per elaborazione pagamenti
- Supabase per database PostgreSQL
- Webhook Stripe per eventi pagamento

## 📋 Prerequisiti

- Node.js 18+ 
- Account Stripe (per pagamenti)
- Account Supabase (per database)
- Account Vercel (per deploy)

## 🚀 Installazione e Setup

### 1. Clone del Repository
```bash
git clone <repo-url>
cd nintendo-switch-contest
npm install
```

### 2. Configurazione Environment Variables
Copia `.env.example` in `.env` e compila con i tuoi valori:

```bash
cp .env.example .env
```

### 3. Setup Supabase
1. Crea un nuovo progetto su [Supabase](https://supabase.com)
2. Crea la tabella `partecipanti` con il seguente schema:

```sql
CREATE TABLE partecipanti (
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

### 4. Setup Stripe
1. Crea account su [Stripe](https://stripe.com)
2. Ottieni le API keys dal dashboard
3. Configura webhook endpoint (vedi VERCEL_DEPLOY.md)

### 5. Sviluppo Locale
```bash
npm run dev
```

## 📁 Struttura del Progetto

```
├── api/                    # Vercel Functions (Backend)
│   ├── create-checkout-session.ts
│   ├── payment-status.ts
│   └── webhook.ts
├── src/                    # Frontend React
│   ├── components/         # Componenti riutilizzabili
│   ├── pages/             # Pagine principali
│   └── services/          # Servizi (Stripe, Supabase)
├── public/                # Assets statici
└── VERCEL_DEPLOY.md       # Guida completa al deploy
```

## 🌐 Deploy in Produzione

Segui la guida dettagliata in `VERCEL_DEPLOY.md` per il deploy completo su Vercel con:
- Configurazione variabili d'ambiente
- Setup webhook Stripe
- Test integrazione completa

## 🧪 Test

### Test Locali
```bash
npm run lint      # Controllo codice
npm run typecheck # Verifica TypeScript
npm run build     # Build di produzione
```

### Test Pagamenti
Usa le carte di test Stripe:
- **Successo**: `4242 4242 4242 4242`
- **Fallimento**: `4000 0000 0000 0002`

## 📝 API Endpoints

- `POST /api/create-checkout-session` - Crea sessione pagamento
- `GET /api/payment-status?session_id=xxx` - Verifica stato pagamento  
- `POST /api/webhook` - Gestisce eventi Stripe

## 🔒 Sicurezza

- ✅ CORS configurato per domini autorizzati
- ✅ Validazione webhook Stripe con signature
- ✅ Variabili d'ambiente per API keys
- ✅ Validazione input lato server
- ✅ Gestione errori completa

## 🐛 Troubleshooting

### Problemi Comuni
1. **Errore CORS**: Verifica configurazione in `vercel.json`
2. **Webhook fallisce**: Controlla signature secret Stripe
3. **Database errore**: Verifica credenziali Supabase
4. **Pagamento non funziona**: Controlla API keys Stripe

### Log e Debug
- Vercel Dashboard > Functions per log backend
- Browser DevTools per errori frontend
- Stripe Dashboard > Events per webhook

## 📞 Supporto

Per problemi o domande:
1. Controlla la documentazione in `VERCEL_DEPLOY.md`
2. Verifica i log di errore
3. Testa con carte di test Stripe

## 📄 Licenza

Questo progetto è per scopi educativi/dimostrativi.

---

🎮 **Buona fortuna con il tuo concorso Nintendo Switch!**
