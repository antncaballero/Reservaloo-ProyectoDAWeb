import React from 'react';
import { useNavigate } from 'react-router-dom';

const EventoCardUsuario = ({ evento }) => {
    const navigate = useNavigate();

    const handleVerEvento = () => {
        navigate(`/eventos/${evento.id}`);
    };

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden w-80 sm:w-90 h-110 flex flex-col transition-transform duration-300 hover:scale-105">
            <div className="h-40 w-full">
                <img 
                    src={evento.imagen} 
                    alt={evento.nombre}
                    className="h-40 w-full object-cover"
                />
            </div>
            <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-xl font-semibold text-primary mb-2 line-clamp-1">{evento.nombre}</h3>
                <div className="space-y-2 flex-1">
                    <p className="text-gray-600 line-clamp-1"> {evento.descripcion} </p>
                    <p className="text-gray-600 line-clamp-1">
                        <span className="font-medium">Espacio:</span> {evento.nombre_espacio}
                    </p>
                    <p className="text-gray-600 line-clamp-1">
                        <span className="font-medium">Organizador:</span> {evento.organizador}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-medium">Plazas disponibles:</span> {evento.plazas_disponibles}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-medium">Fecha:</span> {new Date(evento.fecha_inicio).toLocaleDateString()}
                    </p>
                </div>
                <div className="mt-4 flex justify-between items-center">
                    <button 
                        onClick={!evento.cancelado ? handleVerEvento : undefined}
                        className={`${
                            evento.cancelado 
                                ? "bg-gray-300 text-red-500 cursor-not-allowed" 
                                : "bg-primary text-white hover:bg-primary/90 cursor-pointer"
                        } px-4 py-2 rounded-md transition-colors`}
                        disabled={evento.cancelado}
                    >
                        {evento.cancelado ? 'Evento cancelado' : 'Ir al evento'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EventoCardUsuario; 