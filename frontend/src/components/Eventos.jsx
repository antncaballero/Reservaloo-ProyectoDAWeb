import "../assets/css/EspaciosEventos.css";
import useFilterEvents from "../hooks/useFilterEvents";
import Header from "./Header";
const Eventos = ({CardComponent}) => {
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
      <Header title="Eventos de Reservaloo" />
      <div className="ev-container">
        {/* Filtros */}
        <article className="filtros-section">
          <form onSubmit={handleSubmit} className="filtros-form">
            {/* Nombre */}
            <section className="form-group">
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
            </section>

            {/* Categoría */}
            <section className="form-group">
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
            </section>

            {/* Fecha */}
            <section className="form-group">
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
            </section>

            {/* Nombre espacio */}
            <section className="form-group">
              <label className="form-label" htmlFor="nombre_espacio">
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
            </section>

            {/* Plazas */}
            <section className="form-group">
              <label className="form-label" htmlFor="plazas_minimas">
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
            </section>

            {/* Botones */}
            <section className="buttons-container">
              <button type="submit" className="btn btn-primary">
                Filtrar eventos
              </button>
              <button
                type="button"
                onClick={limpiarFiltros}
                className="btn btn-secondary"
              >
                Limpiar filtros
              </button>
            </section>
          </form>
        </article>

        {/* Lista de eventos */}
        <article>
          {loading ? (
            <div className="loading">
              <p className="loading-text">Cargando eventos...</p>
            </div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : (
            <>
              <p className="count">Eventos encontrados: {eventos.length}</p>
              <div className="cards-grid">
                {eventos.map((evento) => (
                  <div key={evento.id} className="card-wrapper">
                    <CardComponent evento={evento} />
                  </div>
                ))}
              </div>
            </>
          )}
        </article>
      </div>
    </>
  );
};

export default Eventos;
