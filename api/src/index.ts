import express, {Application} from "express";
import routes from "./routes/routes";
import cors from "cors";

const app: Application = express();
const PORT: number = 8080;

//app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/", routes);

