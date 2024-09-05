import {connection} from './db/database.js';
import {generarjwt} from './helpers/generar-jwt.js'
import {validarjwt} from './middlewares/validar-jwt.js'


export const usuario = async (req, res) => {
    const{user, password }= req.body;
    const sql = 'INSERT INTO users (username, password) VALUES(?,?)'
    try {
        const connection = await connection();
        await connection.query(sql, [user, password]);
        res.json({
            msg: 'Usuario registrado correctamente'
        });
        connection.end();
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar el usuario' });
    }
};

// Endpoint de inicio de sesión (login)
export const loginUser =  async (req, res) => {
    const { username, password } = req.body;


    try {
        const connection =connection();
            const sql = 'SELECT * FROM users WHERE username= ?';
            const [user]= await connection.query(sql, username);
        ;

        // Validación de usuario
        if (user[0]) {
            return res.status(401).json({ message: 'no existe el usuario' });
        }
        if(user.password==password){

        // Generar token JWT
        const token = await generarJwt(user.id);

        // Almacenar el token en la sesión del servidor
        req.session.token = token;

        // Almacenar el token en una cookie segura
        res.cookie('authToken', token, {
            httpOnly: true, // La cookie no es accesible desde JavaScript
            secure: false, // Cambiar a true en producción con HTTPS
            maxAge: 3600000 // Expiración en milisegundos (1 hora)
        });

        return res.json({ message: 'Inicio de sesión exitoso' });
    }
}catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error Inesperado' });
    }
    
};

// Endpoint de cierre de sesión (logout)
export const logoutUser= (req, res) => {
    try {
        req.session.destroy(err => {
            if (err) {
                return res.status(500).json({ message: 'Error al cerrar sesión' });
            }

            res.clearCookie('authToken');
            return res.json({ message: 'Cierre de sesión exitoso' });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error Inesperado' });
    }
};

// Endpoint para validar la sesión
export const sessionUser = (req, res) => {
    const user=validarjwt();
    if(user===!false){ 
    console.log(req.user);
    return res.json({ message: 'Acceso permitido a área protegida', user: req.user });
}};
