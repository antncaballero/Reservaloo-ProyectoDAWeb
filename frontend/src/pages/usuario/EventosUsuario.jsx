import EventoCardUsuario from "../../components/Usuario/EventoCardUsuario";
import useFilterEvents from "../../hooks/useFilterEvents";
import EventosConFiltros from "../../components/Eventos";

const EventosUsuario = () => {
  return (
    <EventosConFiltros
      CardComponent={EventoCardUsuario}
    />
  );
};

export default EventosUsuario;
