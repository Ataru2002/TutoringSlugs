import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';
import sarah from '../assests/sarah.jpg';
import DynamicBox from '../components/DynamicBox';

const origin_url = window.location.origin;

const sections = [
  { title: 'Wanna be a tutor?', url: origin_url + '/tutor_signup' },
  { title: 'Change your setting', url: origin_url + '/change_setting' },
  { title: 'Change your tutor setting', url: origin_url + '/change_tutor_setting' },
];

export default function Results() {
    const name = "Sarah Ramamha";
    const description = "Excellent experince for tutoring. Has 2 years of experience. Rate: 30 dollars per hour"
    const email = "srammaha@ucsc.edu";
  return (
    <Container>
      <CssBaseline />
      <Container maxWidth="lg">
      <Header title="Tutoring Slugs" sections={sections} />
      <main>
          <Grid container 
          spacing={6}
          justifyContent="center"
          alignItems="center"
          >
              <Grid item container 
              spacing={6}
              justifyContent="center"
              alignItems="center"
              >
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
              <DynamicBox image={sarah} name={name} description={description} email={email}/>
              <DynamicBox image={sarah} name={name} description={description} email={email}/>
          </Grid>
      </main>
    </Container>
    <Footer
      title="Tutoring Slugs | University of California, Santa Cruz | Support TutoringSlugsSupport@gmail.com"
      description="Please fund us"
    />
    </Container>
  );
}