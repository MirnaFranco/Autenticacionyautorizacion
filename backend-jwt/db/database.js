import {createConnection} from 'mysql2/promise';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } from '../config/config.js';

export const connectionDB =async()=> {
   try {
    const connection = await createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
    });
  return connection;
} catch (error) {
  console.error('Error al conectar con la base de datos:', error);
  throw new Error('Error al conectar con la base de datos');
}
};
