import { User } from "./User";

/* for images and gifs. we will store it on the server
*  with the timestamp as the name
*  and we store the data as 
*  http://server:port/media/imgName
*/

export class Message {
    private from: User;
    private timestamp: Date;
    private message?: string;
    private mediaLocation?: string;

    constructor(from: User, timestamp: Date, message?: string, mediaLocation?: string) {
        this.from = from;
        this.message = message;
        this.mediaLocation = mediaLocation;
        this.timestamp = timestamp;
    }
    public getUser(): User { return this.from; }
    public getDate(): Date { return this.timestamp; }
    public getMessage(): string { return this.message == null ? "" : this.message; }
    public getMediaLocation(): string { return this.mediaLocation == null ? "" : this.mediaLocation; }    

}
