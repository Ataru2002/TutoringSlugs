import express, {Application} from "express";
import routes from "./routes/routes";

const app: Application = express();
const PORT: number = 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/", routes);

