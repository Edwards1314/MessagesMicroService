import {route, deleteChat, getmessages} from "../services/Database"
import express from "express";

export default function MessageController(app: express.Application){
    
    // adding a message
    app.post("/sendmessage", route);

    // deleting the chat
    app.post("/deletechat", deleteChat);

    // get all the messages from a specific thread
    app.get("/getmessages", getmessages);

}