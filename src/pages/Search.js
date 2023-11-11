import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { initializeApp } from "firebase/app";
import {
  getAuth,
} from "firebase/auth";
import Dropdownclasses from '../components/Dropdownclasses';
import Dropdowntutors from '../components/Dropdowntutors';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAr9AWEzY55OMgNGJLRPNkeg3EIv7rT52A",
  authDomain: "tutoringslugs.firebaseapp.com",
  projectId: "tutoringslugs",
  storageBucket: "tutoringslugs.appspot.com",
  messagingSenderId: "577248810803",
  appId: "1:577248810803:web:5807a43fb92cd400075046",
  measurementId: "G-BNWVD69VNX",
};

initializeApp(firebaseConfig);

const origin_url = window.location.origin;

const sections = [
  { title: 'Wanna be a tutor?', url: origin_url + '/tutor_signup' },
  { title: 'About us', url: '#' },
  { title: 'Change your setting', url: origin_url + '/change_setting' },
  { title: 'Change your tutor setting', url: origin_url + '/change_tutor_setting' },
];

const defaultTheme = createTheme();

export default function Search() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container
        // sx={{ 
        //     backgroundImage: `url(${lion_school_rocks})` 
        // }}
      >
        <Container maxWidth="lg">
        <Header title="Tutoring Slugs" sections={sections} />
        <main>
            <Grid container 
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={6}
            >
                <Grid item container 
                spacing={6}
                direction="row"
                justifyContent="center"
                alignItems="center"
                >
                    <Grid item>
                        <Dropdownclasses />
                    </Grid>
                    <Grid item >
                        <Button variant="contained">
                            Search
                        </Button>
                    </Grid>
                </Grid>
                <Grid item container 
                spacing={6}
                direction="row"
                justifyContent="center"
                alignItems="center"
                style={{ height: "100%" }}>
                    <Grid item>
                        <Dropdowntutors />
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