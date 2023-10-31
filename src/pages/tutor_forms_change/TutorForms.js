import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Dropdownclasses from '../../components/Dropdownclasses';

export default function TutorFormUpdate() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Tutor Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="phonenumber"
            name="phonenumber"
            label="Phone Number"
            fullWidth
            autoComplete="tel"
            variant="standard"
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
          />
        </Grid>
        <Dropdownclasses />
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Put phone number in your public tutor page"
          />
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Remove phone number in your public tutor page"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}