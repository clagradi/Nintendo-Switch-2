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
        <Toolbar sx={{ justifyContent: 'space-between', minHeight: 64 }}>
          {/* Logo */}
          <Box
            component={Link}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              textDecoration: 'none',
              color: 'inherit'
            }}
          >
            <Box
              sx={{
                width: 32,
                height: 32,
                backgroundColor: theme.palette.primary.main,
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Home sx={{ color: 'white', fontSize: 20 }} />
            </Box>
            <Typography 
              variant="h6" 
              component="span"
              sx={{ 
                fontWeight: 'bold',
                color: 'text.primary'
              }}
            >
              Nintendo Switch Contest
            </Typography>
          </Box>

          {/* Navigation Links */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Button
              component={Link}
              to="/"
              sx={{
                color: 'text.primary',
                fontWeight: 500,
                '&:hover': {
                  color: theme.palette.primary.main,
                  backgroundColor: 'transparent'
                }
              }}
            >
              Contest
            </Button>
            <Button
              component={Link}
              to="/about"
              sx={{
                color: 'text.primary',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                '&:hover': {
                  color: theme.palette.primary.main,
                  backgroundColor: 'transparent'
                }
              }}
            >
              <Person sx={{ fontSize: 16 }} />
              Chi sono
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar
