import express from "express";
import bodyParser from "body-parser"
import figlet from "figlet";
import dotenv from "dotenv";
import { Database } from "./services/Database";
import { MessageController } from "./controller/MessageController";

dotenv.config();
import { Properties } from "./Properties"
const app = express();
app.use(bodyParser.json());
Database.connect();
const port = Properties.PORT;

//starting the controllers
// MessageController.start(app, "/sendmessage")

app.get("/", (req, res) => {
    const obj={
        "PORT": Properties.PORT,
        "URL":Properties.databaseURL,
        "USERNAME":Properties.databaseUsername,
        "PASSWORD":Properties.databasePassword
    }
    console.log(JSON.stringify(obj))
    res.send(JSON.stringify(obj));
    res.end()
})

app.listen(port, () => {
    figlet("MessagingMS", (err, data) => {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(data);
    })
    console.log("PORT="+Properties.PORT);
    console.log("URL="+Properties.databaseURL);
    console.log("Username="+Properties.databaseUsername);
    console.log("Password="+Properties.databasePassword);
    console.log("App Started at http://localhost:" + port);
})



