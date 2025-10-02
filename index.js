import db from './config/db.js';
import UserDAO from './dataAccess/userDAO.js';

(async function () {
    // conexion a la base
    let dbs = new db();
    await dbs.conectar();

    // inicializa dao y conexion
    let userdao = new UserDAO(dbs);
    await userdao.init();

    // crea usuarios
    await userdao.crear({ username: 'Martin', email: 'martin@gmail.com' });
    await userdao.crear({ username: 'Martin2', email: 'martin2@gmail.com' });
    await userdao.crear({ username: 'Martin3', email: 'martin3@gmail.com' });
    await userdao.crear({ username: 'Martin4', email: 'martin4@gmail.com' });

    //  obten todos los usuarios
    console.log("=== TODOS LOS USUARIOS ===");
    let usuarios = await userdao.obtenerTodos();
    console.log(usuarios);

    // obten usuario por ID (tomamos el primer usuario)
    console.log("\n=== USUARIO POR ID ===");
    const primerUsuarioId = usuarios[0]._id;
    const usuarioPorId = await userdao.obtenerPorId(primerUsuarioId);
    console.log(usuarioPorId);

    // actualiza al usuario (cambiamos email del segundo usuario)
    console.log("\n=== ACTUALIZAR USUARIO ===");
    const segundoUsuarioId = usuarios[1]._id;
    await userdao.actualizar(segundoUsuarioId, { email: 'nuevoemail@gmail.com' });
    const usuarioActualizado = await userdao.obtenerPorId(segundoUsuarioId);
    console.log(usuarioActualizado);

    // elimina el tercer usuario 
    console.log("\n=== ELIMINAR USUARIO ===");
    const tercerUsuarioId = usuarios[2]._id;
    await userdao.eliminar(tercerUsuarioId);

    // ver usuarios finales
    console.log("\n=== USUARIOS DESPUÉS DE ELIMINAR ===");
    usuarios = await userdao.obtenerTodos();
    console.log(usuarios);

    // cierra conexión
    await dbs.desconectar();
})();
