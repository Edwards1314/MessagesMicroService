# MessagesMicroService: 20.45.2.190:8080
This is the micro service that handles the messages users send to one another.

Run "npm install" if it's the first time running the app.

# APIS
POST /api/messages/sendmessage
- sends a message

POST /api/messages/deletechat?chatId=yourchatid
- Deletes the specified chat(db collection)

GET /api/messages/getmessages?chatId=yourchatid
- Returns messages from the chatid specified

GET /api/messages/sync
- currently returns the names of all collections in db

# REQUEST
{
	"chatId": "string",
	"exists": false,
	"text": "string",
	"mediaLocation": "string",
	"from": {
		"name": "joel",
		"id": "creator"
	},
	"users": [
		{
			
			"name": "Rhett",
			"id": "creator1"
			
		}	
	]
	
}