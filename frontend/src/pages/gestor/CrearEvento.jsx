import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import useEspacio from "../../hooks/useEspacio";
 import { fetchWithAuth } from '../../api/api';

const CrearEvento = () => {
  const { idEspacio } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const {espacio} = useEspacio(idEspacio);

  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    organizador: "",
    plazas: "",
    categoria: "ACADEMICOS",
    fecha_inicio: "",
    fecha_fin: "",
    espacio_id: idEspacio,
    imagen: "",
    cancelado: false
  });

  // Cargar datos del espacio


  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    const newValue = type === "number" ? 
      (value === "" ? "" : parseInt(value)) : value;
    
    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validar que las fechas sean válidas
    const fechaInicio = new Date(formData.fecha_inicio);
    const fechaFin = new Date(formData.fecha_fin);
    
    if (fechaFin < fechaInicio) {
      setError("La fecha de fin no puede ser anterior a la fecha de inicio");
      setLoading(false);
      toast.error("La fecha de fin no puede ser anterior a la fecha de inicio");
      return;
    }

    // Validar que las plazas no excedan la capacidad del espacio
    if (espacio && formData.plazas > espacio.capacidad) {
      setError(`El número de plazas no puede superar la capacidad del espacio (${espacio.capacidad})`);
      setLoading(false);
      toast.error(`El número de plazas no puede superar la capacidad del espacio (${espacio.capacidad})`);
      return;
    }

    try {
      const response = await fetchWithAuth("/eventos", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.mensaje || "Error al crear el evento");
      }

      toast.success("Evento creado correctamente", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      setTimeout(() => {
        navigate(`/gestion/eventos`);
      }, 2000);
    } catch (error) {
      setError(error.message || "Error al crear el evento. Por favor, inténtalo de nuevo.");
      toast.error(error.message || "Error al crear el evento. Por favor, inténtalo de nuevo.", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      
      <header className="mt-24">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-white to-yellow-300 bg-clip-text text-transparent">
          Crear nuevo Evento
        </h1>
        {espacio ? (
          <p className="text-center mb-6">
            Espacio físico: <span className="font-semibold">{espacio.nombre}</span> (Capacidad: {espacio.capacidad} personas)
          </p>
        ) : (
          <p className="text-center mb-6">Cargando información del espacio...</p>
        )}      </header>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto px-4 mb-8">
        {/* Nombre */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1" htmlFor="nombre">
            Nombre del evento *
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            required
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-[0.5px] focus:ring-secondary"
          />
        </div>

        {/* Organizador */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1" htmlFor="organizador">
            Organizador *
          </label>
          <input
            type="text"
            id="organizador"
            name="organizador"
            value={formData.organizador}
            onChange={handleInputChange}
            required
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-[0.5px] focus:ring-secondary"
          />
        </div>

        {/* Plazas y Categoría en la misma línea */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Plazas */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1" htmlFor="plazas">
              Número de plazas *
            </label>
            <input
              type="number"
              id="plazas"
              name="plazas"
              value={formData.plazas}
              onChange={handleInputChange}
              required
              min="1"
              max={espacio?.capacidad}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-[0.5px] focus:ring-secondary"
            />
            {espacio && (
              <p className="text-xs text-gray-400 mt-1">
                Máximo: {espacio.capacidad} personas
              </p>
            )}
          </div>

          {/* Categoría */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1" htmlFor="categoria">
              Categoría *
            </label>
            <select
              id="categoria"
              name="categoria"
              value={formData.categoria}
              onChange={handleInputChange}
              required
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-[0.5px] focus:ring-secondary"
            >
              <option value="ACADEMICOS" className="text-primary">Académicos</option>
              <option value="CULTURALES" className="text-primary">Culturales</option>
              <option value="ENTRETENIMIENTO" className="text-primary">Entretenimiento</option>
              <option value="DEPORTES" className="text-primary">Deportes</option>
              <option value="OTROS" className="text-primary">Otros</option>
            </select>
          </div>
        </div>

        {/* Fechas en la misma línea */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Fecha Inicio */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1" htmlFor="fecha_inicio">
              Fecha de inicio *
            </label>
            <input
              type="date"
              id="fecha_inicio"
              name="fecha_inicio"
              value={formData.fecha_inicio}
              onChange={handleInputChange}
              required
              min={new Date().toISOString().split('T')[0]}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-[0.5px] focus:ring-secondary"
            />
          </div>

          {/* Fecha Fin */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1" htmlFor="fecha_fin">
              Fecha de fin *
            </label>
            <input
              type="date"
              id="fecha_fin"
              name="fecha_fin"
              value={formData.fecha_fin}
              onChange={handleInputChange}
              required
              min={formData.fecha_inicio || new Date().toISOString().split('T')[0]}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-[0.5px] focus:ring-secondary"
            />
          </div>
        </div>

        {/* Descripción */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1" htmlFor="descripcion">
            Descripción *
          </label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleInputChange}
            required
            rows="4"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-[0.5px] focus:ring-secondary"
          />
        </div>

        {/* URL de la imagen */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1" htmlFor="imagen">
            URL de la imagen *
          </label>
          <input
            type="url"
            id="imagen"
            name="imagen"
            value={formData.imagen}
            onChange={handleInputChange}
            required
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-[0.5px] focus:ring-secondary"
          />
        </div>

        {error && (
          <div className="text-red-600 text-sm">{error}</div>
        )}

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading || !espacio}
            className="bg-white text-primary px-6 py-2 rounded-md font-semibold hover:bg-gray-200 transition-colors cursor-pointer disabled:opacity-50"
          >
            {loading ? "Creando..." : "Crear evento"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/gestion/eventos")}
            className="bg-white text-red-600 px-6 py-2 rounded-md font-semibold hover:bg-gray-200 transition-colors cursor-pointer"
          >
            Cancelar
          </button>
        </div>
      </form>
    </>
  );
};

export default CrearEvento;
