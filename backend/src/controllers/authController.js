import jwt from 'jsonwebtoken';
import { db } from '../../config/db.js';
import { User } from '../models/user.js';
import dotenv from 'dotenv';
dotenv.config();
//import bcrypt from 'bcrypt';

export class AuthController {
    static async login(req, res) {
        try {
            const { email, password } = req.body;
        
            // Validación básica de entrada
            if (!email || !password) {
              return res.status(400).send('Email y contraseña son requeridos');
            }
        
            // Consulta a la base de datos
            // const [results] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
            // if (results.length === 0) {
            //   return res.status(401).send('Credenciales inválidas');
            // }
            // const user = results[0];

            const user = await User.getUserByEmail(email);
            if (!user){
              return res.status(401).send('Credenciales inválidas');
            }
        
            // Comparación segura de contraseñas
            //const valid = await bcrypt.compare(password, user.password);
            const valid = password === user.password; // Cambia esto por bcrypt.compare si usas hash
            if (!valid) {
              return res.status(401).send('Credenciales inválidas');
            }
        
            // Generar el token JWT
            const payload = {
              id: user.id,
              nombre: user.nombre,
              rol: user.rol,
            };
        
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        
            // Configurar la cookie de forma segura
            res.cookie('accessToken', token, {
              httpOnly: true,
              secure: false,
              sameSite: 'strict',
            });
        
            res.redirect('/');
          } catch (error) {
            console.error('Error en el login:', error);
            res.status(500).send('Error interno del servidor');
          }
    }

    static async logout(req, res) {
        try {
            res.clearCookie('accessToken'); // Limpiar la cookie del token
            res.redirect('/auth/login'); // Redirigir a la página de login
        } catch (error) {
            console.error('Error during logout:', error);
            res.status(500).send('Error during logout');
        }
    }
}