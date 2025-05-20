export default function RutaDefault() {
    return (  
            <div className="text-center p-8 mt-30">
                <h1 className="text-4xl font-bold mb-4 text-white">¡Ups!</h1>
                <p className="text-xl text-white mb-3">Lo sentimos, la página que buscas no existe.</p>
                <p className="text-white">No hemos podido encontrar la ruta que estás buscando.</p>
                <button onClick={() => window.location.href = '/'} className="cursor-pointer mt-6 px-6 py-2 bg-white text-primary rounded-md hover:bg-gray-200 font-bold text-l">
                    Volver al inicio
                </button>
            </div> 
    );
}
