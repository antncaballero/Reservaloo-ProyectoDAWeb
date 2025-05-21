import { useState, useEffect } from 'react';
import { fetchWithAuth } from '../api/api';

const useReservas = (id) => {
    const [reservas, setReservas] = useState([]);
    const [filtro, setFiltro] = useState('actuales'); // 'actuales' o 'anteriores'

    const cargarReservas = async () => {
        try {
            const response = await fetchWithAuth(`/reservas/usuario/${id}`);
            const data = await response.json();
            setReservas(data);
        } catch (error) {
            console.error('Error al cargar las reservas:', error);
        }
    };

    useEffect(() => {
        cargarReservas();
    }, [id]);

    return {
        reservas,
        setReservas,
        filtro,
        setFiltro
    };
}

export default useReservas;