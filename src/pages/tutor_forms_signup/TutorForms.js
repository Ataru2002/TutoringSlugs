import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Dropdownclasses from '../../components/Dropdownclasses';

export default function TutorFormNew(props) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Tutor Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            onChange={(e) => props.setTutor(previousState => {
              return { ...previousState, firstName: e.target.value }
            })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            onChange={(e) => props.setTutor(previousState => {
              return { ...previousState, lastName: e.target.value }
            })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="phonenumber"
            name="phonenumber"
            label="Phone Number"
            fullWidth
            autoComplete="tel"
            variant="standard"
            onChange={(e) => props.setTutor(previousState => {
              return { ...previousState, phoneNum: e.target.value }
            })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="Description"
            name="Description"
            label="Enter Your Page Description"
            fullWidth
            multiline
            variant="standard"
            onChange={(e) => props.setTutor(previousState => {
              return { ...previousState, description: e.target.value }
            })}
          />
        </Grid>
        <Dropdownclasses setTutor={props.setTutor}/>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Put phone number in your public tutor page"
            onChange={(e) => props.setTutor(previousState => {
              return { ...previousState, public: e.target.value }
            })}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}