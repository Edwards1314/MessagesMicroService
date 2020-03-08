import {route, deleteChat, getmessages, sync} from "../services/Database"
import express from "express";

export default function MessageController(app: express.Application){
    
    // adding a message
    app.post("/api/messages/sendmessage", route);

    // deleting the chat
    app.post("/api/messages/deletechat", deleteChat);

    // get all the messages from a specific thread
    app.get("/api/messages/getmessages", getmessages);

    // get all the messages from a specific thread
    app.get("/api/messages/sync", sync);

}