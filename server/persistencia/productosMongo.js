import { connect } from "../config/mongoConfig.js";

class productosDaoMongo {
  constructor(db) {
    this.db = connect().productosModel;
  }
  async save(producto) {
    try {
      let productoUpload = producto;
      let getIds = await this.db.find({}).limit(1).
      sort('-id');
      console.log('dtcon', getIds)
      productoUpload.id = getIds[0].id + 1
      let productoObj = await this.db.create(productoUpload);
      productoObj.save();
      return productoObj;
    } catch (error) {
      console.log("hay un error ", error);
      return { error: error.message };
    }
  }
  async getById(id) {
    try {
      let getById = await this.db.findOne({id});
      return { success: true, data: getById };;
    } catch (error) {
      return { success: false, data: null , error: error.message };
    }
  }
 
  async getAll() {
    try {
      let getall = await this.db.find({});
      return { success: true, data: getall };;
    } catch (error) {
      return { success: false ,error: error.message };
    }
  }
  async getForType(tipo) {
    try {
      let getForType = await this.db.find({tipo});
      return { success: true, data: getForType };;
    } catch (error) {
      return { success: false ,error: error.message };
    }
  }
  async updateById(id, obj) {
        try{
            if(obj.producto && obj.precio && obj.thumbnail){
                let producto =  await this.db.findOneAndUpdate(
                    {"id": id},
                    {
                    "producto": obj.producto,
                    "precio": obj.precio,
                    "thumbnail": obj.thumbnail,
                    "tipo": obj.tipo
                });
                return producto
            }else{
                return {error: "no tiene ese producto"}
            }
        }catch(error){
            return {error: error.message}
        }
    }
  async deleteById(id) {
    try {
      let deleteId = await this.db.deleteOne({ _id: id });
      return deleteId;
    } catch (error) {
      return { error: error.message };
    }
  }
}

export default productosDaoMongo;