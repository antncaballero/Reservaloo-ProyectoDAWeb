import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const verificarToken = (req, res, next) => {
  const token = req.cookies.accessToken; // Obtener el token del cookie
  if (!token) return res.status(401).redirect('/auth/login'); // Si no hay token, redirigir a login

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Guardar el usuario decodificado en la solicitud
    next(); // Continuar al siguiente middleware o ruta
  }
  catch (error) {
    return res.status(403).redirect('/auth/login');
  }
};

export default verificarToken;