import mongoose from "mongoose";
import { Properties } from "../Properties"
import { Request, Response } from "express";
import { getMessage, getDbObject } from "../utilities/Utils";
import { DatabaseObject } from "../classes/DatabaseObject";

const options: mongoose.ConnectionOptions = {
    useNewUrlParser: true,
    dbName: "Messages"
};

mongoose.connect(Properties.databaseURL, options, (err) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log("Connected to " + Properties.databaseURL);
    }
});

const MessagesSchema: mongoose.Schema = new mongoose.Schema({
    chatId: { type: String, required: true },
    users: [
        {   
            name: { type: String, required: true },
            id: { type: String, required: true }
        }
    ],
    messages:[{
        from:{
            name: { type: String, required: true },
            id: { type: String, required: true }
        },
        message: { type: String, required: false },
        mediaLocation: { type: String, required: false },
        timestamp: { type: Date, required: true }
    }]    
});

/**
 * ROUTING
 * if the chat exists then it goes to the update
 * otherwise to add
 */
export async function route(req: Request, res: Response) {
    if (req.body.exists == true) {
        update(res, req.body);
    } else {
        addMessage(res, req.body);
    }

}

/**
 * DELETE
 * Deletes an entire chat from
 * the database
 */
export async function deleteChat(req: Request, res: Response) {
    let chatId: string = req.query.chatId;
    if (chatId == null) {
        res.status(400);
        res.send("We need a chatId");
        res.end();
        return;
    } else {
        return mongoose.connection.dropCollection(chatId, (err: Error) => {
            if (err) {
                res.status(404);
                res.send(err);
            } else {
                res.send({
                    status: "SUCCESS",
                    deleted: req.query.chatId
                })
            }
            res.end();
        });
    }
}

/**
 * GET
 * Get all the messages from a specific thread/chat 
 */
export const getmessages = async (req: Request, res: Response) => {
    let Chat = mongoose.model(req.query.chatId, MessagesSchema, req.query.chatId); 
    return Chat.findOne({chatId: req.query.chatId}, (err, chat) => {
        if (err){
            res.status(404);
            console.log(err);
            res.send(err);
        }else{        
            try{
                console.log("================"+req.query.chatId+" MESSAGES================")
                console.log(chat)
                //@ts-ignore
                res.send(chat!.messages);
            }catch(readErr){
                res.status(500);
                console.log(readErr);
                res.send(readErr);
            }
        }
        res.end();
    });
}

/**
 * SYNC
 * For when client reinstalls then this should be called in order to sync
 * back their messages
 */
export const sync = async (req: Request, res: Response) => {
    let chats: string[] = [];
    await(await mongoose.connection.db.collections()).forEach(collection => {
        chats.push(collection.collectionName)
    })
    res.send({"status": "SUCCESS", "chats": chats})
    res.end();
}

/**
 * ADD
 * If message exists then just append message to the messages
 * array
 */
const addMessage = async (res: Response, body: any) => {
    let dbObject: DatabaseObject = getDbObject(body);
    let Chat = mongoose.model(body.chatId, MessagesSchema, body.chatId);
    let message = new Chat(dbObject);
    return message.save((err: Error) => {
        if (err) {
            res.status(400);
            res.send(err);
            console.log(err);
        } else {
            res.send({
                _id: message._id,
                added: dbObject
            });
            console.log("================"+body.chatId+" ADDED================")
            console.log({
                _id: message._id,
                added: dbObject
            });
            console.log(dbObject);
        }
        res.end();
    })
}

/**
 * UPDATE
 * If message exists then just append message to the messages
 * array
 */
const update = async (res: Response, body: any) => {
    let Chat = mongoose.model(body.chatId, MessagesSchema, body.chatId);    
    return Chat.findOne({chatId: body.chatId}, (err, chat) => {
        if (err){
            res.status(404);
            console.log(err);
            res.send(err);
        }else{        
            try{
                //@ts-ignore 
                chat!.messages!.push(getMessage(body));
                console.log("================"+body.chatId+" UPDATED================")
                console.log(body)
                res.send(body);
            }catch(saveErr){
                res.status(500);
                console.log(saveErr);
                res.send(saveErr);
            }
        }
        chat?.save();
        res.end();
    });
}

//if thread doesn't exist then also add the chatid under the users "associated chats" 
//so we can listen to it.
//learn how to create a listening route. ***RxJs Observables***



