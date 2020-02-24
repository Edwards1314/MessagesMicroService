import { User } from "./User";

/* for images and gifs. we will store it on the server
*  with the timestamp as the name
*  and we store the data as 
*  http://server:port/media/imgName
*/

export class Message {
    private chatId: string;
    private user: User;
    private timestamp: Date;
    private text?: string;
    private mediaLocation?: string;

    constructor(chatId: string, user: User, timestamp: Date, text?: string, mediaLocation?: string) {
        this.chatId = chatId;
        this.user = user;
        this.text = text;
        this.mediaLocation = mediaLocation;
        this.timestamp = timestamp;
    }
    public getChatId(): string { return this.chatId; }
    public getUser(): User { return this.user; }
    public getDate(): Date { return this.timestamp; }
    public getText(): string { return this.text == null ? "" : this.text; }
    public getMediaLocation(): string { return this.mediaLocation == null ? "" : this.mediaLocation; }    

}
