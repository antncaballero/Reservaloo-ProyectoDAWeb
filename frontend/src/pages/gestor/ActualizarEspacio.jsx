import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchWithAuth } from '../../api/api';
import useUpdateEspacio from '../../hooks/useUpdateEspacio';

const ActualizarEspacio = () => {
    const navigate = useNavigate();
    const { id, formData, loading, setFormData, setLoading } = useUpdateEspacio();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetchWithAuth(`/espacios/${id}`, {
                method: 'PATCH',
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error al actualizar el espacio');
            }
            toast.success('Espacio actualizado correctamente', { autoClose: 2500 });
            setTimeout(() => { navigate('/gestion/espacios') }, 2500);
        } catch (error) {
            toast.error(error.message);
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <ToastContainer />
            <div className="max-w-2xl mx-auto mt-22">
                <h1 className="text-4xl font-bold text-white mb-8">Actualizar Espacio</h1>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="nombre" className="block text-sm font-medium text-white mb-1">
                            Nombre del espacio
                        </label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-white rounded-md focus:border-secondary"
                        />
                    </div>

                    <div>
                        <label htmlFor="propietario" className="block text-sm font-medium text-white mb-1">
                            Propietario
                        </label>
                        <input
                            type="text"
                            id="propietario"
                            name="propietario"
                            value={formData.propietario}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-white rounded-md focus:border-secondary"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="capacidad" className="block text-sm font-medium text-white mb-1">
                                Capacidad
                            </label>
                            <input
                                type="number"
                                id="capacidad"
                                name="capacidad"
                                value={formData.capacidad}
                                onChange={handleChange}
                                required
                                min="0"
                                className="w-full px-4 py-2 border border-white rounded-md  focus:border-secondary"
                            />
                        </div>

                        <div>
                            <label htmlFor="estado" className="block text-sm font-medium text-white mb-1">
                                Estado
                            </label>
                            <select
                                id="estado"
                                name="estado"
                                value={formData.estado}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-white rounded-md focus:border-secondary"
                            >
                                <option className="text-primary font-medium" value="ACTIVO">Activo</option>
                                <option className="text-primary font-medium" value="CERRADO">Cerrado</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="direccion" className="block text-sm font-medium text-white mb-1">
                            Dirección
                        </label>
                        <input
                            type="text"
                            id="direccion"
                            name="direccion"
                            value={formData.direccion}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-white rounded-md focus:border-secondary"
                        />
                    </div>

                    <div>
                        <label htmlFor="descripcion" className="block text-sm font-medium text-white mb-1">
                            Descripción
                        </label>
                        <textarea
                            id="descripcion"
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleChange}
                            required
                            rows="4"
                            className="w-full px-4 py-2 border border-white rounded-md focus:border-secondary"
                        />
                    </div>

                    <div>
                        <label htmlFor="imagen" className="block text-sm font-medium text-white mb-1">
                            URL de la imagen
                        </label>
                        <input
                            type="url"
                            id="imagen"
                            name="imagen"
                            value={formData.imagen}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-white rounded-md focus:border-secondary"
                        />
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={() => navigate('/gestion/espacios')}
                            className="bg-white text-red-600 px-6 py-2 rounded-md font-semibold hover:bg-gray-200 transition-colors cursor-pointer"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-white text-primary px-6 py-2 rounded-md font-semibold hover:bg-gray-200 transition-colors cursor-pointer"
                        >
                            {loading ? 'Actualizando...' : 'Actualizar Espacio'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ActualizarEspacio;
