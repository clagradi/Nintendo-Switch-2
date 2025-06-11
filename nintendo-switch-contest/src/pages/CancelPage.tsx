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
            Payment Cancelled
          </Typography>
          <Typography variant="h6" color="text.secondary">
            The payment has been cancelled. No charges have been made.
          </Typography>
        </Box>

        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body1">
            Don't worry! Your payment has been cancelled and no charges have been made 
            to your credit card or bank account.
          </Typography>
        </Alert>

        <Box sx={{ mb: 4, p: 3, bgcolor: 'grey.50', borderRadius: 1 }}>
          <Typography variant="h6" gutterBottom>
            What you can do now:
          </Typography>
          <Typography variant="body1" component="div">
            <ul style={{ paddingLeft: '1.5rem', margin: 0 }}>
              <li>Try the payment again if you changed your mind</li>
              <li>Check your card details if you encountered issues</li>
              <li>Contact us if you need assistance</li>
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
            Back to Home
          </Button>
          
          <Button 
            component={Link} 
            to="/" 
            variant="outlined" 
            size="large"
            startIcon={<Refresh />}
          >
            Try Payment Again
          </Button>
        </Box>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            If you continue to have payment issues, you can contact us via email 
            to receive personalized assistance.
          </Typography>
        </Box>
      </Paper>
    </Container>
  )
}

export default CancelPage