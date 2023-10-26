import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from '../components/Header';
import Footer from '../components/Footer';
import lion_school_rocks from '../assests/lion_school_rocks.jpg';

const origin_url = window.location.origin;

const sections = [
  { title: 'Wanna be a tutor?', url: origin_url + '/tutor_signup' },
  { title: 'About us', url: '#' },
  { title: 'Change your setting', url: origin_url + '/change_setting' },
  { title: 'Change your tutor setting', url: '#' },
];

const defaultTheme = createTheme();

export default function Search() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container>
            <Container maxWidth="lg">
        <Header title="Tutoring Slugs" sections={sections} />
        <main>
            <Grid container 
            direction="column"
            justifyContent="space-around"
            alignItems="center"
            columnSpacing={{ xs: 4, sm: 5, md: 6 }}>
                <Grid container 
                spacing={6}
                direction="row"
                justifyContent="center"
                alignItems="center">
                    <Grid item xs={6}>
                        <TextField
                            id="search_class"
                            name="search_class"
                            label="Search Class"
                            fullWidth
                            variant="standard"
                        />
                    </Grid>
                    <Grid item >
                        <Button variant="contained">
                            Search
                        </Button>
                    </Grid>
                </Grid>
                <Grid container 
                spacing={6}
                direction="row"
                justifyContent="center"
                alignItems="center">
                    <Grid item xs={6}>
                        <TextField
                            id="search_tutors"
                            name="search_tutors"
                            label="Search Tutors"
                            fullWidth
                            variant="standard"
                        />
                    </Grid>
                    <Grid item >
                        <Button variant="contained">
                            Search
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </main>
      </Container>
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
      </Container>
    </ThemeProvider>
  );
}