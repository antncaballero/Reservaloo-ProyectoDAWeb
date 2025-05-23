import { useState, useEffect } from 'react';
import { fetchWithAuth } from '../api/api';

const useEventosPorEspacio = (espacioId) => {
    const [eventos, setEventos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEventos = async () => {
            if (!espacioId) {
                setLoading(false);
                setEventos([]);
                return;
            }

            try {
                setLoading(true);
                const response = await fetchWithAuth(`/eventos/espacio/${espacioId}`);
                if (response) {
                    const data = await response.json();
                    setEventos(data);
                } 
                setError(null);
            } catch (error) {
                console.error('Error al obtener eventos del espacio:', error);
                setError('No se pudieron cargar los eventos del espacio.');
                setEventos([]);
            } finally {
                setLoading(false);
            }
        };

        fetchEventos();
    }, [espacioId]);

    return { eventos, loading, error };
};

export default useEventosPorEspacio;
