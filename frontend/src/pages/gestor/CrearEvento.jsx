const CrearEvento = () => {
    return (
        <div className="container mt-22">
            <h1 className="text-4xl font-bold text-white mb-6 text-center">Crear Evento</h1>
            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                <form>
                    <div className="mb-4">
                        <label htmlFor="nombre" className="block text-sm font-medium text-gray-300">Nombre del evento</label>
                        <input type="text" id="nombre" className="mt-1 block w-full bg-gray-700 text-white border border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="descripcion" className="block text-sm font-medium text-gray-300">Descripción</label>
                        <textarea id="descripcion" rows="4" className="mt-1 block w-full bg-gray-700 text-white border border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"></textarea>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="fechaInicio" className="block text-sm font-medium text-gray-300">Fecha de inicio</label>
                        <input type="datetime-local" id="fechaInicio" className="mt-1 block w-full bg-gray-700 text-white border border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="fechaFin" className="block text-sm font-medium text-gray-300">Fecha de fin</label>
                        <input type="datetime-local" id="fechaFin" className="mt-1 block w-full bg-gray-700 text-white border border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Crear Evento</button>
                </form>
            </div>
        </div>
    );
}

export default CrearEvento;