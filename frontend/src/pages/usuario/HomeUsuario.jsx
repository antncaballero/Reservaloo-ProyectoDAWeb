import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { 
    SparklesIcon, 
    MagnifyingGlassIcon, 
    CalendarIcon, 
    ChartBarIcon, 
    ArchiveBoxIcon, 
    PresentationChartLineIcon, 
} from '@heroicons/react/24/outline';

export default function HomeUsuario() {
    const { user } = useContext(AuthContext);
    const currentDate = new Date();
    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const month = monthNames[currentDate.getMonth()];
    const day = currentDate.getDate();
    const year = currentDate.getFullYear();

    return (
        <div className="container mx-auto px-4 py-8 mt-22">
            {/* Header con saludo y fecha */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-3 md:mb-0 bg-gradient-to-r from-white to-yellow-300 bg-clip-text text-transparent">
                    ¡Hola, {user?.nombre}!
                </h1>
                <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg">
                    <p className="text-white font-medium">{day} de {month}, {year}</p>
                </div>
            </header>
            
            {/* Bento Grid Layout */}
            <article className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Bloque principal - Bienvenida */}
                <section className="md:col-span-2 bg-gradient-to-br from-[#3f51b5]/80 to-[#283593]/90 rounded-xl p-6 shadow-lg transform transition-all duration-300 hover:scale-[1.01] hover:shadow-xl">                    
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold text-white">Tu Plataforma de Reservas</h2>
                        <SparklesIcon className="h-8 w-8 text-yellow-300" />
                    </div>
                    <p className="text-lg text-gray-100 mb-4">
                        Bienvenido a tu espacio personal donde podrás gestionar todas tus reservas de eventos.
                    </p>
                    <div className="grid grid-cols-2 gap-3 mt-6">                        <Link to="/eventos" className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                            <MagnifyingGlassIcon className="h-5 w-5 mr-2" />
                            <span>Explorar Eventos</span>
                        </Link>
                        <Link to="/reservas" className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                            <CalendarIcon className="h-5 w-5 mr-2" />
                            <span>Mis Reservas</span>
                        </Link>
                    </div>
                </section>

                {/* Bloque espacios */}
                <section className="bg-gradient-to-br from-[#ff7043]/90 to-[#ff5722]/80 rounded-xl p-6 shadow-lg transform transition-all duration-300 hover:scale-[1.01] hover:shadow-xl flex flex-col justify-between">
                    <div>                        
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-white">Espacios</h2>
                            <PresentationChartLineIcon className="h-6 w-6 text-white" />
                        </div>
                        <p className="text-gray-100">Explora los diferentes espacios disponibles en nuestra plataforma.</p>
                    </div>
                    <Link to="/espacios" className="mt-4 bg-white/20 py-2 px-4 rounded-lg text-center hover:bg-white/30 transition-colors">
                        Ver todos
                    </Link>
                </section>

                {/* Bloque de estadísticas */}
                <section className="bg-gradient-to-br from-[#4caf50]/80 to-[#388e3c]/90 rounded-xl p-6 shadow-lg transform transition-all duration-300 hover:scale-[1.01] hover:shadow-xl">                    
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-white">Estadísticas</h2>
                        <ChartBarIcon className="h-6 w-6 text-white" />
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-100">Eventos activos</span>
                            <span className="bg-white/20 px-2 py-1 rounded-md text-white font-medium">30+</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-100">Espacios disponibles</span>
                            <span className="bg-white/20 px-2 py-1 rounded-md text-white font-medium">15+</span>
                        </div>
                    </div>
                </section>

                {/* Bloque de eventos */}
                <section className="md:col-span-2 bg-gradient-to-br from-[#7e57c2]/80 to-[#673ab7]/90 rounded-xl p-6 shadow-lg transform transition-all duration-300 hover:scale-[1.01] hover:shadow-xl">                    
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-white">Explora todos nuestros Eventos</h2>
                        <ArchiveBoxIcon className="h-6 w-6" />
                    </div>
                    <p className="text-gray-100 mb-3">
                        Explora nuestra sección de eventos para descubrir actividades académicas, 
                        culturales, deportivas y de entretenimiento.
                    </p>
                    <Link to="/eventos" className="inline-block mt-2 bg-white/20 py-2 px-4 rounded-lg hover:bg-white/30 transition-colors">
                        Ver todos los eventos
                    </Link>
                </section>
            </article>
        </div>
    );
}
