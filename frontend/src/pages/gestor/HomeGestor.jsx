import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { 
    SparklesIcon, 
    CalendarIcon, 
    ChartBarIcon, 
    BuildingOffice2Icon, 
    PlusCircleIcon, 
    RectangleGroupIcon
} from '@heroicons/react/24/outline';
import useStats from '../../hooks/useStats';

export default function HomeGestor() {
    const { user } = useContext(AuthContext);
    const currentDate = new Date();
    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const month = monthNames[currentDate.getMonth()];
    const day = currentDate.getDate();
    const year = currentDate.getFullYear();
    const { numEspaciosActivos, numEventosFuturos } = useStats();

    return (
        <div className="container mx-auto px-4 py-8 mt-16">
            {/* Header con saludo y fecha */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-3 md:mb-0 bg-gradient-to-r from-white to-yellow-300 bg-clip-text text-transparent">
                    ¡Hola, {user?.nombre}!
                </h1>
                <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg">
                    <p className="text-white font-medium">{day} de {month}, {year}</p>
                </div>
            </header>
            
            {/* Bento Grid */}
            <article className="grid grid-cols-1 md:grid-cols-3 gap-6">                {/* Bloque principal - Panel de Control */}
                <section className="md:col-span-2 bg-gradient-to-br from-blue-700/80 to-blue-900/90 rounded-xl p-6 shadow-lg transform transition-all duration-300 hover:scale-[1.01] hover:shadow-xl">                    
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold text-white">Panel de Control de Gestor</h2>
                        <SparklesIcon className="h-8 w-8 text-yellow-300" />
                    </div>
                    <p className="text-lg text-white mb-4">
                        Bienvenido a tu panel de administración donde podrás gestionar todos los recursos del sistema.
                    </p>
                    <div className="grid grid-cols-2 gap-3 mt-6">
                        <Link to="/gestion/eventos" className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                            <CalendarIcon className="h-5 w-5 mr-2 text-yellow-300" />
                            <span>Gestionar Eventos</span>
                        </Link>
                        <Link to="/gestion/espacios" className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                            <BuildingOffice2Icon className="h-5 w-5 mr-2 text-yellow-300" />
                            <span>Gestionar Espacios</span>
                        </Link>
                    </div>
                </section>                {/* Bloque Crear Espacio */}
                <section className="bg-gradient-to-br from-orange-500/90 to-orange-700/80 rounded-xl p-6 shadow-lg transform transition-all duration-300 hover:scale-[1.01] hover:shadow-xl flex flex-col justify-between">
                    <div>                        
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-white">Crear Espacio</h2>
                            <PlusCircleIcon className="h-6 w-6 text-white" />
                        </div>
                        <p className="text-white">Añade nuevos espacios para que los usuarios puedan reservarlos.</p>
                    </div>
                    <Link to="/espacios/crear" className="mt-4 bg-white/20 py-2 px-4 rounded-lg text-center hover:bg-white/30 transition-colors">
                        Crear nuevo
                    </Link>
                </section>                {/* Bloque de estadísticas */}
                <section className="bg-gradient-to-br from-green-600/80 to-green-800/90 rounded-xl p-6 shadow-lg transform transition-all duration-300 hover:scale-[1.01] hover:shadow-xl">                    
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-white">Estadísticas</h2>
                        <ChartBarIcon className="h-6 w-6 text-white" />
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-white">Eventos activos</span>
                            <span className="bg-white/20 px-2 py-1 rounded-md text-white font-medium">{numEventosFuturos}+ </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-white">Espacios disponibles</span>
                            <span className="bg-white/20 px-2 py-1 rounded-md text-white font-medium">{numEspaciosActivos}+ </span>
                        </div>
                    </div>
                </section>                {/* Bloque crear evento */}
                <section className="md:col-span-2 bg-gradient-to-br from-purple-600/80 to-purple-800/90 rounded-xl p-6 shadow-lg transform transition-all duration-300 hover:scale-[1.01] hover:shadow-xl">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-white">Crear Evento</h2>
                        <RectangleGroupIcon className="h-6 w-6 text-yellow-300" />
                    </div>
                    <p className="text-white mb-3">
                        Desde la sección de gestión de espacios podrás crear eventos asociados a cada uno de los espacios,
                        configurar sus características y mantener actualizada la información.
                    </p>
                    <Link to="/gestion/espacios" className="inline-block mt-2 bg-white/20 py-2 px-4 rounded-lg hover:bg-white/30 transition-colors">
                        Administrar espacios
                    </Link>
                </section>
            </article>
        </div>
    );
}
