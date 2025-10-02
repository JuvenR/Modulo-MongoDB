import { ObjectId } from 'mongodb';
// clase para acceder a la base de datos
export default class UserDAO {
  constructor(db) {
    this.db = db; 
    this.collection = null;
  }
// este metodo incizaliza la colleccion de usuarios en la dao
  async init() {
    this.collection = this.db.obtenerColeccion('users');
  }
// metodo para crear un usuario
  async crear(usuario) {
    const result = await this.collection.insertOne(usuario);
    return result.insertedId;
  }
// meotodo para obtener todos los usuarios en la base de datos
  async obtenerTodos() {
    return await this.collection.find().toArray();
  }
// metodo para obtener a un usuario que tenga la id 
  async obtenerPorId(id) {
    return await this.collection.findOne({ _id: new ObjectId(id) });
  }
// metodo para actualizar un usuario con su id y el nuevoUsuario
  async actualizar(id, nuevoUsuario) {
    await this.collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: nuevoUsuario }
    );
    return 'Usuario actualizado correctamente';
  }
// metodo para eliminar a un usuario por ID
  async eliminar(id) {
    return await this.collection.deleteOne({ _id: new ObjectId(id) });
  }
}
