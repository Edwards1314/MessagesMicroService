import mysql from "mysql";
import { Message } from "../classes/Message";
import { User } from "../classes/User"
import { Properties } from "../Properties"

export class Database {

    private static  connection: mysql.Connection
    private static table: string = "Messages";

    public static connect() {
        console.log(Properties.databaseURL)
        this.connection = mysql.createConnection({
            host: Properties.databaseURL,
            user: Properties.databaseUsername,
            password: Properties.databasePassword,
            database: Properties.databaseUsername
        });
        this.connection.connect((err) => {
            if(err) throw err;
            console.log("Connected to " + Properties.databaseURL);
        })
    }

    public static addMessage(msg: Message) {
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