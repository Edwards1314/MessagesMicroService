import { Message } from "../classes/Message";
import { User } from "../classes/User";
import { Properties } from "../Properties";

export function getMessage(body: any): Message{
        
    let name: string = body.user.name;
    let id: string = body.user.id;
    let user: User = new User(name, id);

    let chatId = body.chatId;
    let timestamp = new Date();
    let text = body.text;
    let mediaLocation = body.mediaLocation;
    if (mediaLocation) {
        mediaLocation = "http://localhost:" + Properties.PORT + "/media/" + timestamp.getTime();
    }
    return  new Message(chatId, user, timestamp, text, mediaLocation);
}

export function endsWithNumber(chatId: string): boolean{
    return !isNaN(parseInt(chatId.charAt(chatId.length-1)));
}