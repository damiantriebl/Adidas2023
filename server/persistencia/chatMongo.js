import { connect } from "../config/mongoConfig.js";

class chatDaoMongo {
  constructor(db) {
    this.db = connect().chatModel;
  }
  async save(chat) {
    try {
      let chatObj = await this.db.findOneAndUpdate(
        { email: chat.email }, 
        { $push: { listaComentada: chat } },
        {upsert: true, new: true, setDefaultsOnInsert: true },
        function (error, success) {
          if (error) {
              console.log(error);
          } else {
              console.log(success);
          }
        }
    )
      return chatObj;
    } catch (error) {
      return { error: error.message };
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
  
  async getByMail(email) {
    try {
      let getByMailBd = await this.db.find({"email": email});
      return { success: true, data: getByMailBd };;
    } catch (error) {
      return { success: false ,error: error.message };
    }
  }
}

export default chatDaoMongo;