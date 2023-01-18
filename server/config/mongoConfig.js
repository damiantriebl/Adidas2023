import * as Mongoose from 'mongoose';
import * as dotenv from 'dotenv'
import {usuarioModel, productosModel, carroModel, comentariosModel, ordenesModel, chatModel} from '../model/all.model.js';
dotenv.config()

let database;
export const connect = () => {
    // Add your own uri below, here my dbname is UserDB
    // and we are using the local mongodb
  // const url = process.env.MONGO_URI;
    const url = "mongodb+srv://damian:05550Kayak@cluster1.mqi7dv8.mongodb.net/ecommerce"
  
    if (database) {
        return;
    }
    // In order to fix all the deprecation warnings, 
    // below are needed while connecting
    Mongoose.connect(url,  (err) => {
        if (err) throw err;
        console.log("mongodb conectado");
      });
  
    database = Mongoose.connection;
  
  
    return {
        usuarioModel,
        productosModel,
        carroModel,
        comentariosModel,
        ordenesModel,
        chatModel
    };
};
  
// Safer way to get disconnected
export const disconnect = () => {
    if (!database) {
        return;
    }
  
    Mongoose.disconnect();
};