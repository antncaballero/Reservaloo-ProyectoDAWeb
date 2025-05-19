import React from 'react';
import { useNavigate } from 'react-router-dom';

const EventoCardUsuario = ({ evento }) => {
    const navigate = useNavigate();

    const handleVerEvento = () => {
        navigate(`/eventos/${evento.id}`);
    };
    return (
        <div className="w-75 h-90 border-1 rounded-lg">
            <img 
                src={evento.imagen} 
                alt={evento.nombre}
                className="w-75 h-35 object-cover rounded-t-lg border-b-1"
            />
            <div className="p-2 h-55 flex flex-col justify-between">
                <h3 className="text-lg font-semibold">{evento.nombre}</h3>
                <p className="text-sm">
                    {evento.descripcion}
                </p>
                <div className="text-sm mt-auto">
                    <p><strong>Espacio:</strong> {evento.nombre_espacio}</p>
                    <p><strong>Organizador:</strong> {evento.organizador}</p>
                    <p><strong>Plazas disponibles:</strong> {evento.plazas_disponibles}</p>
                    <p><strong>Fecha:</strong> {new Date(evento.fecha_inicio).toLocaleDateString()}</p>
                </div>
                <button 
                    className={`${evento.cancelado 
                        ? "bg-gray-300 text-red-500 cursor-not-allowed" 
                        : "bg-white text-primary hover:bg-gray-200 cursor-pointer"} 
                        font-semibold py-1 px-2 mt-auto rounded-lg transition-colors mb-1 w-auto`}
                    onClick={!evento.cancelado ? handleVerEvento : undefined}
                >
                    {evento.cancelado ? 'Evento cancelado' : 'Ir al evento'}
                </button>
            </div>
        </div>
    );
};

export default EventoCardUsuario; 