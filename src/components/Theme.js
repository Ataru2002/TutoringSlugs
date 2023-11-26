import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#00457C',
    },
    secondary: {
      main: '#EFC530',
    },
  },
  typography: {
    fontFamily: 'Do Hyeon',
  },
  shape: {
    borderRadius: 16,
  },
});

export default theme;