const mongoose = require('mongoose');
require('dotenv').config();

export class Database {
    private uri: String;
    private  options = {
        serverSelectionTimeoutMS: 5000,
        autoIndex: true
    };

    constructor(){
        if(process.env.DB_USERNAME && process.env.DB_PASSWORD && process.env.DB_NAME){
            var username =  process.env.DB_USERNAME;
            var password = process.env.DB_PASSWORD;
            var dbname = process.env.DB_NAME; 
            // this.uri = `mongodb://admin:admin@localhost:27017/machinevisor`
            this.uri = `mongodb+srv://${username}:${password}@cluster0.wl0fg.mongodb.net/${dbname}?retryWrites=true&w=majority`
        }else{
            console.error("Some enviroument varriable are not setted: " + process.env.DB_USERNAME)
            this.uri = '';
        }
    }

    public async connectDB() {
        if(this.uri !== ''){
            await mongoose.connect(this.uri, this.options);
            var db = mongoose.connection
            db.on("error", console.error.bind(console, "connection error: "));
            db.once("open",  async function () {
              console.log("Connected successfully to mongodb");
              
              
            });
        }else{
            console.error("DB uri is empty");
        }
    }
}

