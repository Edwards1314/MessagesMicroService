import mongoose from "mongoose";
import { Properties } from "../Properties"
import { Message } from "../classes/Message";

const options:mongoose.ConnectionOptions = {
    useNewUrlParser: true
}

mongoose.connect(Properties.databaseURL,options, (err) => {
    if(err){
        console.log(err.message);
    }else{
        console.log("Connected to " + Properties.databaseURL);
    }
});

const MessagesSchema: mongoose.Schema = new mongoose.Schema({
    chatId: {type:String, required: true},
    user: {
        name: {type:String, required: true},
        id: {type:String, required: true}
    },
    timestamp: {type:Date, required: true},
    text: {type:String, required: false},
    mediaLocation: {type:String, required: false}
})

//create a new message
export default async function addMessage(msg:Message, fn:any) {
    let Chat = mongoose.model(msg.getChatId(), MessagesSchema);
    let message = new Chat(msg);
    return message.save((err: Error) => {
        if(err){
            fn(err.message);
        }else{
            fn("SUCCESS");
        }
    })
}

//delete thread
//if thread doesn't exist then also add the chatid under the users "associated chats" 
//so we can listen to it.
//learn how to create a listening route. ***RxJs Observables***



