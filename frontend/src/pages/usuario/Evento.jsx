import { useParams, useNavigate } from "react-router-dom";
import EventoCardUsuario from "../../components/Usuario/EventoCardUsuario";
import ReservaModal from "../../components/Usuario/ReservaModal";
import useEvent from "../../hooks/useEvent";
import { useState } from "react";
import Header from "../../components/Header";

const Evento = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { evento, similarEvents, loading, error } = useEvent(id);

  // Estado para controlar la apertura/cierre del modal
  const [modalIsOpen, setModalIsOpen] = useState(false);

  if (loading) {
    return (
      <section className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="text-center py-10 mt-22">
        <h2 className="text-3xl font-bold mb-4">Error</h2>
        <p className="mb-6">{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="font-medium bg-white text-primary px-4 py-2 rounded-md hover:bg-gray-300 cursor-pointer"
        >
          Volver atrás
        </button>
      </section>
    );
  }

  // Formatear fechas
  const fechaInicio = new Date(evento.fecha_inicio).toLocaleDateString();
  const fechaFin = new Date(evento.fecha_fin).toLocaleDateString();

  const buttondisabled =
    evento.plazas_disponibles === 0 ||
    fechaInicio < new Date() ||
    evento.cancelado;
  return (
    <>
      <Header title={evento.nombre} />
      <div className="px-6 ">
        {/* Contenedor principal */}
        <article className="flex flex-col md:flex-row gap-8 mb-12">
          {/* Imagen del evento (Aside izquierdo) */}
          <aside className="w-full md:w-1/3 ">
            <img
              src={evento.imagen}
              alt={evento.nombre}
              className="w-full h-auto rounded-lg shadow-lg object-cover sticky top-22"
            />
          </aside>

          {/* Información del evento (Sección derecha) */}
          <section className="w-full md:w-2/3">
            <div className="border-1 border-white rounded-lg shadow-md p-6 mb-6">
              <section className="mb-4">
                <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full mr-2">
                  {evento.categoria}
                </span>
                {Boolean(evento.cancelado) && (
                  <span className="inline-block bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full">
                    Cancelado
                  </span>
                )}
              </section>

              <h2 className="text-xl font-semibold mb-2">Descripción</h2>
              <p className="mb-6">{evento.descripcion}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <section>
                  <h2 className="text-xl font-semibold mb-2">
                    Detalles del evento
                  </h2>
                  <ul className="space-y-2 font-medium">
                    <li>Organizador: {evento.organizador}</li>
                    <li>Plazas totales: {evento.plazas}</li>
                    <li>Plazas disponibles: {evento.plazas_disponibles || "No disponible"}</li>
                    <li>Fecha inicio: {fechaInicio}</li>
                    <li>Fecha fin: {fechaFin}</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-2">Ubicación</h2>
                  <ul className="space-y-2 font-medium">
                    <li>Espacio: {evento.nombre_espacio || "No disponible"} </li>
                    <li>Dirección: {evento.direccion_espacio || "No disponible"}</li>
                  </ul>
                </section>
              </div>
            </div>

            <div className="text-center md:text-right">
              <button
                className="bg-white text-primary px-6 py-3 rounded-md font-semibold hover:bg-gray-200 transition-colors cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed disabled:text-gray-500"
                disabled={buttondisabled}
                onClick={() => setModalIsOpen(true)}
              >
                Reservar plazas
              </button>
            </div>
          </section>
        </article>
        {/* Eventos similares */}
        {similarEvents.length > 0 && (
          <article>
            <h2 className="text-2xl font-bold mb-8">Eventos similares</h2>
            <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 place-items-center">
              {similarEvents.map((similarEvento) => (
                <EventoCardUsuario
                  key={similarEvento.id}
                  evento={similarEvento}
                />
              ))}
            </section>
          </article>
        )}
        {/* Modal de reserva */}
        {!loading && evento && (
          <ReservaModal
            isOpen={modalIsOpen}
            onClose={() => setModalIsOpen(false)}
            evento={evento}
          />
        )}
      </div>
    </>
  );
};

export default Evento;
