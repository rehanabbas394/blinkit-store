import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongo_uri = process.env.MONGO_URI

if(!mongo_uri) {
    throw new Error("MONGO_URI is not defined in the environment variables");
}

async function connectDB() { 
    try {
        await mongoose.connect(mongo_uri)
        
    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error; // Re-throw the error to be handled by the caller
    }
}

export default connectDB;