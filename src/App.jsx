import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import ResumePage from './ResumePage';

const theme = createTheme({
  typography: {
    fontFamily: '"Inter","Roboto","Helvetica","Arial",sans-serif',
  },
  palette: {
    primary: { main: '#1F4E79' },
    secondary: { main: '#2E75B6' },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ResumePage />
    </ThemeProvider>
  );
}

export default App;
