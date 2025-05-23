import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { fetchWithAuth } from "../../api/api";
import { toast, ToastContainer } from "react-toastify";

const EventoCardGestor = ({ evento }) => {
  const [loading, setLoading] = useState(false);
  const cancelable = !evento.cancelado && new Date(evento.fecha_inicio) > new Date() && !loading;
  const navigate = useNavigate();

  const handleCancelar = async () => {
    toast.warn(
        ({ closeToast }) => (
            <div>
                <h4 className="font-semibold mb-2">Cancelación {evento.nombre}</h4>
                <p className="mb-2">¿Seguro que quieres cancelar el evento? Se cancelarán todas sus reservas asociadas</p>
                <button
                    onClick={async () => {
                        closeToast();
                        await cancelarEvento(); 
                    }}
                    className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 transition-colors cursor-pointer"
                >
                    Confirmar
                </button>
            </div>
        )
    ) 
  };

  const cancelarEvento = async () => {
    try {
      const response = await fetchWithAuth(`/eventos/cancelar/${evento.id}`, {
          method: 'PATCH'
      });
      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.mensaje || 'Error al cancelar el evento');
      }
      toast.success(`Evento cancelado con éxito`);;
      navigate(0) // Actualiza la lista de eventos
    } catch (error) {
      toast.error(error.message || "Error al cancelar el evento");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-80 sm:w-90 h-110 flex flex-col transition-transform duration-300 hover:scale-105">
        <div className="h-40 w-full">
          <img
            src={evento.imagen}
            alt={evento.nombre}
            className="h-40 w-full object-cover"
          />
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="text-xl font-semibold text-primary mb-2 line-clamp-1">
            {evento.nombre}
          </h3>
          <div className="space-y-2 flex-1">
            <p className="text-gray-600 line-clamp-1"> {evento.descripcion} </p>
            <p className="text-gray-600 line-clamp-1">
              <span className="font-medium">Espacio:</span>{" "}
              {evento.nombre_espacio}
            </p>
            <p className="text-gray-600 line-clamp-1">
              <span className="font-medium">Organizador:</span>{" "}
              {evento.organizador}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Plazas disponibles:</span>{" "}
              {evento.plazas_disponibles}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Fecha:</span>{" "}
              {new Date(evento.fecha_inicio).toLocaleDateString()}{" "}
            </p>
          </div>
          <div className="mt-4 flex justify-between items-center gap-2">
            <button
              onClick={cancelable ? () => handleCancelar() : undefined}
              className={`${
                !cancelable
                  ? "bg-gray-300 text-red-500 cursor-not-allowed"
                  : "text-white hover:bg-red-400 cursor-pointer bg-red-600"
              } px-4 py-2 rounded-md transition-colors flex-1 text-center`}
              disabled={!cancelable}
            >
              {evento.cancelado
                ? "Ya cancelado"
                : new Date(evento.fecha_inicio) > new Date()
                ? "Cancelar"
                : "Ya iniciado"}
            </button>
            <Link
              to={`/eventos/actualizar/${evento.id}`}
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors flex-1 text-center"
            >
              Actualizar
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventoCardGestor;
