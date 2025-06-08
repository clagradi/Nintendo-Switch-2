import { Typography, Box, Card, CardContent, Button, Avatar, Container, useTheme } from '@mui/material'
import { Twitter, OpenInNew } from '@mui/icons-material'
import { Link } from 'react-router-dom'

const AboutPage = () => {
  const theme = useTheme()
  // Inserisci qui il tuo username X (ex Twitter)
  const xUsername = "ClaudioSonnet" // Cambia questo con il tuo vero username X

  return (
    <Box className="main-container" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: { xs: 4, sm: 6, md: 8 } }}>
        <Typography 
          variant="h2" 
          className="neon-text"
          sx={{ 
            fontWeight: 'bold', 
            mb: 2,
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3.75rem' },
            color: 'white',
            textShadow: '0 0 20px rgba(255, 255, 255, 0.5)'
          }}
        >
          About Me
        </Typography>
        <Box
          sx={{
            width: { xs: 64, sm: 80, md: 96 },
            height: 4,
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.info.main})`,
            mx: 'auto',
            borderRadius: 2
          }}
        />
      </Box>
        <Container maxWidth="md">

        {/* Profile */}
        <Card className="glass-card" sx={{ borderRadius: 3, mb: { xs: 4, sm: 5, md: 6 }, mx: { xs: 1, sm: 0 } }}>
          <CardContent sx={{ p: { xs: 3, sm: 4, md: 5 } }}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              gap: { xs: 3, sm: 4 }
            }}>
              {/* Avatar */}
              <Avatar
                sx={{
                  width: { xs: 96, sm: 112, md: 128 },
                  height: { xs: 96, sm: 112, md: 128 },
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.info.main})`,
                  fontSize: { xs: '2.5rem', sm: '2.75rem', md: '3rem' },
                  fontWeight: 'bold'
                }}
              >
                C
              </Avatar>

              {/* Info */}
              <Box sx={{ 
                flex: 1, 
                textAlign: { xs: 'center', md: 'left' }
              }}>
                <Typography 
                  variant="h3" 
                  sx={{ 
                    fontWeight: 'bold', 
                    mb: { xs: 2, sm: 3 },
                    fontSize: { xs: '1.8rem', sm: '2.2rem', md: '3rem' },
                    color: 'white'
                  }}
                >
                  Hi! I'm Claudio
                </Typography>
                <Typography 
                  variant="h6" 
                  color="text.secondary" 
                  sx={{ 
                    lineHeight: 1.7, 
                    mb: { xs: 2, sm: 3 },
                    fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                    px: { xs: 1, sm: 0 }
                  }}
                >
                  Welcome to my contest to win a Nintendo Switch 2!
                  I'm passionate about gaming and technology, and I decided to organize
                  this contest to share my passion with the community.
                </Typography>
                <Typography 
                  variant="h6" 
                  color="text.secondary" 
                  sx={{ 
                    lineHeight: 1.7, 
                    mb: { xs: 3, sm: 4 },
                    fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                    px: { xs: 1, sm: 0 }
                  }}
                >
                  Each ticket costs only $10 and you can buy as many as you want to
                  increase your chances of winning. The contest is completely
                  transparent and the winner will be drawn randomly and publicly.
                </Typography>

                {/* X Link */}
                <Button
                  href={`https://twitter.com/${xUsername}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: '#1DA1F2',
                    color: 'white',
                    px: { xs: 2, sm: 3 },
                    py: { xs: 1, sm: 1.5 },
                    fontSize: { xs: '0.9rem', sm: '1rem' },
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
                  <Twitter sx={{ fontSize: { xs: 18, sm: 20 } }} />
                  <Box sx={{ display: { xs: 'none', sm: 'block' } }}>Follow me on X</Box>
                  <Box sx={{ display: { xs: 'block', sm: 'none' } }}>Follow</Box>
                  <OpenInNew sx={{ fontSize: { xs: 14, sm: 16 } }} />
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Box sx={{ textAlign: 'center', mt: { xs: 6, sm: 7, md: 8 }, px: { xs: 1, sm: 0 } }}>
          <Button
            component={Link}
            to="/"
            variant="contained"
            size="large"
            sx={{
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              color: 'white',
              px: { xs: 3, sm: 4 },
              py: { xs: 1.5, sm: 2 },
              fontSize: { xs: '1rem', sm: '1.125rem' },
              fontWeight: 'bold',
              '&:hover': {
                background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                transform: 'translateY(-2px)',
                boxShadow: 4
              },
              transition: 'all 0.3s ease'
            }}
          >
            🎮 Join the Contest
          </Button>
        </Box>
      </Container>
    </Box>
  )
}

export default AboutPage