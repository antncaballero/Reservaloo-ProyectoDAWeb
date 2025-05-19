import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function HomeUsuario() {
    const { user } = useContext(AuthContext);

    return (
        <div className="container mx-auto ">
            <h1 className="text-3xl font-bold mb-6">¡Bienvenido, {user?.nombre}!</h1>
            
            <div className="max-w-3xl">
                <p className="text-lg mb-4">
                    En esta plataforma podrás:
                </p>
                
                <ul className="list-disc pl-8 text-lg space-y-2 mb-8">
                    <li>Explorar eventos disponibles</li>
                    <li>Realizar reservas para los eventos que te interesen</li>
                    <li>Ver el historial de tus reservas</li>
                    <li>Recibir notificaciones sobre nuevos eventos</li>
                </ul>

                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                    <h2 className="text-2xl font-bold mb-4">Próximos eventos destacados</h2>
                    <p className="text-gray-200">
                        Explora nuestra sección de eventos para descubrir actividades académicas, 
                        culturales, deportivas y de entretenimiento.
                    </p>
                </div>
            </div>
        </div>
    );
}
