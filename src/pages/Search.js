import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

import Dropdownclasses from "../components/Dropdownclasses";
import Dropdowntutors from "../components/Dropdowntutors";
import search_img from "../assests/search_img.png";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import allClassesData from "./all_classes.json";
import allMajors from "./data.txt"

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
const db = getFirestore();
const coursesRef = collection(db, "Courses");
let instances = [];

getDocs(coursesRef).then((snapshot) => {
  let temp = [];
  //temp contains everything
  //instances contains all the names of the courses
  snapshot.docs.forEach((doc) => {
    temp.push({ ...doc.data() });
  });
  temp.forEach((test) => {
    instances.push(test.courseName);
  });
  console.log(temp);
  console.log(instances);
});

/* Run this code only once (usually done manually every new quarter)
const snapshot = await getDocs(collection(db, "Courses"));

snapshot.forEach((doc) => {
  deleteDoc(doc.ref).then(() => {
    console.log(`Document ${doc.id} successfully deleted!`);
  });
});

getDocs(coursesRef).then((snapshot) => {
  let temp = [];
  snapshot.docs.forEach((doc) => {
    temp.push({ ...doc.data() });
    allClassesData.push({...doc.data()});
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
  { title: "Wanna be a tutor?", url: origin_url + "/tutor_signup" },
  { title: "Change your setting", url: origin_url + "/change_setting" },
  {
    title: "Change your tutor setting",
    url: origin_url + "/change_tutor_setting",
  },
];

export default function Search() {
  fetch("http://localhost:8080/user/", {
    method: "GET",
    credentials: "include",
  }).then((res) => {
    if(res.status === 404){
      window.location.href = "/signin";
    }
    else {
      res.json().then((json) => {
        console.log(json);
      });
    }
  });

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
                    <Dropdownclasses />
                  </Grid>
                  <Grid item>
                    <Button variant="contained">Search</Button>
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
                    <Dropdowntutors />
                  </Grid>
                  <Grid item>
                    <Button variant="contained">Search</Button>
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
