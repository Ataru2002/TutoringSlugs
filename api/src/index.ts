// index.ts
// Main class of the Node.js server. Set headers, middlewares, and initializes express server.

import express, {Application} from "express";
import routes from "./routes/routes";
import cookies from "cookie-parser";

const app: Application = express();
const PORT: number = 8080;

app.use(cookies());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Credentials", "true");
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

