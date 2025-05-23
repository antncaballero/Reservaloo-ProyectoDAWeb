import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useUpdateEvent from "../../hooks/useUpdateEvent";

const ActualizarEvento = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const { 
        formData, 
        setFormData, 
        loading, 
        error, 
        updateEvento,
        espacio 
    } = useUpdateEvent(id);

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        const newValue = type === "number" ?  (value === "" ? "" : parseInt(value)) : value;
        setFormData((prev) => ({
            ...prev,
            [name]: newValue,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();       
        const success = await updateEvento(); 
        if (success) {
            toast.success("Evento actualizado correctamente")
            setTimeout(() => {
                navigate("/gestion/eventos");
            }, 2000);
        } else {
            toast.error(error || "Error al actualizar el evento. Por favor, inténtalo de nuevo.")
        }
    };

    return (
        <>            
            <header className="mt-24">
                <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-white to-yellow-300 bg-clip-text text-transparent">
                    Actualizar Evento
                </h1>
                {espacio ? (
                    <p className="text-center mb-6">
                        Espacio físico: <span className="font-semibold">{espacio.nombre}</span> (Capacidad: {espacio.capacidad} personas)
                    </p>
                ) : (
                    <p className="text-center mb-6">Cargando información del espacio...</p>
                )}
            </header>

            {loading ? (
                <div className="flex justify-center items-center h-32">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
                </div>
            ) : (
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
                        </div>                    </div>

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

                    {/* Cancelado */}
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="cancelado"
                            name="cancelado"
                            checked={formData.cancelado}
                            onChange={(e) => {
                                setFormData((prev) => ({
                                    ...prev,
                                    cancelado: e.target.checked,
                                }));
                            }}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label htmlFor="cancelado" className="text-sm font-medium">
                            Evento cancelado
                        </label>
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
                            {loading ? "Actualizando..." : "Actualizar evento"}
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
            )}
        </>
    );
}

export default ActualizarEvento;