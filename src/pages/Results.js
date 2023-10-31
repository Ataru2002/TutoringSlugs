import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from '../components/Header';
import Footer from '../components/Footer';
import sarah from '../assests/sarah.jpg';
import BasicRating from '../components/BasicRatings';

const origin_url = window.location.origin;

const sections = [
  { title: 'Wanna be a tutor?', url: origin_url + '/tutor_signup' },
  { title: 'About us', url: '#' },
  { title: 'Change your setting', url: origin_url + '/change_setting' },
  { title: 'Change your tutor setting', url: origin_url + '/change_tutor_setting' },
];

const defaultTheme = createTheme();

export default function Results() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container>
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
                <Grid item container 
                justifyContent="center"
                alignItems="center"
                >
                    <Card
                        sx={{
                            width: "60%",
                          }}
                    >
                        <CardActionArea>
                            <CardMedia
                            component="img"
                            height="500"
                            image={sarah}
                            alt="sarah"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Sarah Rammaha 
                                </Typography>
                                <BasicRating />
                                <Typography variant="body2" color="text.secondary">
                                    Excellent experince for tutoring. Has 2 years of experience. Excellent experince for tutoring. Has 2 years of experience. Excellent experince for tutoring. Has 2 years of experience. Excellent experince for tutoring. Has 2 years of experience. Excellent experince for tutoring. Has 2 years of experience. Excellent experince for tutoring. Has 2 years of experience. Excellent experince for tutoring. Has 2 years of experience. Excellent experince for tutoring. Has 2 years of experience. Excellent experince for tutoring. Has 2 years of experience. Excellent experince for tutoring. Has 2 years of experience. Excellent experince for tutoring. Has 2 years of experience. Excellent experince for tutoring. Has 2 years of experience. Excellent experince for tutoring. Has 2 years of experience. 
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Rate: 30 dollars per hour
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary">
                                Contact
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item container 
                justifyContent="center"
                alignItems="center"
                >
                    <Card
                        sx={{
                            width: "60%",
                        }}
                    >
                        <CardActionArea>
                            <CardMedia
                            component="img"
                            height="500"
                            image={sarah}
                            alt="sarah"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Sarah Rammaha
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Excellent experince for tutoring. Has 2 years of experience. 
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Rate: 30 dollars per hour
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary">
                                Contact
                            </Button>
                        </CardActions>
                    </Card>
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