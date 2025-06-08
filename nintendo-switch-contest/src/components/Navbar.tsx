import { Link } from 'react-router-dom'
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  Container
} from '@mui/material'
import { Home, Person } from '@mui/icons-material'

const Navbar = () => {
  
  return (
    <AppBar position="sticky" className="navbar">
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between', minHeight: { xs: 56, sm: 64 }, px: { xs: 1, sm: 2 } }}>
          {/* Logo */}
          <Box
            component={Link}
            to="/"
            className="navbar-logo"
          >
            <Box className="navbar-logo-icon">
              <Home sx={{ color: 'white', fontSize: { xs: 18, sm: 20 } }} />
            </Box>
            <Typography 
              variant="h6" 
              component="span"
              className="navbar-title"
            >
              Nintendo Switch Contest
            </Typography>
            <Typography 
              variant="h6" 
              component="span"
              className="navbar-title-mobile"
            >
              Contest
            </Typography>
          </Box>

          {/* Navigation Links */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 3 } }}>
            <Box
              component={Link}
              to="/about"
              className="navbar-about-link"
            >
              <Person sx={{ fontSize: { xs: 14, sm: 16 } }} />
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>About</Box>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar
