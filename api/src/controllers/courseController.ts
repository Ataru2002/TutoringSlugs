import {Request, Response} from 'express';
import * as fs from 'fs';
var course_list : Array<String> = [];

class CourseController {

    // Get: get singular course info, thiss will be called on the course page, has list of users etc
    static get = async (req: Request, res: Response) => {
        var id : string = req.query.id as string;
        var found = false;
        if(typeof id !== "undefined"){
            fs.readFile("./src/test_data/all_classes.json", "utf8", (err, data) => {
                if(err){
                    console.error(err);
                    return;
                }
                var courses = JSON.parse(data);
                for(var department of courses){
                    if(id in department["classes"]){
                        res.send({courseId: id, link: department["classes"][id]});
                        found = true;
                    }
                }
            })
        }
        else {
            res.status(400).send("No course id provided");
        }
        if(!found) res.status(404).send("Course not found");
    }

    // List: Ideally we would paginate this data so we don't return a giant object
    // Have optional department query to filter results.
    static list = async (req: Request, res: Response) => {
        fs.readFile("./src/test_data/all_classes.json", "utf8", (err, data) => {
            if(err){
                console.error(err);
                return;
            }
            var courses = JSON.parse(data);
            for(var department of courses){
                course_list = course_list.concat(Object.keys(department["classes"]));
            }

            res.send(course_list);
        })
    }

    // Tutor: Enlists the user as a tutor for the specified course
    static tutor = async (req: Request, res: Response) => {

        console.log(JSON.stringify(req.body));

        var courseId : string = req.body.courseId;
        var userId : string = req.body.userId;
        var name : string = req.body.name;

        res.send("Success: " + name + " with user id " + userId + " signed up as tutor for course " + courseId);
    }

}

export default CourseController;

