import { User } from "./User";
import { Message } from "./Message";

export class DatabaseObject{

    private chatId: string;
    private users: User[];
    private messages: Message[];

    constructor(chatId: string, users: User[], messages: Message[]) {
        this.chatId = chatId;
        this.users = users;
        this.messages = messages;
    }
    public getUsers(): User[] { return this.users; }
    public getMessages(): Message[] { return this.messages; } 
    public getId(): string { return this.chatId; } 

}