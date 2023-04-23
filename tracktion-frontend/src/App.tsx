import { Box, Grid } from '@mui/material';

function App() {
  return (
    <Grid container height='100vh'>
      <Grid item xs={12} sm={6} sx={{ height: { xs: '70%', sm: '100%' } }}>
        <Box sx={{ bgcolor: 'primary.light', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box bgcolor="primary.main" p={2}>
            Login
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} sx={{ height: { xs: '30%', sm: '100%' } }}>
        <Box sx={{ bgcolor: 'primary.dark', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box bgcolor="primary.main" p={2}>
            Picture
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default App;
