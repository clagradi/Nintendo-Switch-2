import { 
  Card, 
  CardContent, 
  Box, 
  Chip,
  useTheme 
} from '@mui/material'

const ContestStats = () => {
  const theme = useTheme()

  return (
    <Card 
      sx={{ 
        borderRadius: 3, 
        boxShadow: 4, 
        mb: 4,
        background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Chip
            label="🔥 Contest Attivo"
            sx={{
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              color: 'white',
              fontWeight: 'bold',
              fontSize: '0.875rem',
              px: 2,
              py: 1
            }}
          />
        </Box>
      </CardContent>
    </Card>
  )
}

export default ContestStats