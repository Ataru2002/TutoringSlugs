import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { initializeApp } from "firebase/app";
import DropdownClassesSearch from '../components/DropdownClassesSearch';
import DropdownCourseName from '../components/DropdownCourseName';
import Dropdowntutors from '../components/DropdownTutors';
import search_img from '../assests/search_img.png';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

// searches for tutors or searches for courses

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
    { title: "Wanna be a tutor?", url: origin_url + "/tutor_signup" },
    { title: "Change your setting", url: origin_url + "/change_setting" },
    {
        title: "Change your tutor setting",
        url: origin_url + "/change_tutor_setting",
    },
];

export default function Search() {
    const [courses, setCourses] = React.useState([]);
    const [classes, setClasses] = React.useState([]);
    const [tutors, setTutors] = React.useState([]);

    function parameterizeArray(key, array) {
        array = array.map(encodeURIComponent);
        return '?' + key + '[]=' + array.join('&' + key + '[]=');  
    }

    function goToResults() {
        var url = "/results" + parameterizeArray('class', classes);
        window.location.href = url;
    }

    function goToResultsTutors() {
        var url = "/results_tutors" + parameterizeArray('tutor', tutors);
        window.location.href = url;
    }

    return (
        <Container>
            <CssBaseline />
            <Container maxWidth="lg">
                <Header title="Tutoring Slugs" sections={sections} />
                <main>
                    <Paper
                        sx={{
                            backgroundImage: `url(${search_img})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            padding: "22%",
                        }}
                    >
                        <Container container>
                            <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                                spacing={2}
                            >
                                <Typography
                                    component="h1"
                                    variant="h3"
                                    color="inherit"
                                    gutterBottom
                                >
                                    Need Help?
                                </Typography>
                                <Typography variant="h5" color="inherit" paragraph>
                                    Search for tutors based on classes or a specific tutor to help
                                    you succeed in school
                                </Typography>
                                <Grid
                                    item
                                    container
                                    spacing={6}
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <Grid item>
                                        <DropdownCourseName courses={courses} setCourses={setCourses} />
                                        <DropdownClassesSearch courses={courses} classes={classes} setClasses={setClasses} />
                                    </Grid>
                                    <Grid item>
                                        <Button variant="contained" onClick={() => goToResults()}>Search</Button>
                                    </Grid>
                                </Grid>
                                <Grid
                                    item
                                    container
                                    spacing={6}
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center"
                                    style={{ height: "100%" }}
                                >
                                    <Grid item>
                                        <Dropdowntutors tutors={tutors} setTutors={setTutors}/>
                                    </Grid>
                                    <Grid item>
                                        <Button variant="contained" onClick={() => goToResultsTutors()}>Search</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Container>
                    </Paper>
                </main>
            </Container>
            <Footer
                title="Tutoring Slugs | University of California, Santa Cruz | Support TutoringSlugsSupport@gmail.com"
                description="Please fund us"
            />
        </Container>
    );
}
