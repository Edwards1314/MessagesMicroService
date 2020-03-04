# MessagesMicroService: 20.45.2.190:8080
This is the micro service that handles the messages users send to one another.

Run "npm install" if it's the first time running the app.


# REQUEST
{
    chatId: {type:String, required: true},
    user: {
        name: {type:String, required: true},
        id: {type:String, required: true}
    },
    timestamp: {type:Date, required: true},
    text: {type:String, required: false},
    mediaLocation: {type:String, required: false}
}