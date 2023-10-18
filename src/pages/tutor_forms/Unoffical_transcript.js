import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Upload from '../../components/Upload.js'

export default function PaymentForm() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Upload Your Unoffical transcript!
      </Typography>
      <Grid container spacing={0}>
      <Upload />
      
      </Grid>
    </React.Fragment>
  );
}