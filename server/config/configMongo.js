import * as Mongoose from 'mongoose';
import * as dotenv from 'dotenv'
import {usuarioModel} from '../model/all.model.js';
dotenv.config()

let database;
export const connect = () => {
    // Add your own uri below, here my dbname is UserDB
    // and we are using the local mongodb
    const url = process.env.MONGO_URI;
    
  
    if (database) {
        return;
    }
    // In order to fix all the deprecation warnings, 
    // below are needed while connecting
    Mongoose.connect(url);
  
    database = Mongoose.connection;
  
  
    return {
        usuarioModel,
    };
};
  
// Safer way to get disconnected
export const disconnect = () => {
    if (!database) {
        return;
    }
  
    Mongoose.disconnect();
};