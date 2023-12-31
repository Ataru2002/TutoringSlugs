
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import DropdownMajor from "../components/DropdownMajors";
import lion_school_rocks from "../assests/lion_school_rocks.jpg";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

/*
- sign up page with image on the side, sends information to the database
- will redirect you to the sign in page once you sign up
- Firebase Authenticator will store the account once created into its own database
- Before adding the account, the system will also check for some requirements
    + Email needs to contain @ucsc.edu
    + Email must not already exists within the database
    + Password has less than 4 characters
*/
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9ds9N44U4LmvCUZ6eE1HIAsv4ELrWPwo",
  authDomain: "tutoringslugemergence.firebaseapp.com",
  projectId: "tutoringslugemergence",
  storageBucket: "tutoringslugemergence.appspot.com",
  messagingSenderId: "233830887681",
  appId: "1:233830887681:web:fd0e7ecaa39118b4f42b00",
  measurementId: "G-1VZV18LX6Q"
};

initializeApp(firebaseConfig);
const auth = getAuth();

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Tutoring Slugs
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignUpSide() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      fname: data.get("First Name"),
      lname: data.get("Last Name"),
      email: data.get("email"),
      password: data.get("password"),
      cpassword: data.get("Confirm password"),
    });
    const fName = data.get("First Name");
    const lName = data.get("Last Name");
    const email = data.get("email");
    const major = data.get("major");
    const password = data.get("password");
    const cpassword = data.get("Confirm password");

    if (password != cpassword) {
      alert("Password doesn't match with confirm password");
    } else if (!email.toString().includes("ucsc.edu")) {
      alert("Email doesn't contain ucsc.edu");
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((cred) => {
          console.log(cred.user);
          updateProfile(auth.currentUser, {
            displayName: fName + " " + lName,
          }).then(() => {
            // Call sign up on backend

            fetch("http://localhost:8080/auth/signup", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              credentials: "include",
              body: JSON.stringify({
                userId: cred.user.uid,
                firstName: fName,
                lastName: lName,
                email: email,
                major,
              }),
            }).then((res) => {
              res.json().then((json) => {
                console.log(json);
                window.location.href = "/signin";
              });
            });
          });
        })
        .catch((err) => {
          alert(err.message);
          //will alert if:
          //- password has less than 4 characters
          //- the account already existed
        });
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${lion_school_rocks})`,
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              name="First Name"
              label="First Name"
              type="First Name"
              id="First Name"
              autoComplete="First Name"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="Last Name"
              label="Last Name"
              type="Last Name"
              id="Last Name"
              autoComplete="Last Name"
            />
            <DropdownMajor />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="Confirm password"
              label="Confirm password"
              type="password"
              id="confirm-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
