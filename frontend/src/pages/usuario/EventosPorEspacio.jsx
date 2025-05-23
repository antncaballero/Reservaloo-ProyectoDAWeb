import { useParams, Link } from "react-router-dom"
import useEspacio from "../../hooks/useEspacio"
import useEventosPorEspacio from "../../hooks/useEventosPorEspacio"
import EventoCardUsuario from "../../components/Usuario/EventoCardUsuario"

const EventosPorEspacio = () => {
    const { idEspacio } = useParams()
    const { espacio } = useEspacio(idEspacio)
    const { eventos, loading, error } = useEventosPorEspacio(idEspacio)

    if (loading) return <div className="min-h-screen mt-50 animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>     

    if (!espacio || error) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center text-center px-4">
                <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
                <p className="text-lg mb-6">{error || "Parece que no se encontró el espacio buscado..." }</p>
                <Link to="/espacios" className="text-primary bg-white py-2 px-4 rounded-lg hover:bg-white/80 transition-colors">
                    Volver a espacios
                </Link>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8 mt-16">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div>
                        <h1 className="text-3xl font-bold text-primary mb-2">{espacio.nombre}</h1>
                        <p className="text-gray-600 mb-2"><span className="font-medium">Dirección:</span> {espacio.direccion}</p>
                        <p className="text-gray-600"><span className="font-medium">Capacidad:</span> {espacio.capacidad} personas</p>
                    </div>
                    <div className="mt-4 md:mt-0">
                        <Link to="/espacios" className="inline-block bg-secondary text-primary py-2 px-4 rounded-lg hover:bg-secondary/80 transition-colors">
                            Volver a espacios
                        </Link>
                    </div>
                </div>
            </div>            
            
            <h2 className="text-2xl font-bold mb-6">Próximos eventos en este espacio:</h2>
            {eventos.length === 0 ? (
                <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                    <p className="text-xl text-gray-600 mb-4">No hay eventos programados próximamente en este espacio.</p>
                    <Link to="/eventos" className="inline-block bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/80 transition-colors">
                        Ver todos los eventos
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 place-items-center">
                    {eventos.map(evento => (
                        <EventoCardUsuario key={evento.id} evento={evento} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default EventosPorEspacio;