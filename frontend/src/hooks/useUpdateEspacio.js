import { useState, useEffect } from 'react';
import { fetchWithAuth } from '../api/api';
import { useParams, useNavigate } from 'react-router-dom';

const useUpdateEspacio = (id) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        nombre: '',
        propietario: '',
        capacidad: '',
        direccion: '',
        descripcion: '',
        estado: '',
        imagen: ''
    });

    useEffect(() => {
        const fetchEspacio = async () => {
            try {
                const response = await fetchWithAuth(`/espacios/${id}`, {
                    method: 'GET',
                });
                const data = await response.json();
                setFormData(data);
                setLoading(false);
            } catch (error) {
                console.error('Error al cargar los datos del espacio:', error);
                navigate('/gestion/espacios');
            }
        };

        fetchEspacio();
    }, [id, navigate]);

    return { id, formData, loading, setFormData, setLoading};
};

export default useUpdateEspacio; 