import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

export default function DynamicBox(props) {
    const { image, name, description, email } = props;
    return (
        <Grid item container
            justifyContent="center"
            alignItems="center">
            <CssBaseline />
            <Card
                sx={{
                    width: "60%",
                }}
            >
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="500"
                        image={image}
                        alt="sarah"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {name}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            {description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Typography gutterBottom variant="h8" component="div">
                        {email}
                    </Typography>
                </CardActions>
            </Card>
        </Grid>
    );
}