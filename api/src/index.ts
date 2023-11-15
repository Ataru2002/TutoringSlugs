import express, {Application} from "express";
import routes from "./routes/routes";
import cors from "cors";

const app: Application = express();
const PORT: number = 8080;

app.use(cors());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/", routes);

