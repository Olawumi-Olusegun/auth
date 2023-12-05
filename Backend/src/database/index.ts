import mongoose from "mongoose";

import * as dotenv from 'dotenv'

dotenv.config();

mongoose.set('strictQuery', false);

export const connectToDatabase = async () => {

    try {
        if(mongoose.connection.readyState !== 0) {
            return console.log("Already connected to database");
        }

        const conn =  await mongoose.connect(process.env.MONGODB_URI || '');

        if(conn.connection.readyState === 1) {
            console.log("Connection to database established!");
            return Promise.resolve(true);
      }

    } catch (error) {
        return Promise.reject(error);
    }
}