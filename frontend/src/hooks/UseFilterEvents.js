import { useState, useEffect } from 'react';
import { fetchWithAuth } from '../api/api';

export default function useFilterEvents() {
    const [eventos, setEventos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filtros, setFiltros] = useState({
        categoria: '',
        fecha_inicio: '',
        nombre: '',
        nombre_espacio: '',
        plazas_minimas: ''
    });

    const cargarEventos = async (params = {}) => {
        try {
            setLoading(true);
            const queryParams = new URLSearchParams(params).toString();
            const response = await fetchWithAuth(`/eventos/filtrar?${queryParams}`);
            
            if (!response.ok) {
                throw new Error('Error al cargar los eventos');
            }
            
            const data = await response.json();
            setEventos(data);
            setError(null);
        } catch (err) {
            setError('Error al cargar los eventos. Por favor, inténtalo de nuevo más tarde.');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarEventos();
    }, []);

    return { eventos, loading, error, filtros, setFiltros, cargarEventos };
}