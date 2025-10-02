import { MongoClient } from 'mongodb';
// clase que se utiliza para establecer conexion la base de datos MongoDB
export default class Database {
  constructor() {
    this.uri = 'mongodb://127.0.0.1:27017/dbUsers';
    this.options = {};
    this.client = new MongoClient(this.uri, this.options);
  }

  async conectar() {
    try {
      await this.client.connect();
      console.log('Conexión a MongoDB Establecida');
    } catch (error) {
      throw error;
    }
  }

  async desconectar() {
    try {
      await this.client.close();
      console.log('Desconexión exitosa');
    } catch (error) {
      throw error;
    }
  }

  obtenerColeccion(nombre) {
    return this.client.db().collection(nombre);
  }
}
