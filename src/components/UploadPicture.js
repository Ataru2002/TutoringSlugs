import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Upload from './Upload.js'

export default function UploadPicture() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Upload Your Picture!
      </Typography>
      <Grid container spacing={0}>
        <Upload />
      </Grid>
    </React.Fragment>
  );
}