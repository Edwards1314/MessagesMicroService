import express from "express";
import bodyParser from "body-parser"
import figlet from "figlet";
import dotenv from "dotenv";
import { Database } from "./services/Database";
import { MessageController } from "./controller/MessageController";

dotenv.config();
const app = express();
app.use(bodyParser.json());
Database.connect();
const port = process.env.PORT;

//starting the controllers
MessageController.start(app, "/sendmessage")

app.listen(port, () => {
    figlet("MessagingMS", (err, data) => {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(data);
    })
    console.log("App Started at http://localhost:" + port);
})



