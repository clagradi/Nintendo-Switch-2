import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { 
  Container, 
  Paper, 
  Typography, 
  Box, 
  Button, 
  CircularProgress,
  Alert,
  Chip
} from '@mui/material'
import { CheckCircle, Home, Receipt } from '@mui/icons-material'

interface PaymentStatus {
  id: string
  payment_status: string
  customer_email: string
  amount_total: number
  currency: string
  created: number
}

const SuccessPage = () => {
  const [searchParams] = useSearchParams()
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const sessionId = searchParams.get('session_id')

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      if (!sessionId) {
        setError('Session ID non trovato')
        setLoading(false)
        return
      }

      try {
        const response = await fetch(`/api/payment-status?session_id=${sessionId}`)
        
        if (!response.ok) {
          throw new Error('Errore nel recupero dello stato del pagamento')
        }

        const data = await response.json()
        setPaymentStatus(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Errore sconosciuto')
      } finally {
        setLoading(false)
      }
    }

    fetchPaymentStatus()
  }, [sessionId])

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <CircularProgress size={60} />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Verifica del pagamento in corso...
          </Typography>
        </Paper>
      </Container>
    )
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper sx={{ p: 4 }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
          <Button 
            component={Link} 
            to="/" 
            variant="contained" 
            startIcon={<Home />}
          >
            Torna alla Home
          </Button>
        </Paper>
      </Container>
    )
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Box textAlign="center" mb={4}>
          <CheckCircle sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
          <Typography variant="h3" component="h1" gutterBottom color="success.main">
            Pagamento Completato!
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Grazie per aver partecipato al concorso Nintendo Switch!
          </Typography>
        </Box>

        {paymentStatus && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom>
              Dettagli del Pagamento
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body1">Stato:</Typography>
                <Chip 
                  label={paymentStatus.payment_status === 'paid' ? 'Pagato' : paymentStatus.payment_status}
                  color={paymentStatus.payment_status === 'paid' ? 'success' : 'default'}
                />
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body1">Email:</Typography>
                <Typography variant="body1" fontWeight="medium">
                  {paymentStatus.customer_email}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body1">Importo:</Typography>
                <Typography variant="body1" fontWeight="medium">
                  €{(paymentStatus.amount_total / 100).toFixed(2)}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body1">Data:</Typography>
                <Typography variant="body1" fontWeight="medium">
                  {new Date(paymentStatus.created * 1000).toLocaleString('it-IT')}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body1">ID Transazione:</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
                  {paymentStatus.id}
                </Typography>
              </Box>
            </Box>
          </Box>
        )}

        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2">
            <strong>Importante:</strong> Conserva questa pagina come ricevuta del tuo pagamento. 
            Riceverai una email di conferma all'indirizzo fornito durante il checkout.
          </Typography>
        </Alert>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button 
            component={Link} 
            to="/" 
            variant="contained" 
            size="large"
            startIcon={<Home />}
          >
            Torna alla Home
          </Button>
          
          <Button 
            variant="outlined" 
            size="large"
            startIcon={<Receipt />}
            onClick={() => window.print()}
          >
            Stampa Ricevuta
          </Button>
        </Box>

        <Box sx={{ mt: 4, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
          <Typography variant="body2" color="text.secondary" textAlign="center">
            Il tuo numero di biglietto sarà generato automaticamente e ti verrà comunicato via email. 
            L'estrazione avrà luogo il 31 dicembre 2025.
          </Typography>
        </Box>
      </Paper>
    </Container>
  )
}

export default SuccessPage