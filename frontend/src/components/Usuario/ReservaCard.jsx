import { useState } from 'react';
import { fetchWithAuth } from '../../api/api';
import { toast } from 'react-toastify';

const ReservaCard = ({ reserva, onCancelar }) => {
    const [isLoading, setIsLoading] = useState(false);
    const fechaInicio = new Date(reserva.fecha_inicio);
    const fechaFin = new Date(reserva.fecha_fin);
    const puedeCancelar = fechaInicio > new Date();

    const handleCancelar = async () => {
      if (!puedeCancelar) return;
      // Mostrar toast de confirmación
      toast.info(({}) => (
        <aside>
          <p className="mb-2">
            ¿Estás seguro de que deseas cancelar esta reserva?
          </p>
          <button
            className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-sm cursor-pointer "
            onClick={() => {
                confirmarCancelacion(); 
                toast.dismiss(); // Cerrar el toast de confirmación
            }}
          >
            Sí, cancelar
          </button>
        </aside>
      ));
    };
    
    const confirmarCancelacion = async () => {
        setIsLoading(true);
        try {
            const response = await fetchWithAuth(`/reservas/${reserva.id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                onCancelar(reserva.id);
                toast.success('Reserva cancelada exitosamente', {
                    position: toast.POSITION.TOP_CENTER
                });
            } else {
                toast.error('Error al cancelar la reserva', {
                    position: toast.POSITION.TOP_CENTER
                });
            }
        } catch (error) {
            console.error('Error al cancelar la reserva:', error);
            toast.error('Error al cancelar la reserva', {
                position: toast.POSITION.TOP_CENTER
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6 mx-auto
                      flex flex-col md:flex-row h-auto w-80 md:h-48 md:w-160 transition-transform duration-300 hover:scale-102">
            {/* Imagen con tamaño fijo */}
            <div className="w-full md:w-1/3 h-48 flex-shrink-0">
                <img 
                    src={reserva.evento_imagen} 
                    alt={reserva.evento_nombre}
                    className="w-full h-full object-cover"
                />
            </div>
            {/* Contenido */}
            <div className="w-full md:w-2/3 p-4 flex flex-col justify-between">
                <div>
                    <h3 className="text-primary text-xl font-semibold mb-2 line-clamp-1">
                        {reserva.evento_nombre}
                    </h3>
                    <div className="space-y-1">
                        <p className="text-gray-600 text-md">
                            <span className="font-medium">Inicio:</span> {fechaInicio.toLocaleDateString()}
                        </p>
                        <p className="text-gray-600 text-md">
                            <span className="font-medium">Fin:</span> {fechaFin.toLocaleDateString()}
                        </p>
                        <p className="text-gray-600 text-md">
                            <span className="font-medium">Cantidad:</span> {reserva.cantidad}
                        </p>
                    </div>
                </div>
                <div className="mt-2 flex justify-end">
                    {puedeCancelar ? (
                        <button
                            onClick={handleCancelar}
                            disabled={isLoading}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 text-sm rounded-md transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Cancelando...' : 'Cancelar Reserva'}
                        </button>
                    ) : (
                        <span className="text-gray-500 italic text-sm">
                            No se puede cancelar
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReservaCard;