import productosDaoMongo from "../persistencia/productosMongo.js";

class productosNormalizer {
  constructor() {}
  async guardarProducto(obj) {
    if (
      obj.producto &&
      obj.precio &&
      obj.thumbnail
    ) {
      const producto = {
        producto: obj.producto,
        precio: obj.precio,
        thumbnail: obj.thumbnail  ,
        tipo: obj.tipo            
      };
      const productoGuardado = await new productosDaoMongo().save(producto)
      return {message: "se cargo correctamente", success: "err", data: productoGuardado}
    }else{
        return {message: "no cumple con los requisitos", success: "err"}
    }
  }
  async cargarTodosLosProductos() {  
        const productos =  await new productosDaoMongo().getAll()
        if(productos.data?.length > 0){
            return {message: "Productos encontrados", data: productos.data, success: true}      
        }else {
          return {message: "no se encontro productos", success: false}
        }   
  }
  async cargarPorTipo(tipo) {  
    const productos =  await new productosDaoMongo().getForType(tipo)
    if(productos.data?.length > 0){
        return {message: "Productos encontrados", data: productos.data, success: true}      
    }else {
      return {message: "no se encontro productos", success: false}
    }   
  }
  async cargarPorId(id) {  
    const productos =  await new productosDaoMongo().getById(id)
    if(productos?.data){
        return {message: "Productos encontrados", data: productos.data, success: true}      
    }else {
      return {message: "no se encontro productos", success: false}
    }   
  }
  async editarPorId(id, producto) {  
    const productos =  await new productosDaoMongo().updateById(id,producto)
    if(productos){
        return {message: "Productos encontrados", data: productos, success: true}      
    }else {
      return {message: "no se encontro productos", success: false}
    }   
  }
}
export default productosNormalizer;