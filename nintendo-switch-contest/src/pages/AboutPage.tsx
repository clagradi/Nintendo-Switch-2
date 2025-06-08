import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Avatar,
  useTheme
} from '@mui/material'
import { X, OpenInNew } from '@mui/icons-material'
import { Link } from 'react-router-dom'

const AboutPage = () => {
  const theme = useTheme()
  // Inserisci qui il tuo username Twitter
  const twitterUsername = "tuo_username" // Cambia questo con il tuo vero username Twitter

  const contestInfo = [
    {
      icon: '🎮',
      title: 'Premio',
      description: 'Nintendo Switch OLED modello più recente',
      color: theme.palette.success.main,
      bgcolor: theme.palette.success.light + '20'
    },
    {
      icon: '💰',
      title: 'Costo Biglietto',
      description: '10€ per biglietto, acquisti multipli permessi',
      color: theme.palette.info.main,
      bgcolor: theme.palette.info.light + '20'
    },
    {
      icon: '🎲',
      title: 'Estrazione',
      description: 'Casuale e trasparente in diretta',
      color: theme.palette.secondary.main,
      bgcolor: theme.palette.secondary.light + '20'
    },
    {
      icon: '📱',
      title: 'Aggiornamenti',
      description: 'Seguimi su Twitter per gli aggiornamenti',
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
      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
            Chi sono
          </Typography>
          <Box
            sx={{
              width: 96,
              height: 4,
              backgroundColor: theme.palette.primary.main,
              mx: 'auto',
              borderRadius: 2
            }}
          />
        </Box>

        {/* Profilo */}
        <Card sx={{ borderRadius: 3, boxShadow: 4, mb: 6 }}>
          <CardContent sx={{ p: 5 }}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              gap: 4
            }}>
              {/* Avatar */}
              <Avatar
                sx={{
                  width: 128,
                  height: 128,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.info.main})`,
                  fontSize: '3rem',
                  fontWeight: 'bold'
                }}
              >
                C
              </Avatar>

              {/* Informazioni */}
              <Box sx={{ 
                flex: 1, 
                textAlign: { xs: 'center', md: 'left' }
              }}>
                <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 3 }}>
                  Ciao! Sono Claudio
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ lineHeight: 1.7, mb: 3 }}>
                  Benvenuto nel mio contest per vincere una Nintendo Switch OLED! 
                  Sono un appassionato di gaming e tecnologia, e ho deciso di organizzare 
                  questo contest per condividere la mia passione con la community.
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ lineHeight: 1.7, mb: 4 }}>
                  Ogni biglietto costa solo 10€ e puoi acquistarne quanti ne vuoi per 
                  aumentare le tue probabilità di vincita. Il contest è completamente 
                  trasparente e il vincitore sarà estratto in modo casuale e pubblico.
                </Typography>

                {/* Link Twitter */}
                <Button
                  href={`https://twitter.com/${twitterUsername}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: '#1DA1F2',
                    color: 'white',
                    px: 3,
                    py: 1.5,
                    fontWeight: 'bold',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1,
                    '&:hover': {
                      backgroundColor: '#1a8cd8',
                      transform: 'translateY(-2px)',
                      boxShadow: 4
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  <X sx={{ fontSize: 20 }} />
                  Seguimi su Twitter
                  <OpenInNew sx={{ fontSize: 16 }} />
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Sezione Contest */}
        <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
          <CardContent sx={{ p: 5 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>
              Informazioni sul Contest
            </Typography>
            
            <Grid container spacing={3}>
              {contestInfo.map((info, index) => (
                <Grid size={{ xs: 12, md: 6 }} key={index}>
                  <Box
                    sx={{
                      backgroundColor: info.bgcolor,
                      p: 4,
                      borderRadius: 2,
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)'
                      }
                    }}
                  >
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 'bold', 
                        color: info.color,
                        mb: 1,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                      }}
                    >
                      {info.icon} {info.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {info.description}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Button
            component={Link}
            to="/"
            variant="contained"
            size="large"
            sx={{
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              color: 'white',
              px: 4,
              py: 2,
              fontSize: '1.125rem',
              fontWeight: 'bold',
              '&:hover': {
                background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                transform: 'translateY(-2px)',
                boxShadow: 4
              },
              transition: 'all 0.3s ease'
            }}
          >
            🎮 Partecipa al Contest
          </Button>
        </Box>
      </Container>
    </Box>
  )
}

export default AboutPage