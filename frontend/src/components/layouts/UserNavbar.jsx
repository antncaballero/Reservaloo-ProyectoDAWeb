import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import logo from '../../assets/images/LogoReservaloo.png'; // Ajusta la ruta si es necesario

export default function Navbar() {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="text-white border-b border-gray-300 mb-8">
            <div className="container mx-auto px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo y nombre */}
                    <Link to="/" className="flex items-center space-x-2">
                        <img src={logo} alt="Reservaloo logo" className="h-10" />
                    </Link>

                    {/* Enlaces de navegación */}
                    <div className="hidden md:flex space-x-8">
                        <Link to="/eventos" className="hover:text-gray-300 transition-colors">
                            Eventos
                        </Link>
                        <Link to="/espacios" className="hover:text-gray-300 transition-colors">
                            Espacios
                        </Link>
                    </div>

                    {/* Perfil y logout */}
                    <div className="flex items-center space-x-4">
                        <span className="hidden md:block">{user?.nombre}</span>
                        <button 
                            onClick={logout}
                            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition-colors cursor-pointer"
                        >
                            Cerrar sesión
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
} 