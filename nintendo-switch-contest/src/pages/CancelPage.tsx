import { Link } from 'react-router-dom'
import { 
  Container, 
  Paper, 
  Typography, 
  Box, 
  Button,
  Alert
} from '@mui/material'
import { Cancel, Home, Refresh } from '@mui/icons-material'

const CancelPage = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Box textAlign="center" mb={4}>
          <Cancel sx={{ fontSize: 80, color: 'warning.main', mb: 2 }} />
          <Typography variant="h3" component="h1" gutterBottom color="warning.main">
            Pagamento Annullato
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Il pagamento è stato annullato. Nessun addebito è stato effettuato.
          </Typography>
        </Box>

        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body1">
            Non preoccuparti! Il tuo pagamento è stato annullato e non è stato effettuato alcun addebito 
            sulla tua carta di credito o conto bancario.
          </Typography>
        </Alert>

        <Box sx={{ mb: 4, p: 3, bgcolor: 'grey.50', borderRadius: 1 }}>
          <Typography variant="h6" gutterBottom>
            Cosa puoi fare ora:
          </Typography>
          <Typography variant="body1" component="div">
            <ul style={{ paddingLeft: '1.5rem', margin: 0 }}>
              <li>Riprova il pagamento se hai cambiato idea</li>
              <li>Controlla i dettagli della tua carta se hai riscontrato problemi</li>
              <li>Contattaci se hai bisogno di assistenza</li>
            </ul>
          </Typography>
        </Box>

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
            component={Link} 
            to="/" 
            variant="outlined" 
            size="large"
            startIcon={<Refresh />}
          >
            Riprova il Pagamento
          </Button>
        </Box>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Se continui ad avere problemi con il pagamento, puoi contattarci via email 
            per ricevere assistenza personalizzata.
          </Typography>
        </Box>
      </Paper>
    </Container>
  )
}

export default CancelPage