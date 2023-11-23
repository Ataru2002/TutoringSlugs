import {Request, Response} from 'express';
import firebase from "../services/firebase";

class UserController {

    static getUserData = async (req: Request, res: Response) => {
        firebase.admin.auth().getUser(req.userId).then((user) => {
            res.send(user);
        })
        .catch((error) => {
            res.send(error);
        });
    }

}

export default UserController;
