import { useState, useEffect } from 'react';
import { fetchWithAuth } from '../api/api';

export default function useFilterEvents() {
    const fechaActual = new Date().toISOString().split('T')[0];
    
    const [eventos, setEventos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filtros, setFiltros] = useState({
        categoria: '',
        fecha_inicio: fechaActual, // Inicializamos con la fecha actual
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
        // Al cargar por primera vez, aplicamos el filtro por fecha actual
        cargarEventos(filtros);
    }, []);

    return { eventos, loading, error, filtros, setFiltros, cargarEventos };
}