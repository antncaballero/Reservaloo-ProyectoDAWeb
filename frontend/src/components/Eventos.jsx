import '../assets/css/EspaciosEventos.css';
const Eventos = ({
  filtros,
  setFiltros,
  cargarEventos,
  eventos,
  loading,
  error,
  CardComponent,
}) => {
  
  const categorias = ["ACADEMICOS", "CULTURALES", "ENTRETENIMIENTO", "DEPORTES", "OTROS"];
  
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
    <div className="ev-container">
      <header className="ev-header">
        <h1 className='title'>
          Eventos de Reservaloo
        </h1>
      </header>

      {/* Filtros */}
      <section className="filtros-section">
        <form
          onSubmit={handleSubmit}
          className="filtros-form"
        >
          {/* Nombre */}
          <div className="form-group">
            <label className="form-label" htmlFor="nombre">
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={filtros.nombre}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>

          {/* Categoría */}
          <div className="form-group">
            <label className="form-label" htmlFor="categoria">
              Categoría
            </label>
            <select
              id="categoria"
              name="categoria"
              value={filtros.categoria}
              onChange={handleInputChange}
              className="form-select"
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
          <div className="form-group">
            <label className="form-label" htmlFor="fecha_inicio">
              A partir de
            </label>
            <input
              type="date"
              id="fecha_inicio"
              name="fecha_inicio"
              value={filtros.fecha_inicio}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>

          {/* Nombre espacio */}
          <div className="form-group">
            <label
              className="form-label"
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
              className="form-input"
            />
          </div>

          {/* Plazas */}
          <div className="form-group">
            <label
              className="form-label"
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
              className="form-input"
              min="0"
            />
          </div>

          {/* Botones */}
          <div className="buttons-container">
            <button
              type="submit"
              className="btn btn-primary"
            >
              Filtrar eventos
            </button>
            <button
              type="button"
              onClick={limpiarFiltros}
              className="btn btn-secondary"
            >
              Limpiar filtros
            </button>
          </div>
        </form>
      </section>

      {/* Lista de eventos */}
      <section>
        {loading ? (
          <div className="loading">
            <p className="loading-text">Cargando eventos...</p>
          </div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <>
            <p className="count">
              Eventos encontrados: {eventos.length}
            </p>
            <div className="cards-grid">
              {eventos.map((evento) => (
                <div key={evento.id} className="card-wrapper">
                  <CardComponent 
                    evento={evento}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default Eventos;
