import React from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';
import sarah from '../assests/sarah.jpg';
import DynamicBox from '../components/DynamicBox';
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";

const origin_url = window.location.origin;

const sections = [
    { title: 'Wanna be a tutor?', url: origin_url + '/tutor_signup' },
    { title: 'Change your setting', url: origin_url + '/change_setting' },
    { title: 'Change your tutor setting', url: origin_url + '/change_tutor_setting' },
];

let courses = ["cse-103", "cse-20"];

const db = getFirestore();
let tutors = [];
const q = query(collection(db, "Users"), where("tutor", "==", true), where("coursesTutored", "array-contains-any", courses));
const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
    tutors.push(doc.data());
});

export default function Results() {

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
                        {tutors.map((tutor) => (
                            <DynamicBox image={sarah} name={tutor.firstName + " " + tutor.lastName}
                                description={tutor.description} email={tutor.email} />
                        ))}
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