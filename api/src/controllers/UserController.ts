import {Request, Response} from 'express';
import * as admin from "firebase-admin";

class UserController {

    static getUserData = async (req: Request, res: Response) => {
        admin.auth().getUser(req.userId).then((user) => {
            res.send(user);
        })
        .catch((error) => {
            res.send(error);
        });
    }

}

export default UserController;
