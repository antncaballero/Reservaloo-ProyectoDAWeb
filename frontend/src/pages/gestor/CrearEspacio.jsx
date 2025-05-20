import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchWithAuth } from '../../api/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CrearEspacio = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        nombre: '',
        propietario: '',
        capacidad: '',
        direccion: '',
        descripcion: '',
        estado: 'ACTIVO',
        imagen: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetchWithAuth('/espacios', {
                method: 'POST',
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Error al crear el espacio');
            }

            toast.success('Espacio creado correctamente', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });

            setTimeout(() => {
                navigate('/espacios');
            }, 2000);

        } catch (error) {
            setError('Error al crear el espacio. Por favor, inténtalo de nuevo.');
            toast.error('Error al crear el espacio. Por favor, inténtalo de nuevo.', {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-8 mt-22">
            <ToastContainer />
            <h1 className="text-4xl font-bold mb-8">Crear nuevo Espacio</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nombre */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium mb-1" htmlFor="nombre">
                        Nombre del espacio *
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

                {/* Propietario */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium mb-1" htmlFor="propietario">
                        Propietario *
                    </label>
                    <input
                        type="text"
                        id="propietario"
                        name="propietario"
                        value={formData.propietario}
                        onChange={handleInputChange}
                        required
                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-[0.5px] focus:ring-secondary"
                    />
                </div>

                {/* Capacidad y Estado en la misma línea */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Capacidad */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium mb-1" htmlFor="capacidad">
                            Capacidad (personas) *
                        </label>
                        <input
                            type="number"
                            id="capacidad"
                            name="capacidad"
                            value={formData.capacidad}
                            onChange={handleInputChange}
                            required
                            min="1"
                            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-[0.5px] focus:ring-secondary"
                        />
                    </div>

                    {/* Estado */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium mb-1" htmlFor="estado">
                            Estado *
                        </label>
                        <select
                            id="estado"
                            name="estado"
                            value={formData.estado}
                            onChange={handleInputChange}
                            required
                            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-[0.5px] focus:ring-secondary"
                        >
                            <option value="ACTIVO">Activo</option>
                            <option value="CERRADO">Cerrado</option>
                        </select>
                    </div>
                </div>

                {/* Dirección */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium mb-1" htmlFor="direccion">
                        Dirección *
                    </label>
                    <input
                        type="text"
                        id="direccion"
                        name="direccion"
                        value={formData.direccion}
                        onChange={handleInputChange}
                        required
                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-[0.5px] focus:ring-secondary"
                    />
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
                    <div className="text-red-600 text-sm">
                        {error}
                    </div>
                )}

                <div className="flex gap-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-white text-primary px-6 py-2 rounded-md font-semibold hover:bg-gray-200 transition-colors cursor-pointer disabled:opacity-50"
                    >
                        {loading ? 'Creando...' : 'Crear espacio'}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/gestion/espacios')}
                        className="bg-white text-red-600 px-6 py-2 rounded-md font-semibold hover:bg-gray-200 transition-colors cursor-pointer"
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CrearEspacio;
