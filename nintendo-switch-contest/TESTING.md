# Test Guide for Nintendo Switch Contest

## 🧪 Manual Testing Checklist

### Frontend Tests

#### 1. HomePage Tests
- [ ] Page loads correctly with Nintendo theme
- [ ] Payment form displays all required fields
- [ ] Form validation works (try submitting empty fields)
- [ ] Ticket quantity selector works (1-10 range)
- [ ] Price calculation updates correctly
- [ ] Responsive design works on mobile/tablet

#### 2. Payment Flow Tests
- [ ] Invalid email shows error message
- [ ] Invalid names show error messages  
- [ ] Invalid Twitter handle shows error
- [ ] Valid form enables payment button
- [ ] Payment button redirects to Stripe Checkout

#### 3. Navigation Tests
- [ ] Navbar links work correctly
- [ ] About page loads and displays info
- [ ] Success page displays after payment
- [ ] Cancel page displays when payment cancelled

### Backend API Tests

#### 1. Create Checkout Session
```bash
curl -X POST http://localhost:3000/api/create-checkout-session \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 1000,
    "userEmail": "test@example.com", 
    "userName": "Test User",
    "ticketCount": 1
  }'
```

Expected: Returns `{ "url": "https://checkout.stripe.com/..." }`

#### 2. Payment Status (requires session_id from Stripe)
```bash
curl "http://localhost:3000/api/payment-status?session_id=cs_test_..."
```

Expected: Returns payment status object

#### 3. Webhook Test
```bash
curl -X POST http://localhost:3000/api/webhook \
  -H "Content-Type: application/json" \
  -H "Stripe-Signature: test" \
  -d '{"type": "test.event"}'
```

Expected: Returns 400 (invalid signature) or processes event

### Stripe Integration Tests

#### Test Cards
- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **Incomplete**: `4000 0000 0000 9995`

#### Test Flow
1. Fill form with test data
2. Use test card number
3. Complete Stripe checkout
4. Verify redirect to success page
5. Check Supabase for saved data

### Database Tests

#### Supabase Connection
1. Check environment variables are set
2. Verify table structure exists
3. Test insert/update operations
4. Check webhook updates work

### Error Handling Tests

#### Network Errors
- [ ] Offline behavior
- [ ] API timeout handling
- [ ] Stripe connection issues

#### Validation Errors  
- [ ] Client-side validation works
- [ ] Server-side validation works
- [ ] Error messages are user-friendly

#### Edge Cases
- [ ] Duplicate email handling
- [ ] Rate limiting works
- [ ] Large ticket quantities
- [ ] Special characters in names

### Performance Tests

#### Load Times
- [ ] Initial page load < 3 seconds
- [ ] Payment form interaction is smooth
- [ ] API responses < 2 seconds

#### Mobile Performance
- [ ] Touch interactions work
- [ ] Scrolling is smooth
- [ ] Forms are usable on small screens

### Security Tests

#### CORS
- [ ] Only allowed origins can access APIs
- [ ] Preflight requests work correctly

#### Input Sanitization
- [ ] XSS attempts are blocked
- [ ] SQL injection is prevented
- [ ] Webhook signature verification works

#### Environment Variables
- [ ] No secrets exposed in frontend
- [ ] All required env vars are set
- [ ] Test vs production keys are separate

## 🚀 Production Readiness Checklist

### Deployment
- [ ] Vercel deployment works
- [ ] Environment variables configured
- [ ] Custom domain configured (if needed)
- [ ] SSL certificate active

### Monitoring
- [ ] Stripe webhook events are processing
- [ ] Vercel function logs are clean
- [ ] Database connections are stable
- [ ] Error tracking is working

### Documentation
- [ ] README.md is complete
- [ ] API documentation exists
- [ ] Environment setup guide works
- [ ] Troubleshooting guide helps

### Legal/Compliance
- [ ] Privacy policy (if required)
- [ ] Terms of service (if required)
- [ ] GDPR compliance (if applicable)
- [ ] Contest rules are clear

## 🐛 Common Issues & Solutions

### Payment Fails
1. Check Stripe keys are correct
2. Verify webhook endpoint is accessible
3. Check Supabase connection
4. Review Vercel function logs

### Form Validation Issues
1. Check validation functions
2. Verify error messages display
3. Test edge cases thoroughly

### Database Errors
1. Verify table schema matches code
2. Check service role key permissions
3. Test connection in Supabase dashboard

### Deployment Issues
1. Check all environment variables
2. Verify build process completes
3. Test production URL endpoints
4. Check Vercel function status
