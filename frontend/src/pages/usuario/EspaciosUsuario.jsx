import EspacioCardUsuario from "../../components/Usuario/EspacioCardUsuario";
import useFilterEspacios from "../../hooks/useFilterEspacios";
import Espacios from "../../components/Espacios";

const EspaciosUsuario = () => {

  const { espacios, loading, error, filtros, setFiltros, cargarEspacios } = useFilterEspacios();
  
  return (
    <Espacios
      espacios={espacios}
      loading={loading}
      error={error}
      filtros={filtros}
      setFiltros={setFiltros}
      cargarEspacios={cargarEspacios}
      CardEspacio={EspacioCardUsuario}
    />
  );
  
};

export default EspaciosUsuario;