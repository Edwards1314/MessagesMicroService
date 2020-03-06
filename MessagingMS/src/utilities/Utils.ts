import { Message } from "../classes/Message";
import { User } from "../classes/User";
import { Properties } from "../Properties";
import { DatabaseObject } from "../classes/DatabaseObject";

export const getDbObject = (body: any): DatabaseObject => {
    let users: User[] = [];
    body.users.forEach( (user: any) => {
        users.push(new User(user.user.name, user.user.id));
    });
    let msg: Message = getMessage(body);
    users.push(msg.getUser());
    return new DatabaseObject(body.chatId, users, [msg]);
}

export const getMessage = (body: any): Message => {
    let timestamp = new Date();
    let text = body.text;
    let from: User = new User(body.from.name, body.from.id)
    let mediaLocation = body.mediaLocation;
    if (mediaLocation) {
        mediaLocation = "http://localhost:" + Properties.PORT + "/media/" + timestamp.getTime();
    }
    return new Message(from, timestamp, text, mediaLocation);
}

export const threadExists = (): boolean => {
    return true;
}

// private from: User;
// private timestamp: Date;
// private text?: string;
// private mediaLocation?: string;