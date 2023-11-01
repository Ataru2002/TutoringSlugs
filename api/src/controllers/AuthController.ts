import {Request, Response} from "express";
import config from "../config/config";
import * as jwt from "jsonwebtoken";

class AuthController {
    static login = async (req: Request, res: Response) => {
        // Firebase token
        var firebaseToken = req.body.token;
        console.log("firebase token: " + firebaseToken);

        // Database stuff
        var userId = "test";

        // Sign JWT valid for 1 hour
        const token = jwt.sign(
            {userId},
            config.jwtSecret,
            {expiresIn: "1h"}
        )

        res.send(token);
    }

    static logout = async (req: Request, res: Response) => {
        res.send("logged out");
    }
}

export default AuthController;