import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import UserLayout from '../layouts/UserLayout';

export function RutaUsuario({ children }) {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (!user) {
        window.location.href = 'http://localhost:3000/auth/login';
    }

    // Se redirige a la página de gestor si el usuario no es usuario, ya que solo hay dos roles
    if (user.rol !== 'usuario') {
        return <Navigate to="/gestor" />;
    }

    return (
        <UserLayout>
            {children}
        </UserLayout>
    )
} 