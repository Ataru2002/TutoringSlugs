import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import DropdownMajor from '../components/DropdownMajors';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Tutoring Slugs
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function ChangeSetting() {
    // Checks if user is signed in - redirects to sign in if not signed in
    fetch("http://localhost:8080/user/", {
        method: "GET",
        credentials: "include",
    }).then((res) => {
        if (res.status === 404) {
            window.location.href = "/signin";
        }
    }).catch((err) => {
        console.log(err);
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // @TODO: get value from major dropdown

        const firstName = data.get('First Name');
        const lastName = data.get('Last Name');
        const email = data.get('email');
        const password = data.get('new password');
        const cpassword = data.get('confirm password');

        if (password != cpassword) {
            alert("Password doesn't match with confirm password");
        }
        else if (email != "" && !email.toString().includes("ucsc.edu")) {
            alert("Email doesn't contain ucsc.edu");
        }
        else if (password.length > 0 && password.length < 6) {
            alert("Password is too short. Try again");
        }

        else {
            // Update user on the backend
            fetch("http://localhost:8080/user/updateUser", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    firstName, lastName, email, password
                })
            }).then(res => {
                if (res.status === 404) {
                    window.location.href = "/signin";
                }
                // firebase error such as email already exists
                else if(res.status === 409){
                    res.text().then(err => {
                        alert(err);
                    })
                }
                else {
                    res.json().then(json => {
                        console.log(json);
                        window.location.href = "/search";
                    })
                }
            }).catch((err) => {
                console.log(err);
            });
        };
    }


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Change Your Setting
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        fullWidth
                        name="First Name"
                        label="First Name"
                        type="First Name"
                        id="First Name"
                        autoComplete="First Name"
                    />
                    <TextField
                        margin="normal"
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
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        name="new password"
                        label="New Password"
                        type="password"
                        id="password"
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        name="confirm password"
                        label="Re-enter Password"
                        type="password"
                        id="confirm password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Change your setting
                    </Button>
                </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    );
}