import express from "express";
import mysql from "mysql";
import {Person} from "./classes/Person"

const app = express();
const port: number = 8080;


let person = new Person("Karl Marx", 69, ["Rasputin", "Greg"]);
app.post('/', (req, res) => {
    res.send(person)
})
.listen(port, () => {
    console.log("App Started at http://localhost:"+port)
})



