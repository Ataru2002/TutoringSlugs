import express, {Application} from 'express';
import {use} from './src/routes/routes';

const app: Application = express();
const PORT: number = 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

use(app);

