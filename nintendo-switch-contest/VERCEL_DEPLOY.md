# Deploy su Vercel - Guida Completa

Questa guida ti aiuterà a deployare la tua applicazione Nintendo Switch Contest su Vercel con integrazione Stripe e Supabase.

## 📋 Prerequisiti

- Account [Vercel](https://vercel.com)
- Account [Stripe](https://stripe.com) (modalità test per sviluppo)
- Account [Supabase](https://supabase.com)
- Repository GitHub del progetto

## 🚀 Passo 1: Preparazione del Repository

1. **Assicurati che il codice sia pushato su GitHub**
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

## 🔧 Passo 2: Configurazione Stripe

### 2.1 Ottieni le Chiavi API
1. Vai su [Stripe Dashboard](https://dashboard.stripe.com)
2. Vai su **Developers > API Keys**
3. Copia:
   - **Publishable key** (pk_test_...)
   - **Secret key** (sk_test_...)

### 2.2 Configura il Webhook
1. Vai su **Developers > Webhooks**
2. Clicca **+ Add endpoint**
3. URL endpoint: `https://your-app.vercel.app/api/webhook`
4. Eventi da ascoltare:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Copia il **Webhook secret** (whsec_...)

## 🗄️ Passo 3: Configurazione Supabase

### 3.1 Crea il Database
1. Vai su [Supabase Dashboard](https://supabase.com/dashboard)
2. Crea un nuovo progetto
3. Vai su **SQL Editor** e esegui questo script:

```sql
-- Crea la tabella partecipanti
CREATE TABLE partecipanti (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  cognome VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  twitter_handle VARCHAR(100),
  numero_biglietto VARCHAR(20) UNIQUE NOT NULL,
  importo DECIMAL(10,2) NOT NULL,
  ticket_count INTEGER DEFAULT 1,
  stato_pagamento VARCHAR(20) DEFAULT 'pending',
  stripe_session_id VARCHAR(255),
  stripe_payment_intent_id VARCHAR(255),
  data_creazione TIMESTAMP DEFAULT NOW(),
  data_pagamento TIMESTAMP
);

-- Crea un indice per migliorare le performance
CREATE INDEX idx_partecipanti_email ON partecipanti(email);
CREATE INDEX idx_partecipanti_numero_biglietto ON partecipanti(numero_biglietto);
```

### 3.2 Ottieni le Chiavi API
1. Vai su **Settings > API**
2. Copia:
   - **URL** del progetto
   - **Anon public** key
   - **Service role** key (solo per il backend)

## ☁️ Passo 4: Deploy su Vercel

### 4.1 Connetti il Repository
1. Vai su [Vercel Dashboard](https://vercel.com/dashboard)
2. Clicca **New Project**
3. Importa il tuo repository GitHub
4. Configura le impostazioni:
   - **Framework Preset**: Vite
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### 4.2 Configura le Variabili d'Ambiente
Aggiungi queste variabili in **Settings > Environment Variables**:

```env
# Stripe (Frontend)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here

# Stripe (Backend)
STRIPE_SECRET_KEY=sk_test_your_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Supabase (Frontend)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here

# Supabase (Backend)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Configurazione App
VITE_TICKET_PRICE=10
```

### 4.3 Deploy
1. Clicca **Deploy**
2. Attendi il completamento del build
3. Il tuo sito sarà disponibile su `https://your-app.vercel.app`

## 🔗 Passo 5: Aggiorna il Webhook Stripe

1. Torna su Stripe Dashboard > Webhooks
2. Modifica il webhook creato prima
3. Aggiorna l'URL con il dominio Vercel: `https://your-app.vercel.app/api/webhook`
4. Salva le modifiche

## ✅ Passo 6: Test dell'Integrazione

### 6.1 Test del Frontend
1. Visita il tuo sito su Vercel
2. Compila il form di pagamento
3. Usa una carta di test Stripe: `4242 4242 4242 4242`

### 6.2 Test del Backend
1. Verifica che il webhook riceva gli eventi
2. Controlla i log in Vercel Dashboard > Functions
3. Verifica che i dati vengano salvati in Supabase

### 6.3 Test delle API
```bash
# Test payment status API
curl https://your-app.vercel.app/api/payment-status?session_id=cs_test_...

# Test create checkout session API
curl -X POST https://your-app.vercel.app/api/create-checkout-session \
  -H "Content-Type: application/json" \
  -d '{"amount":1000,"userEmail":"test@example.com","userName":"Test User","ticketCount":1}'
```

## 🐛 Risoluzione Problemi

### Errori Comuni

1. **CORS Errors**: Verifica che `vercel.json` sia configurato correttamente
2. **Environment Variables**: Assicurati che tutte le variabili siano impostate
3. **Webhook Failures**: Controlla i log di Stripe e Vercel
4. **Database Errors**: Verifica le credenziali Supabase

### Debug dei Log
```bash
# Installa Vercel CLI
npm i -g vercel

# Login
vercel login

# Visualizza i log
vercel logs your-app.vercel.app
```

## 🔄 Aggiornamenti Futuri

Ogni volta che pushes del codice su GitHub, Vercel rebuilderà automaticamente l'app.

```bash
git add .
git commit -m "Update application"
git push origin main
```

## 📞 Supporto

Se incontri problemi:
1. Controlla i log di Vercel
2. Verifica le configurazioni Stripe e Supabase
3. Controlla che tutte le variabili d'ambiente siano impostate
4. Testa le API individualmente

## 🎉 Congratulazioni!

Il tuo contest Nintendo Switch è ora live e pronto per ricevere partecipazioni con pagamenti reali!