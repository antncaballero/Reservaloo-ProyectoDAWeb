import sprite from '../../assets/images/sprite.svg';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-8 mt-10 bottom-0">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    {/* Sección de copyright */}
                    <div className="mb-4 md:mb-0">
                        <p className="text-sm text-gray-400">
                            © 2025 Reservaloo. Todos los derechos reservados.
                        </p>
                    </div>

                    {/* Sección de redes sociales */}
                    <div className="flex space-x-6">
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <svg className="w-6 h-6 hover:scale-110 transition-all duration-300 ease-in-out" fill="currentColor">
                                <use xlinkHref={`${sprite}#instagram`} />
                            </svg>
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <svg className="w-6 h-6 hover:scale-110 transition-all duration-300 ease-in-out" fill="currentColor">
                                <use xlinkHref={`${sprite}#x`} />
                            </svg>
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                            <svg className="w-6 h-6 hover:scale-110 transition-all duration-300 ease-in-out" fill="currentColor">
                                <use xlinkHref={`${sprite}#youtube`} />
                            </svg>
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                            <svg className="w-6 h-6 hover:scale-110 transition-all duration-300 ease-in-out" fill="currentColor">
                                <use xlinkHref={`${sprite}#linkedin`} />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Línea divisoria */}
                <div className="border-t border-gray-800 mt-6 pt-6">
                    <p className="text-sm text-gray-500 text-center">
                        Desarrollado con ❤️ por el equipo de DAWeb
                    </p>
                </div>
            </div>
        </footer>
    );
}
