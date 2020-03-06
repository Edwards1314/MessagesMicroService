import express from "express";
import path from "path";


export default function HomeController(app: express.Application){
    app.get("/", (req, res) => {
        let file: string = path.join(__dirname, "/../index.html");
        res.sendFile(file, (err) => {
            if(err){
                res.status(404);
                res.send(err.message);
            }
            res.end();
        })    
    })

}