import EventoCardGestor from "../../components/Gestor/EventoCardGestor";
import useFilterEvents from "../../hooks/useFilterEvents";
import EventosConFiltros from "../../components/Eventos";

const EventosGestor = () => {
  const { eventos, loading, error, filtros, setFiltros, cargarEventos } = useFilterEvents();

  return (
    <EventosConFiltros
      eventos={eventos}
      loading={loading}
      error={error}
      filtros={filtros}
      setFiltros={setFiltros}
      cargarEventos={cargarEventos}
      CardComponent={EventoCardGestor}
    />
  );
};

export default EventosGestor;
