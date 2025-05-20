import { useState, useEffect } from 'react';
import { fetchWithAuth } from '../api/api';

const useFilterEspacios = () => {
    const [espacios, setEspacios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filtros, setFiltros] = useState({
        nombre: '',
        capacidad_minima: '',
        estado: ''
    });

    const cargarEspacios = async (filtros) => {
        try {
            setLoading(true);
            let url = '/espacios';
            
            // Construir query params
            const params = new URLSearchParams();
            if (filtros.nombre) params.append('nombre', filtros.nombre);
            if (filtros.capacidad_minima) params.append('capacidad_minima', filtros.capacidad_minima);
            if (filtros.estado) params.append('estado', filtros.estado);
            
            if (params.toString()) {
                url += `?${params.toString()}`;
            }

            const response = await fetchWithAuth(url);
            if (!response.ok) {
                throw new Error('Error al cargar los espacios');
            }
            const data = await response.json();
            setEspacios(data);
            setError(null);
        } catch (error) {
            setError('Error al cargar los espacios');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    {/* Si ponemos filtros como dependencia, se va a ejecutar cada vez que se cambie el estado de los filtros, lanzando un nuevo fetch, sería muy ineficiente*/}
    useEffect(() => {
        cargarEspacios(filtros);
    }, []);

    return { espacios, loading, error, filtros, setFiltros, cargarEspacios };
};

export default useFilterEspacios; 