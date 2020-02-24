import mysql from "mysql";
import { Message } from "../classes/Message";
import { User } from "../classes/User"
import { databaseURL, databaseUsername, databasePassword } from "../../Properties"

export class Database {

    private connection: mysql.Connection
    private table: string = "Messages";

    constructor() {
        this.connection = mysql.createConnection({
            host: databaseURL,
            user: databaseUsername,
            password: databasePassword,
            database: databaseUsername
        });
        this.connection.connect((err) => {
            if(err) throw err;
            console.log("Connected to " + databaseURL);
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