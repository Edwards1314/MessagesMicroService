import express from "express";
import { User } from "../classes/User";
import { Message } from "../classes/Message";
import { Properties } from "../Properties";
import  addMessage  from "../services/Database"

export class MessageController{

    public static start(app: express.Application, resource: string){
        app.post(resource, async (req, res) => {
            let msg: Message = this.getMessage(req.body);

            await addMessage(msg, (response: string) => {
                if(response == "SUCCESS"){
                    res.send(msg);
                    console.log(msg);
                }else{ 
                    res.status(400);
                    res.send(response);
                    console.log(response)
                }
                res.end();
            })

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
            mediaLocation = "http://localhost:" + Properties.PORT + "/media/" + timestamp.getTime();
        }
        return  new Message(chatId, user, timestamp, text, mediaLocation);
    }

    

}