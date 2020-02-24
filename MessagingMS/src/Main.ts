import express from "express";
import bodyParser from "body-parser"
import { Message } from "./classes/Message";
import { User } from "./classes/User";
import { Database } from "./services/Database"

const app = express();
const port: number = 8080;
app.use(bodyParser.json())
const database = new Database();

app.post('/', (req, res) => {
    let name: string = req.body.user.name;
    let id: string = req.body.user.id;
    let user: User = new User(name, id);

    let chatId = req.body.chatId;
    let timestamp = new Date();
    let text = req.body.text;
    let mediaLocation = req.body.mediaLocation;
    if(mediaLocation){
        mediaLocation = "http://localhost:"+port+"/media/"+timestamp.getTime();
    }
    let msg: Message = new Message(chatId, user, timestamp, text, mediaLocation);
    database.addMessage(msg);

    console.log("MESSAGE\n" + JSON.stringify(msg))
    res.send(msg)
    res.end()
})

app.listen(port, () => {
    console.log("App Started at http://localhost:" + port)
})



