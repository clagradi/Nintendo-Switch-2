import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { CssBaseline, Box } from '@mui/material'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import Navbar from './components/Navbar'

// Tema personalizzato per Nintendo
const theme = createTheme({
  palette: {
    mode: 'dark', // Imposta la modalità scura
    primary: {
      main: '#E60012', // Nintendo Red
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#0066CC', // Nintendo Blue
      contrastText: '#ffffff',
    },
    background: {
      default: 'transparent', // Trasparente per mostrare il gradiente CSS
      paper: 'rgba(255, 255, 255, 0.1)',
    },
    text: {
      primary: '#e8eaed', // Testo principale bianco/grigio chiaro
      secondary: 'rgba(255, 255, 255, 0.8)', // Testo secondario
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 20, // Più moderno
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 50,
          padding: '16px 36px',
          background: 'rgba(230, 0, 18, 0.15)',
          backdropFilter: 'blur(15px)',
          border: '1px solid rgba(230, 0, 18, 0.3)',
          boxShadow: '0 8px 32px rgba(230, 0, 18, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
            transition: 'left 0.5s',
          },
          '&:hover': {
            transform: 'translateY(-4px) scale(1.05)',
            background: 'rgba(230, 0, 18, 0.25)',
            borderColor: 'rgba(230, 0, 18, 0.5)',
            boxShadow: '0 15px 45px rgba(230, 0, 18, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
            '&::before': {
              left: '100%',
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 25,
          background: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
            transition: 'left 0.5s',
            pointerEvents: 'none',
          },
          '&:hover': {
            transform: 'translateY(-12px) scale(1.02)',
            background: 'rgba(255, 255, 255, 0.12)',
            borderColor: 'rgba(255, 255, 255, 0.25)',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
            '&::before': {
              left: '100%',
            },
          },
        },
      },
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box 
          className="fluid-container animated-gradient"
          sx={{ 
            minHeight: '100vh',
            width: '100vw',
            margin: 0,
            padding: 0,
            overflow: 'hidden'
          }}
        >
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  )
}

export default App
