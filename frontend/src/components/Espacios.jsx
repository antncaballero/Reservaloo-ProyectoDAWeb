import '../assets/css/EspaciosEventos.css';
import Header from './Header';

const Espacios = ({
    espacios,
    loading,
    error,
    filtros,
    setFiltros,
    cargarEspacios,
    CardEspacio
}) => {
  const estados = ["ACTIVO", "CERRADO"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFiltros((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    cargarEspacios(filtros);
  };
  return (
    <>
    <Header title="Espacios de Reservaloo" />
    <div className="ev-container">            
      {/* filtros */}
      <article className="filtros-section">
        <form onSubmit={handleSubmit} className="filtros-form">
          
          {/* Nombre */}
          <section className="form-group">
            <label className="form-label" htmlFor="nombre">Nombre</label>
            <input 
              type="text" 
              id="nombre" 
              name="nombre" 
              value={filtros.nombre} 
              onChange={handleInputChange}
              className="form-input"
            />
          </section>

          {/* Capacidad mínima */}
          <section className="form-group">
            <label className="form-label" htmlFor="capacidad_minima">
              Capacidad mínima
            </label>
            <input 
              type="number" 
              id="capacidad_minima" 
              name="capacidad_minima" 
              value={filtros.capacidad_minima} 
              onChange={handleInputChange}
              min="0"
              className="form-input"
            />
          </section>

          {/* Estado */}
          <section className="form-group">
            <label className="form-label" htmlFor="estado">Estado</label>
            <select 
              id="estado" 
              name="estado" 
              value={filtros.estado} 
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="">Todos</option>
              {estados.map((estado) => (
                <option key={estado} value={estado}>
                  {estado.charAt(0) + estado.slice(1).toLowerCase()}
                </option>
              ))}
            </select>
          </section>

          {/* Botón de filtro */}
          <section className="buttons-container">
            <button 
              type="submit" 
              className="btn btn-primary"
            >
              Filtrar espacios
            </button>
          </section>
        </form>
      </article>

      <article>
        {loading ? (
          <div className="loading">
            <p className="loading-text">Cargando espacios...</p>
          </div>
        ) : error ? (
          <div className="error">{error}</div>        
        ) : (
          <>
            <p className="count">Espacios encontrados: {espacios.length}</p>
            <div className="cards-grid">
              {espacios.map((espacio) => (
                <div key={espacio.id} className="card-wrapper">
                  <CardEspacio espacio={espacio} />
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

export default Espacios;