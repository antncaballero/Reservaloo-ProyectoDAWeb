const Eventos = ({
  categorias,
  filtros,
  setFiltros,
  cargarEventos,
  eventos,
  loading,
  error,
  CardComponent,
}) => {
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

  const limpiarFiltros = () => {
    setFiltros({
      categoria: "",
      fecha_inicio: "",
      nombre: "",
      nombre_espacio: "",
      plazas_minimas: "",
    });
    cargarEventos({});
  };

  return (
    <>
      <h1 className="text-center text-4xl font-bold mb-4 mt-22 bg-gradient-to-r from-white to-yellow-300 bg-clip-text text-transparent">
        Eventos de Reservaloo
      </h1>

      {/* Filtros */}
      <section className="max-w-6xl mx-auto rounded-lg p-6">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* Nombre */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1" htmlFor="nombre">
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={filtros.nombre}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-[0.5px] focus:ring-secondary"
            />
          </div>

          {/* Categoría */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1" htmlFor="categoria">
              Categoría
            </label>
            <select
              id="categoria"
              name="categoria"
              value={filtros.categoria}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-[0.5px] focus:ring-secondary"
            >
              <option value="">Cualquiera</option>
              {categorias.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0) + cat.slice(1).toLowerCase()}
                </option>
              ))}
            </select>
          </div>

          {/* Fecha */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1" htmlFor="fecha_inicio">
              A partir de
            </label>
            <input
              type="date"
              id="fecha_inicio"
              name="fecha_inicio"
              value={filtros.fecha_inicio}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-[0.5px] focus:ring-secondary"
            />
          </div>

          {/* Nombre espacio */}
          <div className="flex flex-col">
            <label
              className="text-sm font-medium mb-1"
              htmlFor="nombre_espacio"
            >
              Nombre del espacio
            </label>
            <input
              type="text"
              id="nombre_espacio"
              name="nombre_espacio"
              value={filtros.nombre_espacio}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-[0.5px] focus:ring-secondary"
            />
          </div>

          {/* Plazas */}
          <div className="flex flex-col">
            <label
              className="text-sm font-medium mb-1"
              htmlFor="plazas_minimas"
            >
              Plazas disponibles (mínimas)
            </label>
            <input
              type="number"
              id="plazas_minimas"
              name="plazas_minimas"
              value={filtros.plazas_minimas}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-[0.5px] focus:ring-secondary"
              min="0"
            />
          </div>

          {/* Botones */}
          <div className="flex items-end justify-start gap-3">
            <button
              type="submit"
              className="bg-white text-primary px-4 py-2 rounded-md font-semibold hover:bg-gray-200 transition-colors cursor-pointer"
            >
              Filtrar eventos
            </button>
            <button
              type="button"
              onClick={limpiarFiltros}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md font-semibold hover:bg-gray-300 transition-colors cursor-pointer"
            >
              Limpiar filtros
            </button>
          </div>
        </form>
      </section>

      {/* Lista de eventos */}
      <section>
        {loading ? (
          <div className="text-center">
            <p className="text-xl">Cargando eventos...</p>
          </div>
        ) : error ? (
          <div className="text-red-700 text-center">{error}</div>
        ) : (
          <>
            <p className="text-center text-lg font-semibold mb-6">
              Eventos encontrados: {eventos.length}
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 place-items-center">
              {eventos.map((evento) => (
                <div key={evento.id} className="mb-8">
                  <CardComponent evento={evento} />
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
