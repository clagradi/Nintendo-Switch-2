#!/bin/bash
# Pre-deploy check script for Nintendo Switch Contest

echo "🚀 === CONTROLLO PRE-DEPLOY ==="
echo ""

# Colori per output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Funzione per stampare errori
print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Funzione per stampare successi
print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

# Funzione per stampare warning
print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

echo "=== 1. Controllo file sensibili nel repo ==="

files_to_check=(".env" ".env.local" ".env.production" "node_modules" "dist" "build" ".DS_Store")

for file in "${files_to_check[@]}"
do
  if git ls-files --error-unmatch "$file" > /dev/null 2>&1; then
    print_error "ATTENZIONE: '$file' è tracciato da Git. Rimuovilo prima di deployare!"
    echo "Esegui: git rm --cached $file && echo '$file' >> .gitignore"
    exit 1
  fi
done

print_success "Nessun file sensibile tracciato da Git."
echo ""

echo "=== 2. Verifica .gitignore ==="
if [[ ! -f ".gitignore" ]]; then
    print_warning ".gitignore non trovato"
else
    # Controlla che i file essenziali siano nel .gitignore
    essential_ignores=("node_modules" ".env" "dist" "build")
    missing_ignores=()
    
    for ignore in "${essential_ignores[@]}"
    do
        if ! grep -q "^$ignore" .gitignore; then
            missing_ignores+=("$ignore")
        fi
    done
    
    if [[ ${#missing_ignores[@]} -gt 0 ]]; then
        print_warning "Questi pattern mancano nel .gitignore: ${missing_ignores[*]}"
    else
        print_success ".gitignore configurato correttamente."
    fi
fi
echo ""

echo "=== 3. Verifica modifiche non committate ==="
if [[ -n $(git status --porcelain) ]]; then
  print_error "Ci sono modifiche non committate:"
  git status --short
  echo ""
  echo "Esegui: git add . && git commit -m 'Pre-deploy fixes'"
  exit 1
fi

print_success "Nessuna modifica non committata."
echo ""

echo "=== 4. Verifica branch corrente ==="
current_branch=$(git rev-parse --abbrev-ref HEAD)
if [[ "$current_branch" != "main" && "$current_branch" != "master" ]]; then
    print_warning "Sei sul branch '$current_branch'. Assicurati che sia quello corretto per il deploy."
fi
echo ""

echo "=== 5. Controllo dipendenze ==="
if [[ ! -f "package.json" ]]; then
    print_error "package.json non trovato!"
    exit 1
fi

if [[ ! -d "node_modules" ]]; then
    print_warning "node_modules non trovato. Installando dipendenze..."
    npm install
fi

# Verifica vulnerabilità
echo "Controllo vulnerabilità di sicurezza..."
if npm audit --audit-level high > /dev/null 2>&1; then
    print_success "Nessuna vulnerabilità critica trovata."
else
    print_warning "Vulnerabilità trovate. Considera di eseguire 'npm audit fix'"
fi
echo ""

echo "=== 6. Lint e controlli qualità codice ==="
if npm run lint > /dev/null 2>&1; then
    print_success "Lint passed."
else
    print_warning "Problemi di lint trovati. Esegui 'npm run lint' per dettagli."
fi
echo ""

echo "=== 7. Test (se presenti) ==="
if grep -q '"test"' package.json && [[ $(npm list --depth=0 2>/dev/null | grep -E "(jest|vitest|cypress)" | wc -l) -gt 0 ]]; then
    echo "Eseguendo test..."
    if npm test > /dev/null 2>&1; then
        print_success "Tutti i test passano."
    else
        print_error "Alcuni test falliscono. Controlla con 'npm test'"
        exit 1
    fi
else
    print_warning "Nessun test configurato."
fi
echo ""

echo "=== 8. Test build di produzione ==="
echo "Eseguendo build di produzione..."
if npm run build; then
    print_success "Build completata con successo."
    
    # Verifica dimensione bundle
    if [[ -d "dist" ]]; then
        bundle_size=$(du -sh dist | cut -f1)
        echo "📦 Dimensione bundle: $bundle_size"
    fi
else
    print_error "Build di produzione FALLITA. Correggi gli errori prima di deployare."
    exit 1
fi
echo ""

echo "=== 9. Verifica variabili d'ambiente ==="
if [[ -f ".env.example" && -f ".env" ]]; then
    # Confronta le chiavi tra .env.example e .env
    env_example_keys=$(grep -E '^[A-Z_]+=' .env.example | cut -d'=' -f1 | sort)
    env_keys=$(grep -E '^[A-Z_]+=' .env | cut -d'=' -f1 | sort)
    
    if [[ "$env_example_keys" == "$env_keys" ]]; then
        print_success "Variabili d'ambiente allineate con .env.example"
    else
        print_warning "Le variabili in .env potrebbero non essere allineate con .env.example"
    fi
elif [[ -f ".env.example" ]]; then
    print_warning "Trovato .env.example ma non .env"
else
    print_warning "Nessun file .env.example trovato"
fi
echo ""

echo "=== 10. Controllo configurazione Vercel ==="
if [[ -f "vercel.json" ]]; then
    print_success "vercel.json trovato"
    if grep -q "api" vercel.json; then
        print_success "Configurazione API Vercel presente"
    fi
else
    print_warning "vercel.json non trovato"
fi
echo ""

echo "=== 11. Riepilogo finale ==="
print_success "Tutti i controlli completati!"
echo ""
echo "🎯 Pronto per il deploy su:"
echo "   • Vercel: vercel --prod"
echo "   • Netlify: netlify deploy --prod"
echo "   • GitHub Pages: git push origin main"
echo ""
echo "📋 Checklist finale manuale:"
echo "   ☐ Verifica URL di produzione"
echo "   ☐ Testa le funzionalità principali"
echo "   ☐ Controlla responsive design"
echo "   ☐ Verifica che Stripe/Supabase funzionino"
echo ""

exit 0
