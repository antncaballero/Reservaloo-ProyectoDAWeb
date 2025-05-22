import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { RutaGestor } from './components/RutaGestor';
import { RutaUsuario } from './components/RutaUsuario';


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

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>       
          {/* Rutas protegidas para usuarios normales */}
          <Route path="/" element={
            <RutaUsuario>
              <HomeUsuario />
            </RutaUsuario>
          } />
          <Route path="/eventos" element={
            <RutaUsuario>
              <EventosUsuario/>
            </RutaUsuario>
          } />
          <Route path="/eventos/:id" element={
            <RutaUsuario>
              <Evento />
            </RutaUsuario>
          } />
          <Route path="/espacios" element={
            <RutaUsuario>
              <EspaciosUsuario />
            </RutaUsuario>
          } />
          <Route path="/reservas" element={
            <RutaUsuario>
              <Reservas />
            </RutaUsuario>
          } />
          {/* Rutas protegidas solo para gestores */}
          <Route path="/gestor" element={
            <RutaGestor>
              <HomeGestor />
            </RutaGestor>
          } />
          <Route path="/gestion/eventos" element={
            <RutaGestor>
              <EventosGestor />
            </RutaGestor>
          } />
          <Route path="/gestion/espacios" element={
            <RutaGestor>
              <GestionEspacios />
            </RutaGestor>
          } />
          <Route path="/espacios/crear" element={
            <RutaGestor>
              <CrearEspacio />
            </RutaGestor>
          } />
          <Route path="/espacios/actualizar/:id" element={
            <RutaGestor>
              <ActualizarEspacio />
            </RutaGestor>
          } />
          <Route path="/eventos/crear" element={
            <RutaGestor>
              <CrearEvento />
            </RutaGestor>
          } />
          {/* Rutas para layouts */}
          {/* Ruta por defecto */}
          <Route path="*" element={
              <div className="flex flex-col h-screen justify-between">
                <RutaDefault />
                <Footer />
              </div>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
