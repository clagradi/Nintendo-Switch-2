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
  useTheme,
  TextField,
  Alert
} from '@mui/material'
import { 
  CreditCard, 
  Add, 
  Remove 
} from '@mui/icons-material'
import { stripeService, priceHelpers } from '../services/stripe'
import { dbOperations } from '../services/database'

interface PaymentButtonProps {
  onPayment?: (tickets: { number: number; purchased: Date; paymentId: string }[]) => void
}

const PaymentButton = ({ onPayment }: PaymentButtonProps) => {
  const theme = useTheme()
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
      
      // Inizia il pagamento con Stripe
      const paymentResult = await stripeService.initiatePayment({
        amount: totalPrice,
        ticketCount,
        userEmail,
        userName: fullName
      })

      if (!paymentResult.success) {
        throw new Error(paymentResult.error || 'Payment failed')
      }

      // Genera i biglietti
      const newTickets = Array.from({ length: ticketCount }, () => ({
        number: dbOperations.generateTicketNumber(),
        purchased: new Date(),
        paymentId: paymentResult.paymentId || ''
      }))

      // Salva nel database (in un'app reale)
      // for (const ticket of newTickets) {
      //   await dbOperations.addTicket({
      //     ticketNumber: ticket.number,
      //     userId: dbOperations.generateUserId(),
      //     userEmail,
      //     userName: fullName,
      //     twitterHandle,
      //     paymentId: ticket.paymentId,
      //     isActive: true
      //   })
      // }

      alert(`🎉 Payment completed!\n\nName: ${fullName}\nTwitter: @${twitterHandle}\nEmail: ${userEmail}\n\nTickets: ${ticketCount}\nNumbers: ${newTickets.map(t => t.number).join(', ')}\nTotal: ${priceHelpers.formatPrice(totalPrice)}\n\nThank you!`)
      
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
    <Card 
      sx={{ 
        borderRadius: 3, 
        boxShadow: 4,
        background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
        <Typography 
          variant="h4" 
          component="h3" 
          align="center" 
          gutterBottom
          sx={{ 
            fontWeight: 'bold',
            color: 'text.primary',
            mb: { xs: 3, sm: 4 },
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' }
          }}
        >
          💳 Buy Tickets
        </Typography>

        {/* Error Alert */}
        {error && (
          <Alert severity="error" sx={{ mb: { xs: 2, sm: 3 } }}>
            {error}
          </Alert>
        )}

        {/* User Info Form */}
        <Box sx={{ mb: { xs: 3, sm: 4 } }}>
          <Typography 
            variant="subtitle1" 
            sx={{ 
              fontWeight: 600, 
              color: 'text.primary',
              mb: 2,
              textAlign: 'center',
              fontSize: { xs: '1rem', sm: '1.1rem' }
            }}
          >
            Your Information
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <TextField
              fullWidth
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              variant="outlined"
              required
            />
            <TextField
              fullWidth
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              variant="outlined"
              required
            />
          </Box>
          
          <TextField
            fullWidth
            label="Twitter Handle (without @)"
            value={twitterHandle}
            onChange={(e) => setTwitterHandle(e.target.value.replace('@', ''))}
            variant="outlined"
            placeholder="username"
            sx={{ mb: 2 }}
            required
          />
          
          <TextField
            fullWidth
            label="Your Email"
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            variant="outlined"
            required
          />
        </Box>
        
        {/* Quantity selector */}
        <Box sx={{ mb: { xs: 3, sm: 4 } }}>
          <Typography 
            variant="subtitle1" 
            sx={{ 
              fontWeight: 600, 
              color: 'text.primary',
              mb: 2,
              textAlign: 'center',
              fontSize: { xs: '1rem', sm: '1.1rem' }
            }}
          >
            Number of tickets
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: { xs: 1, sm: 2 } }}>
            <IconButton
              onClick={decrementTickets}
              disabled={ticketCount <= 1}
              sx={{
                backgroundColor: 'grey.200',
                '&:hover': { backgroundColor: 'grey.300' },
                '&:disabled': { opacity: 0.5 },
                width: { xs: 40, sm: 48 },
                height: { xs: 40, sm: 48 }
              }}
            >
              <Remove sx={{ fontSize: { xs: 20, sm: 24 } }} />
            </IconButton>
            
            <Box
              sx={{
                backgroundColor: 'grey.100',
                px: { xs: 2, sm: 4 },
                py: { xs: 1, sm: 2 },
                borderRadius: 2,
                minWidth: { xs: 60, sm: 80 },
                textAlign: 'center'
              }}
            >
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 'bold', 
                  color: 'text.primary',
                  fontSize: { xs: '1.5rem', sm: '2.125rem' }
                }}
              >
                {ticketCount}
              </Typography>
            </Box>
            
            <IconButton
              onClick={incrementTickets}
              disabled={ticketCount >= 10}
              sx={{
                backgroundColor: 'grey.200',
                '&:hover': { backgroundColor: 'grey.300' },
                '&:disabled': { opacity: 0.5 },
                width: { xs: 40, sm: 48 },
                height: { xs: 40, sm: 48 }
              }}
            >
              <Add sx={{ fontSize: { xs: 20, sm: 24 } }} />
            </IconButton>
          </Box>
        </Box>

        {/* Price summary */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
            borderRadius: 2,
            p: { xs: 2, sm: 3 },
            mb: { xs: 3, sm: 4 }
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
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
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
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
          <Divider sx={{ my: 1 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
                color: theme.palette.primary.main,
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
          sx={{
            py: { xs: 1.5, sm: 2 },
            fontSize: { xs: '1rem', sm: '1.125rem' },
            fontWeight: 'bold',
            background: !isFormValid 
              ? 'grey.400' 
              : `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
            boxShadow: 3,
            '&:hover': {
              background: !isFormValid 
                ? 'grey.400'
                : `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
              boxShadow: 4,
              transform: !isFormValid ? 'none' : 'translateY(-2px)'
            },
            '&:disabled': {
              opacity: 0.6
            },
            transition: 'all 0.3s ease'
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
        <Box sx={{ mt: { xs: 2, sm: 3 }, textAlign: 'center' }}>
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
            sx={{ 
              mt: 1, 
              display: 'block',
              fontSize: { xs: '0.7rem', sm: '0.75rem' }
            }}
          >
            More tickets = higher chances to win!
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default PaymentButton