import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';


// La flag requireGestor es para que solo los gestores puedan acceder a la ruta
// Se podría crear otro componente para rutas de gestores, pero no es necesario por ahora
export function RutaGestor({ children }) {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (!user) {
        window.location.href = 'http://localhost:3000/auth/login';
    }

    if (user.rol !== 'gestor') {
        return <Navigate to="/" />;
    }

    return children;
} 