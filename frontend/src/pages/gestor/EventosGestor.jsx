import EventoCardGestor from "../../components/Gestor/EventoCardGestor";
import useFilterEvents from "../../hooks/UseFilterEvents";
import EventosConFiltros from "../../components/Eventos";

const categorias = ["ACADEMICOS", "CULTURALES", "ENTRETENIMIENTO", "DEPORTES", "OTROS"];

const EventosGestor = () => {
  const { eventos, loading, error, filtros, setFiltros, cargarEventos } = useFilterEvents();

  return (
    <EventosConFiltros
      categorias={categorias}
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
