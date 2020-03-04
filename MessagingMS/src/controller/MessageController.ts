import {addMessage, deleteChat} from "../services/Database"
import express from "express";

export default function MessageController(app: express.Application){
    
    // adding a message
    app.post("/sendmessage", addMessage);

    // deleting the chat
    app.post("/deletechat", deleteChat);
    

}