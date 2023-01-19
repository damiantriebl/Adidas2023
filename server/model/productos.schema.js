import * as Mongoose from "mongoose";
  
const ProductosSchema = new Mongoose.Schema({
    id: Number,
    producto: String,
    precio: String,
    thumbnail: String,
    tipo: String,
    dateOfInsert: {
        type: Date,
        default: new Date(),
    },
    lastUpdated: {
        type: Date,
        default: new Date(),
    },
});
  
export default ProductosSchema;