import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import logo from '../../assets/images/LogoReservaloo.png'; // Ajusta la ruta si es necesario
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const [open, setOpen] = useState(false);

    return (
        <nav className="text-white border-b border-gray-300 mb-8">
            <div className="container mx-auto px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 hover:scale-105 transition-transform duration-300 ease-in-out">
                        <img src={logo} alt="Reservaloo logo" className="h-10" />
                    </Link>

                    {/* Enlaces de navegación en desktop */}
                    <div className="hidden md:flex space-x-8">
                        <Link to="/eventos" className="hover:text-secondary transition-colors">
                            Eventos
                        </Link>
                        <Link to="/espacios" className="hover:text-secondary transition-colors">
                            Espacios
                        </Link>
                    </div>

                    {/* Perfil y logout en desktop */}
                    <div className="hidden md:flex items-center space-x-4">
                        <span>{user?.nombre}</span>
                        <button 
                            onClick={logout}
                            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition-colors cursor-pointer"
                        >
                            Cerrar sesión
                        </button>
                    </div>

                    {/* Botón hamburguesa en móvil */}
                    <div className="md:hidden">
                        <button onClick={() => setOpen(!open)} className="focus:outline-none">
                            {open ? (
                                <XMarkIcon className="h-8 w-8" />
                            ) : (
                                <Bars3Icon className="h-8 w-8" />
                            )}
                        </button>
                    </div>
                </div>
                {/* Dropdown en móvil */}
                <div
                    className={`md:hidden mt-2 space-y-2 overflow-hidden transition-all duration-300 ease-in-out ${open ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                    <Link to="/eventos" className="block hover:text-secondary" onClick={() => setOpen(false)}>
                        Eventos
                    </Link>
                    <Link to="/espacios" className="block hover:text-secondary" onClick={() => setOpen(false)}>
                        Espacios
                    </Link>
                    <button onClick={logout} className="bg-red-600 hover:bg-red-700 px-4 py-2 mt-2 mb-4 rounded transition-colors cursor-pointer" >
                        Cerrar sesión
                    </button>
                </div>
            </div>
        </nav>
    );
} 