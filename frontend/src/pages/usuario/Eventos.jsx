import EventoCardUsuario from "../../components/Usuario/EventoCardUsuario";
import useFilterEvents from "../../hooks/UseFilterEvents";

const Eventos = () => {
  const categorias = [
    "ACADEMICOS",
    "CULTURALES",
    "ENTRETENIMIENTO",
    "DEPORTES",
    "OTROS",
  ];

  const { eventos, loading, error, filtros, setFiltros, cargarEventos } = useFilterEvents();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFiltros((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    cargarEventos(filtros);
  };

  return (
    <>
      <h1 className="text-center text-4xl font-bold mb-4 mt-22">
        Eventos de Reservaloo
      </h1>
      
      {/* Sección de filtros */}
      <section className="max-w-6xl mx-auto rounded-lg p-6">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Nombre */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1" htmlFor="nombre"> Nombre </label>
            <input type="text" id="nombre" name="nombre" value={filtros.nombre} onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-[0.5px] focus:ring-secondary"
            />
          </div>

          {/* Categoría */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1" htmlFor="categoria"> Categoría </label>
            <select id="categoria" name="categoria" value={filtros.categoria} onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-[0.5px] focus:ring-secondary"
            >
              <option className="text-primary font-medium" value="">Cualquiera</option>
              {categorias.map((categoria) => (
                <option key={categoria} value={categoria} className="text-primary font-medium">
                  {categoria.charAt(0) + categoria.slice(1).toLowerCase()}
                </option>
              ))}
            </select>
          </div>

          {/* Fecha de inicio */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1" htmlFor="fecha_inicio"> A partir de </label>
            <input type="date" id="fecha_inicio" name="fecha_inicio" value={filtros.fecha_inicio} onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-[0.5px] focus:ring-secondary"
            />
          </div>

          {/* Nombre del espacio */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1" htmlFor="nombre_espacio"> Nombre del espacio </label>
            <input type="text" id="nombre_espacio" name="nombre_espacio" value={filtros.nombre_espacio} onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-[0.5px] focus:ring-secondary"
            />
          </div>

          {/* Plazas disponibles */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1" htmlFor="plazas_minimas" > Plazas disponibles (mínimas)</label>
            <input type="number" id="plazas_minimas" name="plazas_minimas" value={filtros.plazas_minimas} onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-[0.5px] focus:ring-secondary"
              min="0"             
            />
          </div>          {/* Botones de control */}
          <div className="flex items-end justify-start gap-3">
            <button type="submit"
              className="bg-white text-primary px-4 py-2 rounded-md font-semibold hover:bg-gray-200 transition-colors cursor-pointer"
            >
              Filtrar eventos
            </button>
            <button type="button"
              onClick={() => {
                // Reiniciar filtros pero manteniendo la fecha actual
                setFiltros({
                  categoria: '',
                  fecha_inicio: '',
                  nombre: '',
                  nombre_espacio: '',
                  plazas_minimas: ''
                });
                // Aplicar filtros vacíos para mostrar todos los eventos
                cargarEventos({});
              }}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md font-semibold hover:bg-gray-300 transition-colors cursor-pointer"
            >
              Limpiar filtros
            </button>
          </div>
        </form>
      </section>

      <section>
        {loading ? (
          <div className="text-center">
            <p className="text-xl">Cargando eventos...</p>
          </div>
        ) : error ? (
          <div className="text-red-700 text-center">{error}</div>        
        ) : (
          <>
            <p className="text-center text-lg font-semibold mb-6">Eventos encontrados: {eventos.length}</p>
            {/* grid de eventos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 place-items-center">
              {eventos.map((evento) => (
                <div key={evento.id} className="mb-8">
                  <EventoCardUsuario evento={evento} />
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default Eventos;
