import usuariosDaoMongo from "../persistencia/usuariosMongo.js";
import bcrypt from 'bcryptjs'
class userNormalizer {
  constructor() {}
 
  async guardarUsuario(obj) {
    if (
      obj.email &&
      obj.password &&
      obj.edad &&
      obj.direccion
    ) {
      const salt = await bcrypt.genSalt(10);
      obj.password = await bcrypt.hash(obj.password, salt);

      const usuario = {
        email: obj.email,
        password: obj.password,
        edad: obj.edad,
        direccion: obj.direccion,
        telefono: obj.telefono,
        nombre: obj.nombre,
        isAdmin: obj.isAdmin ?? true,
        fechaAlta: Date.now(),
      };
      const salvado = await new usuariosDaoMongo().save(usuario)
      return {message: "se cargo correctamente", success: true, data: salvado}
    }else{
        return {message: "no cumple con los requisitos", success: false}
    }
  }
  async cargarUsuario(email, password) {
    if (
      email &&
      password  
    ) {
        const user =  await new usuariosDaoMongo().getByEmail(email)  
        if(user?.password){
            let checkPass = await bcrypt.compare(password, user.password);
            if(checkPass){
                return {message: "Se ingreso correctamente", success: true, data: user}
            }else{
                return {message: "el mail o la contraseña es incorrecta", success: false}
            }
        }else {
            return {message: "no se encontro el mail", success: false}

        }
    }else{
        return {message: "no cumple con los requisitos", success: "err"}
    }
  }
}
export default userNormalizer;