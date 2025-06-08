import { useState } from 'react'
import {
  Typography,
  Box,
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
import PaymentButton from '../components/PaymentButton'

const HomePage = () => {
  const theme = useTheme()
  const [userTickets, setUserTickets] = useState<{ number: number; purchased: Date; paymentId: string }[]>([])

  const handlePayment = (tickets: { number: number; purchased: Date; paymentId: string }[]) => {
    setUserTickets(prev => [...prev, ...tickets])
  }

  const features = [
    {
      icon: Star,
      title: 'Switch 2 Console',
      subtitle: 'Next generation',
      color: theme.palette.success.main,
      bgcolor: theme.palette.success.light + '20'
    },
    {
      icon: CardGiftcard,
      title: 'Brand New',
      subtitle: 'Never used',
      color: theme.palette.info.main,
      bgcolor: theme.palette.info.light + '20'
    },
    {
      icon: FlashOn,
      title: 'Only $10',
      subtitle: 'Per ticket',
      color: theme.palette.secondary.main,
      bgcolor: theme.palette.secondary.light + '20'
    },
    {
      icon: SportsEsports,
      title: 'Fair Draw',
      subtitle: '100% random',
      color: theme.palette.warning.main,
      bgcolor: theme.palette.warning.light + '20'
    }
  ]

  return (
    <Box className="main-container" sx={{ py: 4 }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', mb: { xs: 4, sm: 6, md: 8 } }}>
        <Box sx={{ mb: { xs: 2, sm: 3, md: 4 } }}>
          <Typography 
            variant="h1" 
            className="neon-text"
            sx={{ 
              fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem', lg: '3.5rem' },
              fontWeight: 'bold',
              color: 'white',
              mb: { xs: 1, sm: 2 },
              px: { xs: 1, sm: 0 },
              textShadow: '0 0 20px rgba(255, 255, 255, 0.5)'
            }}
          >
            🎮 <Box component="span" sx={{ color: '#FF6B35' }}>Nintendo Switch 2</Box> Contest
          </Typography>
          <Typography 
            variant="h5" 
            color="text.secondary" 
            sx={{ 
              mb: { xs: 2, sm: 3 },
              fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
              px: { xs: 1, sm: 0 }
            }}
          >
            Win a brand new Nintendo Switch 2!
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary" 
            sx={{ 
              mb: { xs: 2, sm: 3 },
              fontSize: { xs: '0.9rem', sm: '1.1rem', md: '1.25rem' },
              px: { xs: 1, sm: 0 }
            }}
          >
            ⚡ Contest active - Join now for more chances!
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
        <Box sx={{ mb: { xs: 4, sm: 5, md: 6 }, display: 'flex', justifyContent: 'center', px: { xs: 1, sm: 0 } }}>
          <Card sx={{ borderRadius: 3, boxShadow: 6, p: { xs: 2, sm: 3, md: 4 }, maxWidth: '100%' }}>
            <Box
              component="img"
              src="/Images/switch.jpg"
              alt="Nintendo Switch 2"
              sx={{
                width: { xs: '100%', sm: 400, md: 500 },
                maxWidth: { xs: 320, sm: 400, md: 500 },
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
                width: { xs: '100%', sm: 400, md: 500 },
                maxWidth: { xs: 320, sm: 400, md: 500 },
                height: { xs: 200, sm: 250, md: 300 },
                borderRadius: 2,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <SportsEsports sx={{ fontSize: { xs: 64, sm: 80, md: 96 }, color: 'white' }} />
            </Box>
          </Card>
        </Box>
      </Box>

      {/* Introduzione */}
      <Card sx={{ borderRadius: 3, boxShadow: 4, mb: { xs: 4, sm: 5, md: 6 }, mx: { xs: 1, sm: 0 } }}>
        <CardContent sx={{ p: { xs: 2, sm: 3, md: 5 } }}>
          <Box sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto' }}>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 'bold', 
                mb: { xs: 2, sm: 3 },
                fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' }
              }}
            >
              🎲 Join this Raffle!
            </Typography>
            <Typography 
              variant="h6" 
              color="text.secondary" 
              sx={{ 
                lineHeight: 1.7, 
                mb: { xs: 2, sm: 3 },
                fontSize: { xs: '0.9rem', sm: '1.1rem', md: '1.25rem' },
                px: { xs: 1, sm: 0 }
              }}
            >
              Hi! Welcome to the most exciting contest to win a Nintendo Switch 2!
              <Box component="strong" sx={{ color: theme.palette.primary.main }}> By paying only $10 </Box>
              you will receive a unique number that gives you a chance to win this amazing console.
            </Typography>
            <Typography 
              variant="h6" 
              color="text.secondary" 
              sx={{ 
                lineHeight: 1.7, 
                mb: { xs: 3, sm: 4 },
                fontSize: { xs: '0.9rem', sm: '1.1rem', md: '1.25rem' },
                px: { xs: 1, sm: 0 }
              }}
            >
              💡 <strong>Tip:</strong> You can buy more tickets to increase your chances of winning!
              Each ticket gives you a new number in the draw.
            </Typography>
            
            {/* Caratteristiche - Rimosso Grid, uso CSS Grid tramite sx */}
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
              gap: { xs: 2, sm: 3 }, 
              mb: { xs: 3, sm: 4 } 
            }}>
              {features.map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <Box
                    key={index}
                    sx={{
                      backgroundColor: feature.bgcolor,
                      p: { xs: 2, sm: 3 },
                      borderRadius: 2,
                      textAlign: 'center',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)'
                      },
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center'
                    }}
                  >
                    <IconComponent sx={{ fontSize: { xs: 24, sm: 28, md: 32 }, color: feature.color, mb: 1 }} />
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 'bold', 
                        color: feature.color,
                        fontSize: { xs: '0.9rem', sm: '1rem', md: '1.25rem' }
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{
                        fontSize: { xs: '0.75rem', sm: '0.875rem' }
                      }}
                    >
                      {feature.subtitle}
                    </Typography>
                  </Box>
                )
              })}
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Payment and Tickets Section */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, 
        gap: { xs: 3, sm: 4 }, 
        px: { xs: 1, sm: 0 } 
      }}>
        {/* Payment Section */}
        <Box>
          <PaymentButton onPayment={handlePayment} />
        </Box>

        {/* Your Tickets */}
        {userTickets.length > 0 && (
          <Box>
            <Card sx={{ borderRadius: 3, boxShadow: 4, height: 'fit-content' }}>
              <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
                <Typography 
                  variant="h4" 
                  align="center" 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 'bold', 
                    mb: { xs: 2, sm: 3 },
                    fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' }
                  }}
                >
                  🎫 Your Tickets
                </Typography>
                <Box sx={{ maxHeight: { xs: 300, sm: 400 }, overflowY: 'auto' }}>
                  {userTickets.map((ticket, index) => (
                    <Card 
                      key={index}
                      sx={{
                        mb: { xs: 1.5, sm: 2 },
                        background: `linear-gradient(135deg, ${theme.palette.success.light}20, ${theme.palette.success.light}10)`,
                        border: `1px solid ${theme.palette.success.light}`
                      }}
                    >
                      <CardContent sx={{ p: { xs: 1.5, sm: 2 }, '&:last-child': { pb: { xs: 1.5, sm: 2 } } }}>
                        <Box sx={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          alignItems: 'center',
                          flexDirection: { xs: 'column', sm: 'row' },
                          gap: { xs: 1, sm: 0 }
                        }}>
                          <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                            <Typography 
                              variant="h6" 
                              sx={{ 
                                fontWeight: 'bold', 
                                color: theme.palette.success.dark,
                                fontSize: { xs: '1rem', sm: '1.25rem' }
                              }}
                            >
                              Ticket #{ticket.number}
                            </Typography>
                            <Typography 
                              variant="body2" 
                              color="text.secondary"
                              sx={{
                                fontSize: { xs: '0.75rem', sm: '0.875rem' }
                              }}
                            >
                              Purchased: {ticket.purchased.toLocaleString('en-GB')}
                            </Typography>
                          </Box>
                          <Chip
                            label="Active"
                            size="small"
                            sx={{
                              backgroundColor: theme.palette.success.light,
                              color: theme.palette.success.dark,
                              fontWeight: 'bold',
                              fontSize: { xs: '0.7rem', sm: '0.8125rem' }
                            }}
                          />
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
                <Box sx={{ mt: { xs: 2, sm: 3 }, textAlign: 'center' }}>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{
                      fontSize: { xs: '0.8rem', sm: '0.875rem' }
                    }}
                  >
                    Total tickets: <strong>{userTickets.length}</strong> |
                    Investment: <strong>${userTickets.length * 10}</strong>
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        )}
      </Box>

      {/* Final Call to Action */}
      <Box sx={{ textAlign: 'center', mt: { xs: 6, sm: 7, md: 8 }, px: { xs: 1, sm: 0 } }}>
        <Card
          sx={{
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
            color: 'white',
            borderRadius: 3,
            boxShadow: 4
          }}
        >
          <CardContent sx={{ p: { xs: 3, sm: 4, md: 5 } }}>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 'bold', 
                mb: { xs: 1.5, sm: 2 },
                fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' }
              }}
            >
              🔥 Don't miss this opportunity!
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                opacity: 0.9, 
                mb: { xs: 1.5, sm: 2 },
                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' }
              }}
            >
              The contest ends soon and spots are limited!
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                opacity: 0.75,
                fontSize: { xs: '0.8rem', sm: '0.875rem' }
              }}
            >
              Follow updates in the "About" section so you don't miss the draw!
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}

export default HomePage