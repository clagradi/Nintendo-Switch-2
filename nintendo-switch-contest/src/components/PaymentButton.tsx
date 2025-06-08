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
  useTheme
} from '@mui/material'
import { 
  CreditCard, 
  Add, 
  Remove 
} from '@mui/icons-material'

interface PaymentButtonProps {
  onPayment?: (tickets: number) => void
}

const PaymentButton = ({ onPayment }: PaymentButtonProps) => {
  const theme = useTheme()
  const [ticketCount, setTicketCount] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  
  const TICKET_PRICE = 10
  const totalPrice = ticketCount * TICKET_PRICE

  const handlePayment = async () => {
    setIsLoading(true)
    
    // Simula il processo di pagamento
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Genera un numero di biglietto casuale
      const ticketNumbers = Array.from({ length: ticketCount }, () => 
        Math.floor(Math.random() * 10000) + 1000
      )
      
      alert(`🎉 Pagamento completato!\n\nBiglietti acquistati: ${ticketCount}\nNumeri assegnati: ${ticketNumbers.join(', ')}\nTotale: €${totalPrice}\n\nGrazie per aver partecipato al contest!`)
      
      if (onPayment) {
        onPayment(ticketCount)
      }
      
    } catch {
      alert('❌ Errore nel pagamento. Riprova più tardi.')
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
      <CardContent sx={{ p: 4 }}>
        <Typography 
          variant="h4" 
          component="h3" 
          align="center" 
          gutterBottom
          sx={{ 
            fontWeight: 'bold',
            color: 'text.primary',
            mb: 4
          }}
        >
          💳 Acquista Biglietti
        </Typography>
        
        {/* Selettore quantità */}
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="subtitle1" 
            sx={{ 
              fontWeight: 600, 
              color: 'text.primary',
              mb: 2,
              textAlign: 'center'
            }}
          >
            Numero di biglietti
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
            <IconButton
              onClick={decrementTickets}
              disabled={ticketCount <= 1}
              sx={{
                backgroundColor: 'grey.200',
                '&:hover': { backgroundColor: 'grey.300' },
                '&:disabled': { opacity: 0.5 }
              }}
            >
              <Remove />
            </IconButton>
            
            <Box
              sx={{
                backgroundColor: 'grey.100',
                px: 4,
                py: 2,
                borderRadius: 2,
                minWidth: 80,
                textAlign: 'center'
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                {ticketCount}
              </Typography>
            </Box>
            
            <IconButton
              onClick={incrementTickets}
              disabled={ticketCount >= 10}
              sx={{
                backgroundColor: 'grey.200',
                '&:hover': { backgroundColor: 'grey.300' },
                '&:disabled': { opacity: 0.5 }
              }}
            >
              <Add />
            </IconButton>
          </Box>
        </Box>

        {/* Riepilogo prezzo */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
            borderRadius: 2,
            p: 3,
            mb: 4
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography color="text.secondary">Prezzo per biglietto:</Typography>
            <Typography sx={{ fontWeight: 600 }}>€{TICKET_PRICE}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography color="text.secondary">Quantità:</Typography>
            <Typography sx={{ fontWeight: 600 }}>{ticketCount}</Typography>
          </Box>
          <Divider sx={{ my: 1 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Totale:</Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 'bold', 
                color: theme.palette.primary.main 
              }}
            >
              €{totalPrice}
            </Typography>
          </Box>
        </Box>

        {/* Pulsante di pagamento */}
        <Button
          onClick={handlePayment}
          disabled={isLoading}
          fullWidth
          variant="contained"
          size="large"
          sx={{
            py: 2,
            fontSize: '1.125rem',
            fontWeight: 'bold',
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
            boxShadow: 3,
            '&:hover': {
              background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
              boxShadow: 4,
              transform: 'translateY(-2px)'
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
              Elaborando...
            </Box>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CreditCard />
              Paga €{totalPrice}
            </Box>
          )}
        </Button>

        {/* Informazioni aggiuntive */}
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            🔒 Pagamento sicuro • 🎲 Numeri assegnati automaticamente
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            Più biglietti = maggiori probabilità di vincita!
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default PaymentButton