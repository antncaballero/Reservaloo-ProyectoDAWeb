import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const verificarTokenGestor = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).redirect('/auth/login');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Verificar si el usuario es un gestor
    if (decoded.rol !== 'gestor') {
      return res.status(403).json({ message: 'Acceso denegado. Se requieren privilegios de gestor.' });
    }

    req.user = decoded;
    next();
  }
  catch (error) {
    return res.status(403).json({ message: 'Token inválido' });
  }
};

export default verificarTokenGestor;
