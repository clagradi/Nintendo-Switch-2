import { useState } from 'react'
import {
  Typography,
  Box,
  Card,
  CardContent,
  Chip
} from '@mui/material'
import {
  SportsEsports,
  Star,
  CardGiftcard,
  FlashOn
} from '@mui/icons-material'
import PaymentButton from '../components/PaymentButton'

const HomePage = () => {
  const [userTickets, setUserTickets] = useState<{ number: number; purchased: Date; paymentId: string }[]>([])

  const handlePayment = (tickets: { number: number; purchased: Date; paymentId: string }[]) => {
    setUserTickets(prev => [...prev, ...tickets])
  }

  const features = [
    {
      icon: Star,
      title: 'Switch 2 Console',
      subtitle: 'Next generation',
      color: '#388E3C',
      iconColor: '#81C784',
      bgColor: 'rgba(56, 142, 60, 0.12)',
      borderColor: 'rgba(56, 142, 60, 0.15)',
      hoverBg: 'rgba(56, 142, 60, 0.18)',
      hoverBorder: 'rgba(56, 142, 60, 0.3)',
      shadowColor: 'rgba(56, 142, 60, 0.2)'
    },
    {
      icon: CardGiftcard,
      title: 'Brand New',
      subtitle: 'Never used',
      color: '#1565C0',
      iconColor: '#64B5F6',
      bgColor: 'rgba(21, 101, 192, 0.12)',
      borderColor: 'rgba(21, 101, 192, 0.15)',
      hoverBg: 'rgba(21, 101, 192, 0.18)',
      hoverBorder: 'rgba(21, 101, 192, 0.3)',
      shadowColor: 'rgba(21, 101, 192, 0.2)'
    },
    {
      icon: FlashOn,
      title: 'Only $10',
      subtitle: 'Per ticket',
      color: '#4A148C',
      iconColor: '#B39DDB',
      bgColor: 'rgba(74, 20, 140, 0.12)',
      borderColor: 'rgba(74, 20, 140, 0.15)',
      hoverBg: 'rgba(74, 20, 140, 0.18)',
      hoverBorder: 'rgba(74, 20, 140, 0.3)',
      shadowColor: 'rgba(74, 20, 140, 0.2)'
    },
    {
      icon: SportsEsports,
      title: 'Fair Draw',
      subtitle: '100% random',
      color: '#BF360C',
      iconColor: '#FFAB91',
      bgColor: 'rgba(191, 54, 12, 0.12)',
      borderColor: 'rgba(191, 54, 12, 0.15)',
      hoverBg: 'rgba(191, 54, 12, 0.18)',
      hoverBorder: 'rgba(191, 54, 12, 0.3)',
      shadowColor: 'rgba(191, 54, 12, 0.2)'
    }
  ]

  return (
    <Box className="main-container" sx={{ py: 4 }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', mb: { xs: 4, sm: 6, md: 8 } }}>
        <Box sx={{ mb: { xs: 2, sm: 3, md: 4 } }}>
          <Typography 
            variant="h1" 
            className="neon-text hero-title"
          >
            🎮 <Box component="span" sx={{ color: '#FF6B35' }}>Nintendo Switch 2</Box> Contest
          </Typography>
          <Typography 
            variant="h5" 
            className="hero-subtitle"
          >
            Win a brand new Nintendo Switch 2!
          </Typography>
          <Typography 
            variant="h6" 
            className="hero-active-text"
          >
            ⚡ Contest active - Join now for more chances!
          </Typography>
          <Box className="hero-divider" />
        </Box>
        
        {/* Immagine Nintendo Switch */}
        <Box sx={{ mb: { xs: 4, sm: 5, md: 6 }, display: 'flex', justifyContent: 'center', px: { xs: 1, sm: 0 } }}>
          <Card className="switch-image-card">
            <Box
              component="img"
              src="/Images/switch.jpg"
              alt="Nintendo Switch 2"
              className="switch-image"
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                e.currentTarget.style.display = 'none'
                const nextElement = e.currentTarget.nextElementSibling as HTMLElement
                if (nextElement) {
                  nextElement.style.setProperty('display', 'flex')
                }
              }}
            />
            <Box className="switch-fallback">
              <SportsEsports sx={{ 
                fontSize: { xs: 64, sm: 80, md: 96 }, 
                color: 'white',
                filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.5))'
              }} />
            </Box>
          </Card>
        </Box>
      </Box>

      {/* Introduzione */}
      <Card className="intro-card" sx={{ mx: { xs: 1, sm: 0 } }}>
        <CardContent sx={{ p: { xs: 2, sm: 3, md: 5 } }}>
          <Box sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto' }}>
            <Typography 
              variant="h4" 
              className="intro-title"
            >
              🎲 Join this Raffle!
            </Typography>
            <Typography 
              variant="h6" 
              className="intro-text"
            >
              Hi! Welcome to the most exciting contest to win a Nintendo Switch 2!
              <Box component="strong" sx={{ color: '#B39DDB' }}> By paying only $10 </Box>
              you will receive a unique number that gives you a chance to win this amazing console.
            </Typography>
            <Typography 
              variant="h6" 
              className="intro-text"
            >
              💡 <strong>Tip:</strong> You can buy more tickets to increase your chances of winning!
              Each ticket gives you a new number in the draw.
            </Typography>
            
            {/* Caratteristiche - Rimosso Grid, uso CSS Grid tramite sx */}
            <Box className="features-grid">
              {features.map((feature, index) => {
                const IconComponent = feature.icon
                const colorClass = index === 0 ? 'green' : index === 1 ? 'blue' : index === 2 ? 'purple' : 'orange'
                const iconColorClass = index === 0 ? 'green' : index === 1 ? 'blue' : index === 2 ? 'purple' : 'orange'
                return (
                  <Box
                    key={index}
                    className={`feature-card feature-card-${colorClass}`}
                  >
                    <IconComponent className={`feature-icon feature-icon-${iconColorClass}`} />
                    <Typography className="feature-title">
                      {feature.title}
                    </Typography>
                    <Typography className="feature-subtitle">
                      {feature.subtitle}
                    </Typography>
                  </Box>
                )
              })}
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Payment Section Centered */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        px: { xs: 1, sm: 0 } 
      }}>
        <Box sx={{ 
          width: '100%', 
          maxWidth: 500 
        }}>
          <PaymentButton onPayment={handlePayment} />
          {userTickets.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Card className="tickets-card">
                <CardContent sx={{ p: { xs: 1.5, sm: 2, md: 2.5 } }}>
                  <Typography 
                    variant="h4" 
                    align="center" 
                    gutterBottom 
                    className="tickets-title"
                  >
                    🎫 Your Tickets
                  </Typography>
                  <Box sx={{ maxHeight: { xs: 300, sm: 400 }, overflowY: 'auto' }}>
                    {userTickets.map((ticket, index) => (
                      <Card 
                        key={index}
                        className="ticket-item"
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
                                className="ticket-number"
                              >
                                Ticket #{ticket.number}
                              </Typography>
                              <Typography 
                                variant="body2" 
                                className="ticket-date"
                              >
                                Purchased: {ticket.purchased.toLocaleString('en-GB')}
                              </Typography>
                            </Box>
                            <Chip
                              label="Active"
                              size="small"
                              className="ticket-chip"
                            />
                          </Box>
                        </CardContent>
                      </Card>
                    ))}
                  </Box>
                  <Box className="ticket-summary">
                    <Typography 
                      variant="body2" 
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
      </Box>

      {/* Final Call to Action */}
      <Box sx={{ textAlign: 'center', mt: { xs: 6, sm: 7, md: 8 }, px: { xs: 1, sm: 0 } }}>
        <Card className="cta-card">
          <CardContent sx={{ p: { xs: 3, sm: 4, md: 5 } }}>
            <Typography 
              variant="h4" 
              className="cta-title"
            >
              🔥 Don't miss this opportunity!
            </Typography>
            <Typography 
              variant="h6" 
              className="cta-subtitle"
            >
              The contest ends soon and spots are limited!
            </Typography>
            <Typography 
              variant="body2" 
              className="cta-description"
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