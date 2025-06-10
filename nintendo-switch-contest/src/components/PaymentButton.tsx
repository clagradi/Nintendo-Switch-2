import { useState } from 'react'
import { 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Box, 
  IconButton,
  Divider,
  CircularProgress,
  TextField,
  Alert
} from '@mui/material'
import { 
  CreditCard, 
  Add, 
  Remove 
} from '@mui/icons-material'
import { stripeService, priceHelpers } from '../services/stripe'
import { saveParticipant, generateTicketNumber } from '../services/supabase'

interface PaymentButtonProps {
  onPayment?: (tickets: { number: number; purchased: Date; paymentId: string }[]) => void
}

const PaymentButton = ({ onPayment }: PaymentButtonProps) => {
  const [ticketCount, setTicketCount] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [twitterHandle, setTwitterHandle] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [error, setError] = useState('')
  
  const totalPrice = priceHelpers.calculateTotal(ticketCount)
  
  // Controlla se tutti i campi sono compilati
  const isFormValid = firstName.trim() && lastName.trim() && twitterHandle.trim() && userEmail.trim()

  const handlePayment = async () => {
    if (!isFormValid) {
      setError('Please fill in all fields')
      return
    }

    setIsLoading(true)
    setError('')
    
    try {
      const fullName = `${firstName} ${lastName}`
      
      // Simula pagamento Stripe
      const paymentResult = await stripeService.initiatePayment({
        amount: totalPrice,
        ticketCount,
        userEmail,
        userName: fullName
      })

      if (!paymentResult.success) {
        throw new Error(paymentResult.error || 'Payment failed')
      }

      // Genera numero biglietto unico
      const ticketNumber = generateTicketNumber()

      // Salva nel database Supabase
      const dbResult = await saveParticipant({
        nome: firstName,
        cognome: lastName,
        email: userEmail,
        numero_biglietto: ticketNumber,
        importo: totalPrice
      })

      if (!dbResult.success) {
        throw new Error(dbResult.error || 'Failed to save participant data')
      }

      // Genera i biglietti per la UI locale
      const newTickets = Array.from({ length: ticketCount }, (_, index) => ({
        number: parseInt(ticketNumber.replace('NS-', '')) + index,
        purchased: new Date(),
        paymentId: paymentResult.paymentId || ''
      }))

      alert(`🎉 Payment completed!\n\nName: ${fullName}\nEmail: ${userEmail}\n\nTicket Number: ${ticketNumber}\nAmount: ${priceHelpers.formatPrice(totalPrice)}\n\nThank you for participating!`)
      
      if (onPayment) {
        onPayment(newTickets)
      }

      // Reset form
      setFirstName('')
      setLastName('')
      setTwitterHandle('')
      setUserEmail('')
      setTicketCount(1)
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Payment error. Please try again later.'
      setError(errorMessage)
      console.error('Payment error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const incrementTickets = () => {
    setTicketCount(prev => Math.min(prev + 1, 10)) // Massimo 10 biglietti per volta
  }

  const decrementTickets = () => {
    setTicketCount(prev => Math.max(prev - 1, 1))
  }

  return (
    <Card className="payment-card">
      <CardContent sx={{ p: { xs: 1.5, sm: 2, md: 2.5 } }}>
        <Typography 
          variant="h4" 
          component="h3" 
          align="center" 
          gutterBottom
          className="payment-title"
        >
          💳 Buy Tickets
        </Typography>

        {/* Error Alert */}
        {error && (
          <Alert severity="error" sx={{ mb: { xs: 1.5, sm: 2 } }}>
            {error}
          </Alert>
        )}

        {/* User Info Form */}
        <Box sx={{ mb: { xs: 1.5, sm: 2 } }}>
          <Typography 
            variant="subtitle1" 
            className="payment-section-title"
          >
            Your Information
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
            <TextField
              fullWidth
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              variant="outlined"
              required
              className="payment-input-field"
            />
            <TextField
              fullWidth
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              variant="outlined"
              required
              className="payment-input-field"
            />
          </Box>
          
          <TextField
            fullWidth
            label="X Handle (without @)"
            value={twitterHandle}
            onChange={(e) => setTwitterHandle(e.target.value.replace('@', ''))}
            variant="outlined"
            placeholder="username"
            sx={{ mb: 1 }}
            required
            className="payment-input-field"
          />
          
          <TextField
            fullWidth
            label="Your Email"
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            variant="outlined"
            required
            sx={{ mb: 1 }}
            className="payment-input-field"
          />
        </Box>
        
        {/* Quantity selector */}
        <Box className="payment-quantity-selector">
          <Typography 
            variant="subtitle1" 
            className="payment-section-title"
            sx={{ mb: 0.25 }}
          >
            Number of tickets
          </Typography>
          <Box className="payment-quantity-controls" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: { xs: 1, sm: 1.5 } }}>
            <IconButton
              onClick={decrementTickets}
              disabled={ticketCount <= 1}
              className="payment-quantity-button payment-quantity-button-override"
              sx={{
                width: { xs: 36, sm: 44 },
                height: { xs: 36, sm: 44 }
              }}
            >
              <Remove sx={{ fontSize: { xs: 18, sm: 22 } }} />
            </IconButton>
            
            <Box className="payment-quantity-display">
              <Typography 
                variant="h4" 
                className="payment-quantity-number"
              >
                {ticketCount}
              </Typography>
            </Box>
            
            <IconButton
              onClick={incrementTickets}
              disabled={ticketCount >= 10}
              className="payment-quantity-button payment-quantity-button-override"
              sx={{
                width: { xs: 36, sm: 44 },
                height: { xs: 36, sm: 44 }
              }}
            >
              <Add sx={{ fontSize: { xs: 18, sm: 22 } }} />
            </IconButton>
          </Box>
        </Box>

        {/* Price summary */}
        <Box className="payment-summary payment-summary-override" sx={{ mb: { xs: 2, sm: 2.5 }, p: { xs: 1.5, sm: 2 } }}>
          <Box className="payment-summary-row">
            <Typography 
              color="text.secondary"
              sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
            >
              Price per ticket:
            </Typography>
            <Typography 
              sx={{ 
                fontWeight: 600,
                fontSize: { xs: '0.875rem', sm: '1rem' }
              }}
            >
              {priceHelpers.formatPrice(priceHelpers.TICKET_PRICE)}
            </Typography>
          </Box>
          <Box className="payment-summary-row">
            <Typography 
              color="text.secondary"
              sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
            >
              Quantity:
            </Typography>
            <Typography 
              sx={{ 
                fontWeight: 600,
                fontSize: { xs: '0.875rem', sm: '1rem' }
              }}
            >
              {ticketCount}
            </Typography>
          </Box>
          <Divider sx={{ my: 0.5 }} />
          <Box className="payment-summary-total">
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 'bold',
                fontSize: { xs: '1.1rem', sm: '1.25rem' }
              }}
            >
              Total:
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 'bold', 
                color: '#8B7DB8',
                fontSize: { xs: '1.3rem', sm: '1.5rem' }
              }}
            >
              {priceHelpers.formatPrice(totalPrice)}
            </Typography>
          </Box>
        </Box>

        {/* Payment button */}
        <Button
          onClick={handlePayment}
          disabled={isLoading || !isFormValid}
          fullWidth
          variant="contained"
          size="large"
          className="payment-button payment-button-override"
          sx={{
            py: { xs: 1.5, sm: 2 },
            fontSize: { xs: '1rem', sm: '1.125rem' },
            fontWeight: 'bold'
          }}
        >
          {isLoading ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CircularProgress size={20} sx={{ color: 'white' }} />
              <Typography sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                Processing...
              </Typography>
            </Box>
          ) : !isFormValid ? (
            <Typography sx={{ fontSize: { xs: '1rem', sm: '1.125rem' }, fontWeight: 'bold' }}>
              Fill all fields to continue
            </Typography>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CreditCard sx={{ fontSize: { xs: 20, sm: 24 } }} />
              <Typography sx={{ fontSize: { xs: '1rem', sm: '1.125rem' }, fontWeight: 'bold' }}>
                Pay {priceHelpers.formatPrice(totalPrice)}
              </Typography>
            </Box>
          )}
        </Button>

        {/* Additional info */}
        <Box className="payment-info">
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
          >
            🔒 Secure payment • 🎲 Numbers assigned automatically
          </Typography>
          <Typography 
            variant="caption" 
            color="text.secondary" 
            className="payment-tip"
          >
            More tickets = higher chances to win!
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default PaymentButton