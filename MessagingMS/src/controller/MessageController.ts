import express from "express";
import { User } from "../classes/User";
import { Message } from "../classes/Message";
import { Database } from "../services/Database";

export class MessageController{

    public static start(app: express.Application, resource: string){
        app.post(resource, (req, res) => {
            let msg: Message = this.getMessage(req.body);
            Database.addMessage(msg);        
            console.log("MESSAGE\n" + JSON.stringify(msg));
            res.send(msg);
            res.end();
        });
    }

    private static getMessage(body: any): Message{
        let name: string = body.user.name;
        let id: string = body.user.id;
        let user: User = new User(name, id);
    
        let chatId = body.chatId;
        let timestamp = new Date();
        let text = body.text;
        let mediaLocation = body.mediaLocation;
        if (mediaLocation) {
            mediaLocation = "http://localhost:" + process.env.PORT + "/media/" + timestamp.getTime();
        }
        return  new Message(chatId, user, timestamp, text, mediaLocation);
    }

    

}