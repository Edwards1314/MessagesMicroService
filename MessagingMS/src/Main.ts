import express from "express";
import bodyParser from "body-parser"
import figlet from "figlet";
import dotenv from "dotenv";
dotenv.config();
import { Properties } from "./Properties"
import messageController from "./controller/MessageController"
import home from "./controller/HomeController";
import cors from "cors";

const app: express.Application = express();
app.use(bodyParser.json());
app.use(cors());
const port = Properties.PORT;
app.route("./controller/MessageController")

//Starting the routes
messageController(app);
home(app);


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



