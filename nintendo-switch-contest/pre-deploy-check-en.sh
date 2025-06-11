#!/bin/bash
# Pre-deploy check script for Nintendo Switch Contest

echo "🚀 === PRE-DEPLOY CHECK ==="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print errors
print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Function to print successes
print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

# Function to print warnings
print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

echo "=== 1. Check sensitive files in repo ==="

files_to_check=(".env" ".env.local" ".env.production" "node_modules" "dist" "build" ".DS_Store")
found_files=()

for file in "${files_to_check[@]}"; do
    if [[ -e "$file" ]]; then
        found_files+=("$file")
    fi
done

if [[ ${#found_files[@]} -gt 0 ]]; then
    print_error "Found sensitive files in repository: ${found_files[*]}"
    echo "Add them to .gitignore and remove from repository:"
    for file in "${found_files[@]}"; do
        echo "git rm --cached $file"
    done
    exit 1
fi

print_success "No sensitive files found in repository."
echo ""

echo "=== 2. Check .gitignore configuration ==="
gitignore_patterns=("node_modules" ".env" ".env.local" ".env.production" "dist" "build" ".DS_Store" "*.log")

if [[ -f ".gitignore" ]]; then
    missing_ignores=()
    for pattern in "${gitignore_patterns[@]}"; do
        if ! grep -q "$pattern" .gitignore; then
            missing_ignores+=("$pattern")
        fi
    done
    
    if [[ ${#missing_ignores[@]} -gt 0 ]]; then
        print_warning "These patterns are missing in .gitignore: ${missing_ignores[*]}"
    else
        print_success ".gitignore configured correctly."
    fi
fi
echo ""

echo "=== 3. Check uncommitted changes ==="
if [[ -n $(git status --porcelain) ]]; then
  print_error "There are uncommitted changes:"
  git status --short
  echo ""
  echo "Run: git add . && git commit -m 'Pre-deploy fixes'"
  exit 1
fi

print_success "No uncommitted changes."
echo ""

echo "=== 4. Check current branch ==="
current_branch=$(git rev-parse --abbrev-ref HEAD)
if [[ "$current_branch" != "main" && "$current_branch" != "master" ]]; then
    print_warning "You are on branch '$current_branch'. Make sure this is the correct one for deployment."
fi
echo ""

echo "=== 5. Check package.json ==="
if [[ ! -f "package.json" ]]; then
    print_error "package.json not found"
    exit 1
fi

# Check if type: "module" is present (causes issues with Vercel Functions)
if grep -q '"type".*"module"' package.json; then
    print_error "Found 'type': 'module' in package.json. This causes issues with Vercel Functions."
    echo "Remove or comment out this line for compatibility."
    exit 1
fi

print_success "package.json check passed."
echo ""

echo "=== 6. Check dependencies ==="
if [[ ! -d "node_modules" ]]; then
    print_warning "node_modules not found. Running npm install..."
    npm install
    if [[ $? -ne 0 ]]; then
        print_error "npm install failed"
        exit 1
    fi
fi

print_success "Dependencies OK."
echo ""

echo "=== 7. Environment variables check ==="

required_vars=("VITE_SUPABASE_URL" "VITE_SUPABASE_ANON_KEY" "VITE_STRIPE_PUBLISHABLE_KEY")
missing_vars=()

if [[ -f ".env" ]]; then
    for var in "${required_vars[@]}"; do
        if ! grep -q "^$var=" .env; then
            missing_vars+=("$var")
        fi
    done
    
    if [[ ${#missing_vars[@]} -gt 0 ]]; then
        print_error "Missing environment variables: ${missing_vars[*]}"
        echo "Add them to .env file"
        exit 1
    fi
    
    print_success "Local environment variables configured."
else
    print_warning ".env file not found. Make sure to configure environment variables on Vercel."
fi
echo ""

echo "=== 8. Production build test ==="
echo "Running production build..."

npm run build > build.log 2>&1

if [[ $? -eq 0 ]]; then
    print_success "Production build SUCCESSFUL"
    rm -f build.log
else
    print_error "Production build FAILED. Fix errors before deploying."
    echo ""
    echo "Build log:"
    cat build.log
    rm -f build.log
    exit 1
fi
echo ""

echo "=== 9. TypeScript check ==="
if npm run typecheck > /dev/null 2>&1; then
    print_success "TypeScript check passed"
else
    print_error "TypeScript errors found. Fix them before deploying."
    npm run typecheck
    exit 1
fi
echo ""

echo "=== 10. Final pre-deploy summary ==="
print_success "All checks passed! Ready for deployment."
echo ""
echo "Next steps:"
echo "   ☐ Deploy to Vercel: 'vercel --prod'"
echo "   ☐ Configure environment variables on Vercel"
echo "   ☐ Set up Stripe webhook endpoint"
echo "   ☐ Test main functionalities"
echo "   ☐ Check responsive design"
echo "   ☐ Verify that Stripe/Supabase work"
echo ""

exit 0
