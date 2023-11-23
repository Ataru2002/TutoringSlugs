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
  getFirestore,
  collection,
  getDocs,
  addDoc,
} from "firebase/firestore";
import allClassesData from "./all_classes.json";


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
/* run this once manually, make sure to have all_classes.json in the same file
const db = getFirestore();
const coursesRef = collection(db, "Courses");

console.log(allClassesData);
let instances = [];
getDocs(coursesRef).then((snapshot) => {
  let temp = [];
  snapshot.docs.forEach((doc) => {
    temp.push({ ...doc.data() });
  });
  temp.forEach((test) => {
    instances.push(test.courseName);
  });
  console.log(temp);
  //console.log(instances);
}).then(() => {
  allClassesData.forEach(course => {
    const courseName = course.course_name;
    const courseURL = course.course_url;
    const courses = course.classes;
    if(!instances.includes(courseName)){
      addDoc(coursesRef, {
        courseName: courseName,
        courseURL: courseURL,
        courseList: courses,
      });
    } 
  })
})
*/


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
            direction="column"
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
                spacing={6}
                direction="row"
                justifyContent="center"
                alignItems="center"
                style={{ height: "100%" }}>
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