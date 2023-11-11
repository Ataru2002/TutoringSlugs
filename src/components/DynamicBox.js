import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BasicRating from '../components/BasicRatings';

const defaultTheme = createTheme();

export default function DynamicBox(props) {
    const { image, name, description, email } = props;
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
        <Grid item container 
        justifyContent="center"
        alignItems="center">
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
                        <BasicRating />
                        <Typography variant="body2" color="text.secondary">
                            {description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                        {email}
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    </ThemeProvider>
  );
}