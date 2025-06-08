import { useState } from 'react'
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Chip,
  useTheme
} from '@mui/material'
import {
  SportsEsports,
  Star,
  CardGiftcard,
  FlashOn
} from '@mui/icons-material'
import ContestStats from '../components/ContestStats'
import PaymentButton from '../components/PaymentButton'

const HomePage = () => {
  const theme = useTheme()
  const [userTickets, setUserTickets] = useState<{ number: number; purchased: Date }[]>([])

  const handlePayment = (tickets: number) => {
    // Genera numeri di biglietto casuali
    const newTickets = Array.from({ length: tickets }, () => ({
      number: Math.floor(Math.random() * 10000) + 1000,
      purchased: new Date()
    }))
    
    setUserTickets(prev => [...prev, ...newTickets])
  }

  const features = [
    {
      icon: Star,
      title: 'Console OLED',
      subtitle: 'Ultima versione',
      color: theme.palette.success.main,
      bgcolor: theme.palette.success.light + '20'
    },
    {
      icon: CardGiftcard,
      title: 'Nuova di Zecca',
      subtitle: 'Mai utilizzata',
      color: theme.palette.info.main,
      bgcolor: theme.palette.info.light + '20'
    },
    {
      icon: FlashOn,
      title: 'Solo 10€',
      subtitle: 'Per biglietto',
      color: theme.palette.secondary.main,
      bgcolor: theme.palette.secondary.light + '20'
    },
    {
      icon: SportsEsports,
      title: 'Estrazione Fair',
      subtitle: '100% casuale',
      color: theme.palette.warning.main,
      bgcolor: theme.palette.warning.light + '20'
    }
  ]

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
        pb: 4
      }}
    >
      <Container maxWidth="lg" sx={{ py: 4 }}>
        
        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Box sx={{ mb: 4 }}>
            <Typography 
              variant="h1" 
              sx={{ 
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 'bold',
                color: 'text.primary',
                mb: 2
              }}
            >
              🎮 <Box component="span" sx={{ color: theme.palette.primary.main }}>Nintendo Switch</Box> Contest
            </Typography>
            <Typography variant="h5" color="text.secondary" sx={{ mb: 3 }}>
              Vinci una Nintendo Switch OLED nuova di zecca!
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
              ⚡ Contest attivo - Partecipa ora per avere più possibilità!
            </Typography>
            <Box
              sx={{
                width: 128,
                height: 4,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.info.main})`,
                mx: 'auto',
                borderRadius: 2
              }}
            />
          </Box>
          
          {/* Immagine Nintendo Switch */}
          <Box sx={{ mb: 6, display: 'flex', justifyContent: 'center' }}>
            <Card sx={{ borderRadius: 3, boxShadow: 6, p: 4 }}>
              <Box
                component="img"
                src="/Images/switch.jpg"
                alt="Nintendo Switch OLED"
                sx={{
                  width: { xs: 300, md: 400 },
                  height: 'auto',
                  borderRadius: 2,
                  display: 'block'
                }}
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  e.currentTarget.style.display = 'none'
                  const nextElement = e.currentTarget.nextElementSibling as HTMLElement
                  if (nextElement) {
                    nextElement.style.setProperty('display', 'flex')
                  }
                }}
              />
              <Box
                sx={{
                  display: 'none',
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.info.main})`,
                  width: { xs: 300, md: 400 },
                  height: 250,
                  borderRadius: 2,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <SportsEsports sx={{ fontSize: 96, color: 'white' }} />
              </Box>
            </Card>
          </Box>
        </Box>

        {/* Introduzione */}
        <Card sx={{ borderRadius: 3, boxShadow: 4, mb: 6 }}>
          <CardContent sx={{ p: 5 }}>
            <Box sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto' }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
                🎲 Entra a far parte di questo Raffle!
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ lineHeight: 1.7, mb: 3 }}>
                Ciao! Benvenuto nel contest più entusiasmante per vincere una Nintendo Switch OLED! 
                <Box component="strong" sx={{ color: theme.palette.primary.main }}> Pagando solo 10€ </Box> 
                riceverai un numero univoco che ti darà la possibilità di vincere questa fantastica console.
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ lineHeight: 1.7, mb: 4 }}>
                💡 <strong>Suggerimento:</strong> Puoi acquistare più biglietti per aumentare le tue probabilità di vincita! 
                Ogni biglietto ti assegna un nuovo numero nel sorteggio.
              </Typography>
              
              {/* Caratteristiche */}
              <Grid container spacing={3} sx={{ mb: 4 }}>
                {features.map((feature, index) => {
                  const IconComponent = feature.icon
                  return (
                    <Grid size={{ xs: 6, md: 3 }} key={index}>
                      <Box
                        sx={{
                          backgroundColor: feature.bgcolor,
                          p: 3,
                          borderRadius: 2,
                          textAlign: 'center',
                          transition: 'transform 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-4px)'
                          }
                        }}
                      >
                        <IconComponent sx={{ fontSize: 32, color: feature.color, mb: 1 }} />
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: feature.color }}>
                          {feature.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {feature.subtitle}
                        </Typography>
                      </Box>
                    </Grid>
                  )
                })}
              </Grid>
            </Box>
          </CardContent>
        </Card>

        {/* Statistiche Contest */}
        <ContestStats />

        <Grid container spacing={4}>
          {/* Sezione Pagamento */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <PaymentButton onPayment={handlePayment} />
          </Grid>

          {/* I Tuoi Biglietti */}
          {userTickets.length > 0 && (
            <Grid size={{ xs: 12, lg: 6 }}>
              <Card sx={{ borderRadius: 3, boxShadow: 4, height: 'fit-content' }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                    🎫 I Tuoi Biglietti
                  </Typography>
                  <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
                    {userTickets.map((ticket, index) => (
                      <Card 
                        key={index}
                        sx={{
                          mb: 2,
                          background: `linear-gradient(135deg, ${theme.palette.success.light}20, ${theme.palette.success.light}10)`,
                          border: `1px solid ${theme.palette.success.light}`
                        }}
                      >
                        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box>
                              <Typography variant="h6" sx={{ fontWeight: 'bold', color: theme.palette.success.dark }}>
                                Biglietto #{ticket.number}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Acquistato: {ticket.purchased.toLocaleString('it-IT')}
                              </Typography>
                            </Box>
                            <Chip
                              label="Attivo"
                              size="small"
                              sx={{
                                backgroundColor: theme.palette.success.light,
                                color: theme.palette.success.dark,
                                fontWeight: 'bold'
                              }}
                            />
                          </Box>
                        </CardContent>
                      </Card>
                    ))}
                  </Box>
                  <Box sx={{ mt: 3, textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      Totale biglietti: <strong>{userTickets.length}</strong> | 
                      Investimento: <strong>€{userTickets.length * 10}</strong>
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>

        {/* Call to Action finale */}
        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Card
            sx={{
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              color: 'white',
              borderRadius: 3,
              boxShadow: 4
            }}
          >
            <CardContent sx={{ p: 5 }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
                🔥 Non perdere questa opportunità!
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9, mb: 2 }}>
                Il contest termina presto e i posti sono limitati!
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.75 }}>
                Segui gli aggiornamenti nella sezione "Chi sono" per non perdere l'estrazione!
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  )
}

export default HomePage