import { Link } from "react-router-dom";

const EspacioCardGestor = ({ espacio }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden sm:w-90 w-80 h-110 flex flex-col transition-transform duration-300 hover:scale-105">
      <div className="h-48 w-full">
        <img
          src={espacio.imagen}
          alt={espacio.nombre}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-xl font-semibold text-primary mb-2 line-clamp-1">
          {espacio.nombre}
        </h3>
        <div className="space-y-2 flex-1">
          <p className="text-gray-600 line-clamp-1">
            <span className="font-medium">Propietario:</span>{" "}
            {espacio.propietario}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Capacidad:</span> {espacio.capacidad}{" "}
            personas
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Estado:</span>
            <span
              className={`ml-2 px-2 py-1 rounded-full text-sm ${
                espacio.estado === "ACTIVO"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {espacio.estado}
            </span>
          </p>
          <p className="text-gray-600 line-clamp-2">
            <span className="font-medium">Dirección:</span> {espacio.direccion}
          </p>
        </div>
        <div className="mt-4 flex justify-between items-center gap-2">
          <Link
            to={`/crear-evento/${espacio.id}`}
            className={`px-4 py-2 rounded-md transition-colors flex-1 text-center 
                            ${
                              espacio.estado !== "ACTIVO"
                                ? "bg-gray-300 text-red-500 cursor-not-allowed pointer-events-none"
                                : " bg-primary hover:bg-primary/90"
                            }`}
            aria-disabled={espacio.estado !== "ACTIVO"}
          >
            Crear evento
          </Link>
          <Link
            to={`/espacios/actualizar/${espacio.id}`}
            className="bg-secondary text-primary px-4 py-2 rounded-md hover:bg-secondary/80 transition-colors flex-1 text-center"
          >
            Actualizar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EspacioCardGestor;
