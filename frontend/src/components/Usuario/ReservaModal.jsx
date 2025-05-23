import { useState, useContext } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import { fetchWithAuth } from "../../api/api";


const ReservaModal = ({ isOpen, onClose, evento }) => {
  const [cantidadPlazas, setCantidadPlazas] = useState(1);
  const [reservando, setReservando] = useState(false);
  const { user } = useContext(AuthContext);

  const handleCantidadChange = (e) => {
    const valor = parseInt(e.target.value);
    if (valor > 0 && valor <= evento.plazas_disponibles) {
      setCantidadPlazas(valor);
    }
  };

  const handleClose = () => {
    setCantidadPlazas(1);
    onClose();
  };

  const confirmarReserva = async () => {
   console.log(evento);
    try {
      setReservando(true);
      
      const response = await fetchWithAuth('/reservas', {
        method: 'POST',
        body: JSON.stringify({
          user_id: user.id,    
          evento_id: evento.id,
          cantidad: cantidadPlazas
        })
      });  
      
      if (response.status === 201) {
        toast.success(`Has reservado ${cantidadPlazas} plaza${cantidadPlazas > 1 ? 's' : ''} para el evento "${evento.nombre}"`);
        handleClose();
      } else if (response.status === 400) {
        toast.error('No hay suficientesplazas disponibles para reservar.');
      } else {
        toast.error('Error al realizar la reserva. Inténtalo de nuevo más tarde.');
      }
    
    } catch (error) {
      toast.error('Error al reservar. Inténtalo de nuevo más tarde.');
      console.error('Error al reservar:', error);
    } finally {
      setReservando(false);
    }
  };
  
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      className="fixed inset-0 flex items-center justify-center p-4 outline-none"
      overlayClassName="fixed inset-0 bg-black/60"
      contentLabel="Seleccionar Plazas"
    >
      <div className="bg-neutral-900 border border-neutral-700 rounded-lg p-8 max-w-sm sm:max-w-md w-full mx-auto">
        <h2 className="text-xl font-bold text-white mb-4">Reservar plazas para {evento.nombre}</h2>
        
        <div className="my-6">
          <label htmlFor="cantidadPlazas" className="block text-sm font-medium text-gray-300 mb-2">
            Número de plazas a reservar (máximo {evento.plazas_disponibles})
          </label>
          
          <div className="flex items-center">
            <button 
              onClick={() => cantidadPlazas > 1 && setCantidadPlazas(cantidadPlazas - 1)}
              className="cursor-pointer bg-gray-700 text-white px-3 py-1 rounded-l-md hover:bg-gray-600 transition-colors"
              disabled={cantidadPlazas <= 1}
            >
              -
            </button>
            
            <input
              type="number"
              id="cantidadPlazas"
              value={cantidadPlazas}
              onChange={handleCantidadChange}
              min="1"
              max={evento.plazas_disponibles}
              className="w-16 text-center py-1 border-0 bg-gray-800 text-white focus:ring-0"
            />
            
            <button 
              onClick={() => cantidadPlazas < evento.plazas_disponibles && setCantidadPlazas(cantidadPlazas + 1)}
              className="cursor-pointer bg-gray-700 text-white px-3 py-1 rounded-r-md hover:bg-gray-600 transition-colors"
              disabled={cantidadPlazas >= evento.plazas_disponibles}
            >
              +
            </button>
          </div>
        </div>

        <div className="text-sm text-gray-400 mb-6">
          Estás reservando {cantidadPlazas} plaza{cantidadPlazas > 1 ? 's' : ''} para el evento.
        </div>
        
        <div className="flex justify-end gap-3">
          <button
            onClick={handleClose}
            className="cursor-pointer bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={confirmarReserva}
            className="cursor-pointer bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors flex items-center"
            disabled={reservando}
          >
            {reservando ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                Reservando...
              </>
            ) : (
              'Confirmar reserva'
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ReservaModal;
