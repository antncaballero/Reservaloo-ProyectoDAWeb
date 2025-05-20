import React from "react";
import EspacioCardGestor from "../../components/Gestor/EspacioCardGestor";
import useFilterEspacios from "../../hooks/useFilterEspacios";
import { Link } from "react-router-dom";

const GestionEspacios = () => {
  const estados = ["ACTIVO", "CERRADO"];

  const { espacios, loading, error, filtros, setFiltros, cargarEspacios } = useFilterEspacios();

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
      <div className="flex justify-between items-center max-w-6xl mx-auto pt-8 px-8 mt-22 mb-4">
        <h1 className="text-4xl font-bold">
          Gestión de Espacios
        </h1>
        <Link 
          to="/espacios/crear"
          className="bg-white text-primary px-6 py-2 rounded-md font-semibold hover:bg-gray-200 transition-colors cursor-pointer flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Crear espacio
        </Link>
      </div>
      
      {/* Sección de filtros */}
      <section className="p-8 mx-auto max-w-6xl">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Nombre */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1" htmlFor="nombre">Nombre</label>
            <input 
              type="text" 
              id="nombre" 
              name="nombre" 
              value={filtros.nombre} 
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-[0.5px] focus:ring-secondary"
            />
          </div>

          {/* Capacidad mínima */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1" htmlFor="capacidad_minima">
              Capacidad mínima
            </label>
            <input 
              type="number" 
              id="capacidad_minima" 
              name="capacidad_minima" 
              value={filtros.capacidad_minima} 
              onChange={handleInputChange}
              min="0"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-[0.5px] focus:ring-secondary"
            />
          </div>

          {/* Estado */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1" htmlFor="estado">Estado</label>
            <select 
              id="estado" 
              name="estado" 
              value={filtros.estado} 
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-[0.5px] focus:ring-secondary"
            >
              <option value="" className="text-primary font-medium">Todos</option>
              {estados.map((estado) => (
                <option key={estado} value={estado} className="text-primary font-medium">
                  {estado.charAt(0) + estado.slice(1).toLowerCase()}
                </option>
              ))}
            </select>
          </div>

          {/* Botón de filtro */}
          <div className="flex items-end justify-start">
            <button 
              type="submit" className="bg-white text-primary px-4 py-2 rounded-md font-semibold hover:bg-gray-200 transition-colors cursor-pointer"
            >
              Filtrar espacios
            </button>
          </div>
        </form>
      </section>

      <section className="m">
        {loading ? (
          <div className="text-center">
            <p className="text-xl">Cargando espacios...</p>
          </div>
        ) : error ? (
          <div className="text-red-700 text-center">{error}</div>        
        ) : (
          <>
            <p className="text-center text-lg font-semibold mb-6">Espacios encontrados: {espacios.length} </p>
            {/* grid de espacios */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 place-items-center">
              {espacios.map((espacio) => (
                <div key={espacio.id} className="mb-8">
                  <EspacioCardGestor espacio={espacio} />
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default GestionEspacios;