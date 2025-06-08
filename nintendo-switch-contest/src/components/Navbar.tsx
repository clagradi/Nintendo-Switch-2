import { Link } from 'react-router-dom'
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  Button, 
  Container,
  useTheme 
} from '@mui/material'
import { Home, Person } from '@mui/icons-material'

const Navbar = () => {
  const theme = useTheme()
  
  return (
    <AppBar position="sticky" sx={{ backgroundColor: 'white', boxShadow: 3 }}>
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between', minHeight: { xs: 56, sm: 64 }, px: { xs: 1, sm: 2 } }}>
          {/* Logo */}
          <Box
            component={Link}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: { xs: 1, sm: 2 },
              textDecoration: 'none',
              color: 'inherit'
            }}
          >
            <Box
              sx={{
                width: { xs: 28, sm: 32 },
                height: { xs: 28, sm: 32 },
                backgroundColor: theme.palette.primary.main,
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Home sx={{ color: 'white', fontSize: { xs: 18, sm: 20 } }} />
            </Box>
            <Typography 
              variant="h6" 
              component="span"
              sx={{ 
                fontWeight: 'bold',
                color: 'text.primary',
                fontSize: { xs: '1rem', sm: '1.25rem' },
                display: { xs: 'none', sm: 'block' }
              }}
            >
              Nintendo Switch Contest
            </Typography>
            <Typography 
              variant="h6" 
              component="span"
              sx={{ 
                fontWeight: 'bold',
                color: 'text.primary',
                fontSize: '0.9rem',
                display: { xs: 'block', sm: 'none' }
              }}
            >
              Contest
            </Typography>
          </Box>

          {/* Navigation Links */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 3 } }}>
            <Button
              component={Link}
              to="/about"
              sx={{
                color: 'text.primary',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                fontSize: { xs: '0.8rem', sm: '0.875rem' },
                px: { xs: 1, sm: 2 },
                '&:hover': {
                  color: theme.palette.primary.main,
                  backgroundColor: 'transparent'
                }
              }}
            >
              <Person sx={{ fontSize: { xs: 14, sm: 16 } }} />
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>About</Box>
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar
