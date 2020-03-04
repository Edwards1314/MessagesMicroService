import mongoose, { mongo } from "mongoose";
import { Properties } from "../Properties"
import { Message } from "../classes/Message";
import {Request, Response} from "express";
import { getMessage, endsWithNumber } from "../utilities/Utils";

const options:mongoose.ConnectionOptions = {
    useNewUrlParser: true
}
const schemaOptions: mongoose.SchemaOptions = {

}

mongoose.connect(Properties.databaseURL,options, (err) => {
    if(err){
        console.log(err.message);
    }else{
        console.log("Connected to " + Properties.databaseURL);
    }
});

const MessagesSchema: mongoose.Schema = new mongoose.Schema({
    user: {
        name: {type:String, required: true},
        id: {type:String, required: true}
    },
    timestamp: {type:Date, required: true},
    text: {type:String, required: false},
    mediaLocation: {type:String, required: false}
}, schemaOptions);

//add message
export async function addMessage(req: Request, res: Response) {
    let msg: Message = getMessage(req.body);
    let Chat = mongoose.model(msg.getChatId(), MessagesSchema);
    let message = new Chat(msg);
    return message.save((err: Error) => {
        if(err){
            res.status(400);
            res.send(err);
            console.log(err);
        }else{ 
            res.send(msg);
            console.log(msg);
        }
        res.end();
    })
}

//delete thread
export async function deleteChat(req: Request, res: Response) {
    let chatId: string = req.query.chatId;
    if(chatId == null){
        res.status(400);
        res.send("We need a chatId");
        res.end(); 
        return;
    }else{
        if(!endsWithNumber(chatId)) chatId+="s";
        return mongoose.connection.dropCollection(chatId.toLowerCase(), (err: Error) => {
            if(err){
                res.status(404);
                res.send(err);
            }else{
                res.send("SUCCESS")
            }
            res.end(); 
        });
    }   
}

//if thread doesn't exist then also add the chatid under the users "associated chats" 
//so we can listen to it.
//learn how to create a listening route. ***RxJs Observables***



