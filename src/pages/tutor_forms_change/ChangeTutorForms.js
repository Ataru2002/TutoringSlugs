import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import TutorForms from './TutorForms';
import UploadPicture from '../../components/UploadPicture';
import UnofficalTranscript from '../../components/UnofficalTranscript';

// allows the users to change their tutor information
// uses api to send the information to the database

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Tutoring Slugs
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const steps = ['Tutor Info', 'Self Photo', 'Unoffical Transcript'];

export default function TutorUpdate() {
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

    const [activeStep, setActiveStep] = React.useState(0);
    const [tutor, setTutor] = React.useState({
        firstName: "",
        lastName: "",
        description: "",
        email: "",
        coursesTutored: "",
        selectedFile: "",
        selectedImg: "",
        tutor: true,
    });

    function getStepContent(step) {
        switch (step) {
            case 0:
                return <TutorForms setTutor={setTutor} />;
            case 1:
                return <UploadPicture setTutor={setTutor} />;
            case 2:
                return <UnofficalTranscript setTutor={setTutor} />;
            default:
                throw new Error('Unknown step');
        }
    }

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const goHome = () => {
        window.location.href = "/search";
    };

    const handleSubmit = (tutor) => {
        fetch("http://localhost:8080/user/updateTutor", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                description: tutor.description,
                coursesTutored: tutor.coursesTutored,
                selectedFile: tutor.selectedFile,
                selectedImg: tutor.selectedImg,
                tutor: tutor.tutor
            }),
        })
            .then((res) => {
                if (res.status === 404) {
                    window.location.href = "/signin";
                }
                res.json().then((data) => {
                    // do nothing with the data for now
                    console.log(data);
                })
            }).catch((err) => {
                console.log(err);
            })
        setActiveStep(activeStep + 1);
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar
                position="absolute"
                color="default"
                elevation={0}
                sx={{
                    position: 'relative',
                    borderBottom: (t) => `1px solid ${t.palette.divider}`,
                }}
            >
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        Tutroing Slugs
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center">
                        Tutor Update
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? (
                        <React.Fragment>
                            <Typography variant="h5" gutterBottom>
                                Succesful Change!
                            </Typography>
                            <Typography variant="subtitle1">
                                The change will appear immediately on your profile.
                            </Typography>
                            <Button variant="contained" onClick={goHome} sx={{ mt: 3, ml: 1 }}>
                                Home
                            </Button>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {getStepContent(activeStep)}
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                {activeStep !== 0 && (
                                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                        Back
                                    </Button>
                                )}

                                {activeStep === steps.length - 1 && (
                                    <Button variant="contained"
                                        onClick={() => handleSubmit(tutor)} sx={{ mt: 3, ml: 1 }}>
                                        Submit
                                    </Button>
                                )}

                                {activeStep !== steps.length - 1 && (
                                    <Button variant="contained"
                                        onClick={handleNext} sx={{ mt: 3, ml: 1 }}>
                                        Next
                                    </Button>
                                )}
                            </Box>
                        </React.Fragment>
                    )}
                </Paper>
                <Copyright />
            </Container>
        </React.Fragment>
    );
}