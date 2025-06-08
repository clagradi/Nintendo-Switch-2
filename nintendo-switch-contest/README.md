# 🎮 Nintendo Switch Contest

Un'applicazione web moderna per organizzare contest e raffle per vincere una Nintendo Switch OLED!

## ✨ Caratteristiche

- **Design moderno** con Tailwind CSS e gradienti accattivanti
- **Responsive** - Funziona perfettamente su desktop, tablet e mobile
- **Statistiche in tempo reale** del contest
- **Sistema di pagamento simulato** per l'acquisto dei biglietti
- **Gestione biglietti** con numeri unici assegnati automaticamente
- **Pagina informativa** con link ai social media
- **Animazioni fluide** e feedback visivo

## 🚀 Come iniziare

### Prerequisiti
- Node.js (versione 16 o superiore)
- npm o yarn

### Avvio rapido

1. Naviga nella cartella del progetto
```bash
cd nintendo-switch-contest
```

2. Installa le dipendenze
```bash
npm install
```

3. Avvia il server di sviluppo
```bash
npm run dev
```

4. Apri il browser su `http://localhost:5173`

## 🎨 Tecnologie utilizzate

- **React 18** con TypeScript
- **Vite** - Build tool veloce  
- **Tailwind CSS** - Styling moderno
- **React Router** - Navigazione
- **Lucide React** - Icone

## 🔧 Personalizzazione

### Informazioni personali
- Modifica `src/pages/AboutPage.tsx` per aggiornare nome e Twitter
- Cambia prezzo biglietti in `src/components/PaymentButton.tsx`

### Deploy
```bash
npm run build  # Crea la cartella dist per il deploy
```

**⚠️ Nota**: Progetto dimostrativo con pagamenti simulati

---

Made with ❤️ per la gaming community!

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
