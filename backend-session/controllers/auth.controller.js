import {DBconnection} from '../db/database.js';

export const usuario = async (req, res) => {
    const{username, password }= req.body;
    const sql = 'INSERT INTO users (username, password) VALUES(?,?)'
    try {
        const connection = await DBconnection();
        await connection.query(sql, [username, password]);
        res.json({
            msg: 'Usuario registrado correctamente'
        });
        connection.end();
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar el usuario' });
    }
};

// Ruta para manejar el inicio de sesión
export const loginUser= async(req, res) => {
    const { username, password } = req.body;

    // Buscar usuario
    const connection = DBconnection();
    const sql = 'SELECT * FROM  users WHERE username= ? AND password= ?';
    const [user] = connection.query(sql,[username,password]);
    

    if (user.leght>0) {
        // Guardar información del usuario en la sesión
        req.session.userId = user[0].id;
        req.session.username = user[0].username;

        return res.json({ 
            message: 'Inicio de sesión exitoso', 
            user: { id: user[0].id, username: user[0].username } });
    } else {
        return res.status(401).json({ message: 'Credenciales incorrectas' });
    }
};

// Ruta para obtener los datos de la sesión
export const sessionUser = async(req, res) => {
    if (req.session.userId) {
        return res.json({ 
            loggedIn: true, 
            user: { id: req.session.userId, username: req.session.username } });
    } else {
        return res.status(401).json({ loggedIn: false, message: 'No hay sesión activa' });
    }
};

// Ruta para cerrar la sesión
export const logoutUser = async(req, res) => {
    console.log(req.session)
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Error al cerrar la sesión' });
        }
        res.clearCookie('connect.sid'); // Nombre de cookie por defecto para express-session
        return res.json({ message: 'Sesión cerrada exitosamente' });
    });
};