import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import GestorLayout from './layouts/GestorLayout';

export function RutaGestor({ children }) {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (!user) {
        window.location.href = 'http://localhost:3000/auth/login';
    }

    // Se redirige a la página de usuario normal si el usuario no es un gestor, ya que solo hay dos roles
    if (user.rol !== 'gestor') {
        return <Navigate to="/" />;
    }

    return (
        <GestorLayout>
            {children}
        </GestorLayout>
    )
} 