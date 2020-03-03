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

const Messages = mongoose.model("Messages", MessagesSchema);

export default async function addMessage(msg:Message, fn:any) {
    let message = new Messages(msg);
    return message.save((err: Error) => {
        if(err){
            fn(err.message);
        }else{
            fn("SUCCESS");
        }
    })
}


    
        
        
    

    // public static addMessage(msg: Message) {
    //     let user: User = msg.getUser();
    //     mysql.Types.DATE
    //     let sql = "INSERT INTO " + this.table
    //         + " VALUES ('" + user.getId() + "','" + msg.getChatId()
    //         + "'," + this.connection.escape(msg.getDate()) + ",'" + msg.getText()
    //         + "','" + msg.getMediaLocation() + "');";
    //     console.log(sql);
    //     this.connection.query(sql, (err, result) => {
    //         if (err) throw err;
    //         console.log(JSON.stringify(msg) + " inserted into " + this.table);
    //     });
        

    // }


