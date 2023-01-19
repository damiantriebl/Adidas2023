import chatDaoMongo from "../persistencia/chatMongo.js";

class chatNormalizer {
  constructor() {}
  async guardarChat(obj) {
    if (
      obj.nombre &&
      obj.mensaje &&
      obj.email
    ) {
      const chat = {
        email: obj.email,
        nombre: obj.nombre,
        mensaje: obj.mensaje
      };
      const chatGuardado = await new chatDaoMongo().save(chat)
      return chatGuardado

    }else{
        return {message: "no se puede cargar el chat", success: "err"}
    }
  }
  async cargarTodosLoschats() {  
        const chats =  await new chatDaoMongo().getAll()
        if(chats.data?.length > 0){
            return chats.data      
        }else {
          return {message: "no hay chats", success: false}
        }   
  }
  async cargarChatPorEmail(email){
    const chats =  await new chatDaoMongo().getByMail(email)
    if(chats.data?.length > 0){
        return chats.data      
    }else {
      return {message: "no hay chats", success: false}
    }  
  }
}
export default chatNormalizer;