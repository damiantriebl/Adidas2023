import productosDaoMongo from "../persistencia/productosMongo.js";

class productosNormalizer {
  constructor() {}
  async guardarProducto(obj, user) {
    if (
      obj.producto &&
      obj.precio &&
      obj.thumbnail
    ) {
      const producto = {
        producto: obj.producto,
        precio: obj.precio,
        thumbnail: obj.thumbnail,  
              
      };
      console.log('dtcon user' ,user)
      const productoGuardado = await new productosDaoMongo().save(producto, user)
      console.log("salvado", productoGuardado);
      return {message: "se cargo correctamente", success: "err", data: productoGuardado}

    }else{
        return {message: "no cumple con los requisitos", success: "err"}
    }
  }
  async cargarTodosLosProductos() {  
        const productos =  await new productosDaoMongo().getAll()
        console.log('productos!', productos)
        if(productos.data?.length > 0){
            return {message: "Productos encontrados", data: productos.data, success: true}      
        }else {
          return {message: "no se encontro productos", success: false}
        }   
  }
  async cargarPorTipo(tipo) {  
    const productos =  await new productosDaoMongo().getForType(tipo)
    console.log('productos!', productos)
    if(productos.data?.length > 0){
        return {message: "Productos encontrados", data: productos.data, success: true}      
    }else {
      return {message: "no se encontro productos", success: false}
    }   
  }
  async cargarPorId(id) {  
    const productos =  await new productosDaoMongo().getById(id)
    console.log('productos!', productos)
    if(productos?.data){
        return {message: "Productos encontrados", data: productos.data, success: true}      
    }else {
      return {message: "no se encontro productos", success: false}
    }   
  }
  async editarPorId(id, producto) {  
    const productos =  await new productosDaoMongo().updateById(id,producto)
    console.log('productos!', productos)
    if(productos){
        return {message: "Productos encontrados", data: productos, success: true}      
    }else {
      return {message: "no se encontro productos", success: false}
    }   
  }
}
export default productosNormalizer;