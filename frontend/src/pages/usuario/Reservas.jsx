import ReservaCard from "../../components/Usuario/ReservaCard";
import useReservas from "../../hooks/useReservas";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Header from "../../components/Header";

export default function Reservas() {
  const { user } = useContext(AuthContext);
  const { reservas, setReservas, filtro, setFiltro } = useReservas(user.id);

  const handleCancelar = (reservaId) => {
    setReservas(reservas.filter((r) => r.id !== reservaId));
  };

  const reservasFiltradas = reservas.filter((reserva) => {
    const fechaInicio = new Date(reserva.fecha_inicio);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    return filtro === "actuales" ? fechaInicio >= hoy : fechaInicio < hoy;
  });

  return (
    <>
      <Header title="Mis reservas"/>
      
      <div className="container mx-auto p-x">
        {/* Sección de filtro */}
        <section className="mb-8 flex flex-col justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-4">
            <div className="flex gap-4 w-full md:w-auto justify-center">
              <button
                onClick={() => setFiltro("actuales")}
                className={`px-4 py-3 rounded-md cursor-pointer transition-all duration-200 w-full md:w-auto  ${
                  filtro === "actuales"
                    ? "bg-white text-primary shadow-md font-bold"
                    : "bg-gray-400 text-gray-700 hover:bg-gray-300 font-normal"
                }`}
              >
                Reservas Actuales
              </button>
              <button
                onClick={() => setFiltro("anteriores")}
                className={`px-6 py-3 rounded-md cursor-pointer transition-all duration-200 w-full md:w-auto ${
                  filtro === "anteriores"
                    ? "bg-white text-primary shadow-md font-bold"
                    : "bg-gray-400 text-gray-700 hover:bg-gray-300 font-normal"
                }`}
              >
                Reservas Anteriores
              </button>
            </div>
          </div>
        </section>

        {/* Sección de reservas */}
        <section className="space-y-6">
          {reservasFiltradas.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-300">
                No hay reservas{" "}
                {filtro === "actuales" ? "actuales" : "anteriores"}
              </p>
            </div>
          ) : (
            <div className="grid gap-6">
              {reservasFiltradas.map((reserva) => (
                <ReservaCard
                  key={reserva.id}
                  reserva={reserva}
                  onCancelar={handleCancelar}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
}
