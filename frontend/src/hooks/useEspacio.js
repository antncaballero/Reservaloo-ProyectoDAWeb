import { useState, useEffect } from "react";
import { fetchWithAuth } from "../api/api";

const useEspacio = (id) => {
  const [espacio, setEspacio] = useState(null);

  const fetchEspacio = async () => {
    try {
      const response = await fetchWithAuth(`/espacios/${id}`);
      if (response.ok) {
        const data = await response.json();
        setEspacio(data);
      } else {
        console.error("Error al cargar espacio:", response.statusText);
      }
    } catch (error) {
      console.error("Error al cargar espacio:", error);
    }
  };

  useEffect(() => {
    fetchEspacio();
  }, [id]);

  return { espacio };
};

export default useEspacio;
