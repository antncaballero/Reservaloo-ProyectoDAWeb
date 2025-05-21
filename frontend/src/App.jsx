import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { RutaGestor } from './components/RutaGestor';
import { RutaUsuario } from './components/RutaUsuario';
import UserLayout from './components/layouts/UserLayout';
import GestorLayout from './components/layouts/GestorLayout';

// Páginas
import HomeUsuario from './pages/usuario/HomeUsuario';
import HomeGestor from './pages/gestor/HomeGestor';
import Eventos from './pages/usuario/Eventos';
import Evento from './pages/usuario/Evento';
import Espacios from './pages/usuario/Espacios';
import GestionEventos from './pages/gestor/GestionEventos';
import GestionEspacios from './pages/gestor/GestionEspacios';
import RutaDefault from './pages/RutaDefault';
import Footer from './components/layouts/Footer';
import CrearEspacio from './pages/gestor/CrearEspacio';
import ActualizarEspacio from './pages/gestor/ActualizarEspacio';
import Reservas from './pages/usuario/Reservas';

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
              <Eventos/>
            </RutaUsuario>
          } />
          <Route path="/eventos/:id" element={
            <RutaUsuario>
              <Evento />
            </RutaUsuario>
          } />
          <Route path="/espacios" element={
            <RutaUsuario>
              <Espacios />
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
              <GestionEventos />
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
