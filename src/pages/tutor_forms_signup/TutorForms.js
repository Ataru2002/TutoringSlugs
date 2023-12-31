import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import DropdownClassesTutors from '../../components/DropdownClassesTutors';
import DropdownCourseName from '../../components/DropdownCourseName';

// this is part of the tutor sign up form

export default function TutorFormNew(props) {
    const [courses, setCourses] = React.useState([]);

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Tutor Information
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        id="Description"
                        name="Description"
                        label="Enter Your Page Description."
                        placeholder="Please include the classes you are tutoring for, who you took it with, and your grade."
                        fullWidth
                        multiline
                        variant="standard"
                        onChange={(e) => props.setTutor(previousState => {
                            return { ...previousState, description: e.target.value }
                        })}
                    />
                </Grid>
                <DropdownCourseName courses={courses} setCourses={setCourses} />
                <DropdownClassesTutors courses={courses} setTutor={props.setTutor} />
            </Grid>
        </React.Fragment>
    );
}