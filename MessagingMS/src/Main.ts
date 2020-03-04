import express, { response } from "express";
import bodyParser from "body-parser"
import figlet from "figlet";
import dotenv from "dotenv";
import path from "path";
dotenv.config();
import { Properties } from "./Properties"
import messageController from "./controller/MessageController"

const app: express.Application = express();
app.use(bodyParser.json());
const port = Properties.PORT;
app.route("./controller/MessageController")

//Starting the routes
messageController(app);

//HOME DIRECTORY
app.get("/", (req, res) => {
    let file: string = path.join(__dirname+"/index.html");
    res.sendFile(file, (err) => {
        if(err){
            res.status(404);
            res.send(err.message);
        }
        res.end();
    })    
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



