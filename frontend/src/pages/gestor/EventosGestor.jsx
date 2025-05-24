import EventoCardGestor from "../../components/Gestor/EventoCardGestor";
import useFilterEvents from "../../hooks/useFilterEvents";
import EventosConFiltros from "../../components/Eventos";

const EventosGestor = () => {
  return (
    <EventosConFiltros
      CardComponent={EventoCardGestor}
    />
  );
};

export default EventosGestor;
