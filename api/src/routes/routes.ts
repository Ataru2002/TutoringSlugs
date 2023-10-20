import express, {Application, Router} from 'express';

export function use(app : Application){
    app.use("/course", require('./course'));
}