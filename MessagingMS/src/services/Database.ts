import mysql from "mysql";
import { Message } from "../classes/Message";
import { User } from "../classes/User"

export class Database {

    private connection: mysql.Connection
    private table: string = "Messages";

    constructor() {
        console.log(process.env.databaseURL)
        this.connection = mysql.createConnection({
            host: process.env.databaseURL,
            user: process.env.databaseUsername,
            password: process.env.databasePassword,
            database: process.env.databaseUsername
        });
        this.connection.connect((err) => {
            if(err) throw err;
            console.log("Connected to " + process.env.databaseURL);
        })
    }

    public addMessage(msg: Message) {
        let user: User = msg.getUser();
        mysql.Types.DATE
        let sql = "INSERT INTO " + this.table
            + " VALUES ('" + user.getId() + "','" + msg.getChatId()
            + "'," + this.connection.escape(msg.getDate()) + ",'" + msg.getText()
            + "','" + msg.getMediaLocation() + "');";
        console.log(sql);
        this.connection.query(sql, (err, result) => {
            if (err) throw err;
            console.log(JSON.stringify(msg) + " inserted into " + this.table);
        });
        

    }


}