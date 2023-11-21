import { createTheme } from '@mui/material/styles';
import lion_school_rocks from '../assests/lion_school_rocks.jpg';

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