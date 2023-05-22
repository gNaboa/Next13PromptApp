import mongoose from "mongoose";

let isConnected = false
export const connectToDb = async ()=>{
    mongoose.set('strictQuery',true);

    if(isConnected){
        console.log("Connected to database")
        return;
    }
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        isConnected=true
        console.log("MongoDb connected")
    }catch(e){
         console.log("errei::",e)
    }
}  