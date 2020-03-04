export const Properties = {
    NODE_ENV:process.env.NODE_ENV == null ? "development" : process.env.NODE_ENV,
    PORT:process.env.PORT == null ? 8080 : process.env.PORT,
    databaseURL:process.env.databaseURL == null ? "mongodb+srv://admin:admin@messaging-beyqa.azure.mongodb.net/test?retryWrites=true&w=majority" : process.env.databaseURL,
    databaseUsername:process.env.databaseUsername == null ? "admin" : process.env.databaseUsername,
    databasePassword:process.env.databasePassword == null ? "admin" : process.env.databasePassword
}