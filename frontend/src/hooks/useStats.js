import { useState, useEffect } from "react";
import { fetchWithAuth } from "../api/api";

const useStats = () => {
  const [numEspaciosActivos, setNumEspaciosActivos] = useState(0);
  const [numEventosFuturos, setNumEventosFuturos] = useState(0);

  const fetchEspaciosActivos = async () => {
    try {
      const response = await fetchWithAuth(`/espacios/count`);
      if (response.ok) {
        const data = await response.json();
        setNumEspaciosActivos(data.count);
      } else {
        console.error("Error al cargar espacios activos:", response.statusText);
        setError("Error al cargar espacios activos");
      }
    } catch (error) {
      console.error("Error al cargar espacios activos:", error);
      setError("Error al cargar espacios activos");
    }
  };

  const fetchEventosFuturos = async () => {
    try {
      const response = await fetchWithAuth(`/eventos/count`);
      if (response.ok) {
        const data = await response.json();
        setNumEventosFuturos(data.count);
      } else {
        console.error("Error al cargar eventos futuros:", response.statusText);
        setError("Error al cargar eventos futuros");
      }
    } catch (error) {
      console.error("Error al cargar eventos futuros:", error);
      setError("Error al cargar eventos futuros");
    }
  };

  useEffect(() => {
    fetchEspaciosActivos();
    fetchEventosFuturos();
  }, []);

  return { numEspaciosActivos, numEventosFuturos };
};

export default useStats;
