import jwt from 'jsonwebtoken';

import { SECRET_KEY } from '../config/env.js';
import { connection } from '../db/database.js';

// Middleware para verificar el token JWT
export const validarjwt =(req, res, next) => {
    console.log(req.session)
    console.log('-----------')
    console.log(req.cookies)
    const token = req.cookies.authToken || req.session.token;

    if (!token) {
        return res.status(403).json({ message: 'Token no proporcionado' });
    }

async (token) => {

     const decoded = jwt.verify(token, SECRET_KEY);

    // Se busca al usuario en la base de datos
    const connection = await connection();
    const [user] = await connection.query('SELECT * FROM USERS WHERE ID =? LIMIT 1', decoded.id); 

    if (!user) {
        return res.status(401).json({ message: 'Token inválido' });
    }

    req.user = user; // Agrega la información del usuario decodificada al request

    next();
};
}