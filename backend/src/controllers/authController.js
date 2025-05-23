import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
dotenv.config();

export class AuthController {
    static async login(req, res) {
        try {
            const { email, password } = req.body;
        
            // Validación básica de entrada
            if (!email || !password) {
              return res.status(400).send('Email y contraseña son requeridos');
            }

            const user = await User.getUserByEmail(email);
            if (!user){
              return res.status(401).send('Credenciales inválidas');
            }
        
            // Comparación segura de contraseñas
            const valid = await bcrypt.compare(password, user.password);
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
            
            // Redirigir según el rol del usuario
            const redirectUrl = user.rol === 'admin' ? 'http://localhost:5173/gestion' : 'http://localhost:5173/';
            res.redirect(redirectUrl);
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

    static async checkAuth(req, res) {
        try {
            const token = req.cookies.accessToken;
            
            if (!token) {
                return res.status(401).json({ message: 'No token provided' });
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.getUserById(decoded.id);

            if (!user) {
                return res.status(401).json({ message: 'User not found' });
            }

            res.json({
                id: user.id,
                nombre: user.nombre,
                email: user.email,
                rol: user.rol
            });
        } catch (error) {
            console.error('Error checking auth:', error);
            res.status(401).json({ message: 'Invalid token' });
        }
    }
}