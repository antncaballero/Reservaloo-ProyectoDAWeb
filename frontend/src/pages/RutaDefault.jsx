export default function RutaDefault() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="text-center p-8 rounded-lg shadow-lg bg-white">
                <h1 className="text-4xl font-bold mb-4 text-indigo-600">¡Ups!</h1>
                <p className="text-xl text-gray-800 mb-3">Lo sentimos, la página que buscas no existe.</p>
                <p className="text-gray-600">No hemos podido encontrar la ruta que estás buscando.</p>
                <button onClick={() => window.location.href = '/'} className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-bold text-l">
                    Volver al inicio
                </button>
            </div>
        </div>
    );
}
