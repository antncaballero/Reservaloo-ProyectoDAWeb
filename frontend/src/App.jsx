import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { RutaGestor } from './components/RutaGestor';
import { RutaUsuario } from './components/RutaUsuario';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// Páginas
import HomeUsuario from './pages/usuario/HomeUsuario';
import HomeGestor from './pages/gestor/HomeGestor';
import EventosUsuario from './pages/usuario/EventosUsuario';
import Evento from './pages/usuario/Evento';
import EspaciosUsuario from './pages/usuario/EspaciosUsuario';
import GestionEspacios from './pages/gestor/GestionEspacios';
import RutaDefault from './pages/RutaDefault';
import Footer from './components/layouts/Footer';
import CrearEspacio from './pages/gestor/CrearEspacio';
import ActualizarEspacio from './pages/gestor/ActualizarEspacio';
import Reservas from './pages/usuario/Reservas';
import EventosGestor from './pages/gestor/EventosGestor';
import CrearEvento from './pages/gestor/CrearEvento';
import ActualizarEvento from './pages/gestor/ActualizarEvento';
import EventosPorEspacio from './pages/usuario/EventosPorEspacio';

function App() {
  // Definir rutas de usuario y gestor en arrays para mapearlas
  const usuarioRoutes = [
    { path: "/", element: <HomeUsuario /> },
    { path: "/eventos", element: <EventosUsuario /> },
    { path: "/eventos/:id", element: <Evento /> },
    { path: "/espacios", element: <EspaciosUsuario /> },
    { path: "/reservas", element: <Reservas /> },
    { path: "/eventos/espacio/:idEspacio", element: <EventosPorEspacio /> },
  ];

  const gestorRoutes = [
    { path: "/gestor", element: <HomeGestor /> },
    { path: "/gestion/eventos", element: <EventosGestor /> },
    { path: "/gestion/espacios", element: <GestionEspacios /> },
    { path: "/espacios/crear", element: <CrearEspacio /> },
    { path: "/espacios/actualizar/:id", element: <ActualizarEspacio /> },
    { path: "/eventos/actualizar/:id", element: <ActualizarEvento /> },
    { path: "/crear-evento/:idEspacio", element: <CrearEvento /> },
  ];

  return (
    <>
    <ToastContainer 
          toastStyle={{ 
            fontSize: '1rem', 
            wordBreak: 'break-word', 
            maxWidth: '90vw',
            margin: "10px" 
          }}
    />
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rutas protegidas para usuarios normales */}
          {usuarioRoutes.map(({ path, element }) => (
            <Route
              key={path}
              path={path}
              element={<RutaUsuario>{element}</RutaUsuario>}
            />
          ))}
          {/* Rutas protegidas solo para gestores */}
          {gestorRoutes.map(({ path, element }) => (
            <Route
              key={path}
              path={path}
              element={<RutaGestor>{element}</RutaGestor>}
            />
          ))}
          {/* Ruta por defecto */}
          <Route
            path="*"
            element={
              <div className="flex flex-col h-screen justify-between">
                <RutaDefault />
                <Footer />
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </>
  );
}

export default App;
