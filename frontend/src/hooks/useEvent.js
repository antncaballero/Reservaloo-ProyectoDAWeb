import { useState, useEffect } from "react";
import { fetchWithAuth } from "../api/api";


const useEvent = (id) => {
    const [evento, setEvento] = useState(null);
    const [similarEvents, setSimilarEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
    const fetchEvento = async () => {
      try {
        setLoading(true);
        const response = await fetchWithAuth(`/eventos/${id}`);

        if (!response.ok) {
          throw new Error("No se pudo cargar el evento");
        }

        const data = await response.json();
        setEvento(data);

        // Obtener eventos similares de la misma categoría
        if (data.categoria) {
          const similarResponse = await fetchWithAuth(
            `/eventos/categoria/${data.categoria}`
          );
          if (similarResponse.ok) {
            const similarData = await similarResponse.json();
            // Filtrar el evento actual y limitar a 3 eventos similares
            const filteredEvents = similarData
              .filter((e) => e.id !== data.id)
              .slice(0, 3);
            setSimilarEvents(filteredEvents);
          }
        }
      } catch (err) {
        console.error("Error al cargar el evento:", err);
        setError(
          "No se pudo cargar el evento. Por favor, inténtalo de nuevo más tarde."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEvento();
  }, [id]);

  return { evento, similarEvents, loading, error };
}

export default useEvent;