import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import UploadImg from './UploadImg.js'

export default function UploadPicture(props) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Upload Your Picture!
      </Typography>
      <Grid container spacing={0}>
        <UploadImg setTutor={props.setTutor}/>
      </Grid>
    </React.Fragment>
  );
}