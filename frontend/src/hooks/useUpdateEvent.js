import { useState, useEffect } from "react";
import { fetchWithAuth } from "../api/api";

const useUpdateEvent = (id) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    organizador: "",
    plazas: "",
    categoria: "",
    cancelado: "",
    fecha_inicio: "",
    fecha_fin: "",
    espacio_id: "",
    imagen: "",
  });
  const [espacio, setEspacio] = useState(null);

  // Convertir las fechas a formato local para el input de tipo date
  const toLocalISOString = (dateString) => {
    const date = new Date(dateString);
    const pad = (n) => n.toString().padStart(2, "0");
    return (
      date.getFullYear() +
      "-" +
      pad(date.getMonth() + 1) +
      "-" +
      pad(date.getDate())
    );
  };

  useEffect(() => {
    const fetchEvento = async () => {
      try {
        const response = await fetchWithAuth(`/eventos/${id}`);
        if (!response.ok) throw new Error("No se pudo cargar el evento");
        const data = await response.json();

        setFormData({
          ...data,
          fecha_inicio: toLocalISOString(data.fecha_inicio),
          fecha_fin: toLocalISOString(data.fecha_fin),
        });

        // Cargar información del espacio
        const espacioResponse = await fetchWithAuth(
          `/espacios/${data.espacio_id}`
        );

        if (espacioResponse.ok) {
          const espacioData = await espacioResponse.json();
          setEspacio(espacioData);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error al cargar los datos del evento:", error);
        setError("No se pudo cargar la información del evento");
        setLoading(false);
      }
    };

    fetchEvento();
  }, [id]);

  const updateEvento = async () => {
    setLoading(true);
    setError(null);

    try {
      // Validar que las fechas sean válidas
      const fechaInicio = new Date(formData.fecha_inicio);
      const fechaFin = new Date(formData.fecha_fin);

      if (fechaFin < fechaInicio) {
        setError("La fecha de fin no puede ser anterior a la fecha de inicio");
        setLoading(false);
        return false;
      }

      // Validar que las plazas no excedan la capacidad del espacio
      if (formData.plazas > espacio.capacidad) {
        setError(
          `El número de plazas no puede superar la capacidad del espacio (${espacio.capacidad})`
        );
        setLoading(false);
        return false;
      }

      const response = await fetchWithAuth(`/eventos/${id}`, {
        method: "PUT",
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.mensaje || "Error al actualizar el evento");
      }

      setLoading(false);
      return true;
    } catch (error) {
      setError(error.message || "Error al actualizar el evento");
      setLoading(false);
      return false;
    }
  };

  return {
    formData,
    setFormData,
    loading,
    setLoading,
    error,
    setError,
    updateEvento,
    espacio,
  };
};

export default useUpdateEvent;
