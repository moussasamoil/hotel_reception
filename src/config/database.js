import mongoose from "mongoose";


export async function connectionDB() {
    try{
     await mongoose.connect(process.env.CONNECTION_STRING);
     console.log(`connect to db successfully`)
    }catch(err){
        console.log(err);
    }
    
}