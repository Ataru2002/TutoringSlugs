import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import UploadTranscript from './UploadTranscript.js'

export default function UnofficalTranscript(props) {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Upload Your Unoffical transcript!
            </Typography>
            <Grid container spacing={0}>
                <UploadTranscript setTutor={props.setTutor} />
            </Grid>
        </React.Fragment>
    );
}