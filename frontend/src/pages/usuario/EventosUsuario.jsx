import EventoCardUsuario from "../../components/Usuario/EventoCardUsuario";
import useFilterEvents from "../../hooks/useFilterEvents";
import EventosConFiltros from "../../components/Eventos";


const Eventos = () => {
  const { eventos, loading, error, filtros, setFiltros, cargarEventos } = useFilterEvents();

  return (
    <EventosConFiltros
      eventos={eventos}
      loading={loading}
      error={error}
      filtros={filtros}
      setFiltros={setFiltros}
      cargarEventos={cargarEventos}
      CardComponent={EventoCardUsuario}
    />
  );
};

export default Eventos;
