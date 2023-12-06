
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import signin_message from "../assests/signin_message.jpg";
import firebase from "../Firebase";

/*
- Sign in page with image on the side, will let the sign in for an hour
- Once signed in, the user is given a cookie in order to stay signed in
- Firebase Authenticator will give out errors if the password is incorrect
*/

const originUrl = window.location.origin;

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

export default function SignInSide() {
  fetch("http://localhost:8080/user/", {
    method: "GET",
    credentials: "include",
  }).then((res) => {
    if (res.status !== 404) {
      window.location.href = "/search";
    }
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });

    const email = data.get("email");
    const password = data.get("password");

    firebase
      .signInWithEmailAndPassword(firebase.auth, email, password)
      .then((user) => {
        console.log("user logged in: ", JSON.stringify(user.user));
        return user.user.getIdToken().then((idToken) => {
          // post /login to set cookie
          fetch("http://localhost:8080/auth/login", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            withCredentials: true,
            credentials: "include",
            body: JSON.stringify({
              idToken,
              userId: user.user.uid,
              firstName:
                user.user.displayName != null
                  ? user.user.displayName.split(" ")[0]
                  : "null",
              lastName:
                user.user.displayName != null
                  ? user.user.displayName.split(" ")[1]
                  : "null",
              email: user.user.email,
            }),
          }).then((res) => {
            console.log(res.headers);
            res.json().then((json) => {
              console.log(json);
              window.location.href = "/search";
            });
          });
        });
      })
      .catch((err) => {
        alert(err.message);
        //will alert the password is incorrect, invalid logins, etc
      });
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
          backgroundImage: `url(${signin_message})`,
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
            Sign in
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href={originUrl + "/forget_password"} variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href={originUrl + "/signup"} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
