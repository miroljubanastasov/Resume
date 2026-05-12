import { Box, Container, CssBaseline, Typography } from '@mui/material';

function App() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="md">
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <Typography variant="h2" component="h1" gutterBottom>
            Hello, World!
          </Typography>
          <Typography variant="h5" color="text.secondary">
            Resume website — coming soon.
          </Typography>
        </Box>
      </Container>
    </>
  );
}

export default App;
