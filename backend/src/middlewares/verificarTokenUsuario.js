import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const verificarTokenUsuario = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).redirect('/auth/login');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Verificar si el usuario es un gestor
    if (decoded.rol !== 'usuario') {
      return res.status(403).json({ message: 'Acceso denegado. Solo disponible para usuarios normales.' });
    }

    req.user = decoded;
    next();
  }
  catch (error) {
    return res.status(403).json({ message: 'Token inválido' });
  }
};

export default verificarTokenUsuario;
