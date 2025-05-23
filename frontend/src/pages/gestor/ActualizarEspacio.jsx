import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchWithAuth } from '../../api/api';
import useUpdateEspacio from '../../hooks/useUpdateEspacio';

const ActualizarEspacio = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { formData, loading, setFormData, setLoading } = useUpdateEspacio(id);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetchWithAuth(`/espacios/${id}`, {
                method: 'PUT',
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error al actualizar el espacio');
            }
            toast.success('Espacio actualizado correctamente', { autoClose: 2500});
            setTimeout(() => { navigate('/gestion/espacios') }, 2500);
        } catch (error) {
            toast.error(error.message);
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <header className='text-center mb-8 mt-24'>
                <h1 className="text-3xl md:text-4xl font-bold md:mb-0 bg-gradient-to-r from-white to-yellow-300 bg-clip-text text-transparent">
                Actualizar Espacio
            </h1>
            </header>
            <div className="max-w-2xl mx-auto">      
                <form onSubmit={handleSubmit} className="space-y-6">
                    <section>
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
                    </section>

                    <section>
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
                    </section>

                    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    </section>

                    <section>
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
                    </section>

                    <section>
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
                    </section>

                    <section>
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
                    </section>

                    <section className="flex justify-end space-x-4">
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
                    </section>
                </form>
            </div>
        </div>
    );
};

export default ActualizarEspacio;
