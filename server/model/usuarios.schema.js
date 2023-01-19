import * as Mongoose from "mongoose";
  
const UsuarioSchema = new Mongoose.Schema({
    email: String,
    password: String,
    edad: Number,
    nombre: String,
    direccion: String,
    telefono: String,
  //  avatar: String,
    isAdmin: Boolean,
    dateOfJoining: {
        type: Date,
        default: new Date(),
    },
    lastUpdated: {
        type: Date,
        default: new Date(),
    },
});
  
export default UsuarioSchema;