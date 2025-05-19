import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function HomeGestor() {
    const { user } = useContext(AuthContext);

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-6">¡Bienvenido, {user?.nombre}!</h1>
            
            <div className="max-w-3xl">
                <p className="text-lg mb-4">
                    Como gestor del sistema, puedes:
                </p>
                
                <ul className="list-disc pl-8 text-lg space-y-2 mb-8">
                    <li>Crear y gestionar eventos</li>
                    <li>Administrar espacios y ubicaciones</li>
                    <li>Revisar y aprobar reservas</li>
                    <li>Gestionar usuarios y permisos</li>
                </ul>

                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                    <h2 className="text-2xl font-bold mb-4">Panel de Control</h2>
                    <p className="text-gray-200">
                        Utiliza el menú de navegación para acceder a las diferentes 
                        secciones de gestión y administración del sistema.
                    </p>
                </div>
            </div>
        </div>
    );
}
