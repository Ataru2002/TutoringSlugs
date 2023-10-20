import {Request, Response} from 'express';

export function index(req: Request, res: Response){
    res.send([{courseId: "CSE 30", courseName: "Programming Abstractions: Python"}]);
}