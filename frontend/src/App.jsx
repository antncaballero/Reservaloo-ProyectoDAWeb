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
              <UserLayout>
                <HomeUsuario />
              </UserLayout>
            </RutaUsuario>
          } />
          <Route path="/eventos" element={
            <RutaUsuario>
              <UserLayout>
                <Eventos/>
              </UserLayout>
            </RutaUsuario>
          } />
          <Route path="/espacios" element={
            <RutaUsuario>
              <UserLayout>
                <Espacios />
              </UserLayout>
            </RutaUsuario>
          } />
          <Route path="/reservas" element={
            <RutaUsuario>
              <UserLayout>
                <Reservas />
              </UserLayout>
            </RutaUsuario>
          } />
          {/* Rutas protegidas solo para gestores */}
          <Route path="/gestor" element={
            <RutaGestor>
              <GestorLayout>
                <HomeGestor />
              </GestorLayout>
            </RutaGestor>
          } />
          <Route path="/gestion/eventos" element={
            <RutaGestor>
              <GestorLayout>
                <GestionEventos />
              </GestorLayout>
            </RutaGestor>
          } />
          <Route path="/gestion/espacios" element={
            <RutaGestor>
              <GestorLayout>
                <GestionEspacios />
              </GestorLayout>
            </RutaGestor>
          } />
          <Route path="/espacios/crear" element={
            <RutaGestor>
              <GestorLayout>
                <CrearEspacio />
              </GestorLayout>
            </RutaGestor>
          } />
          <Route path="/espacios/actualizar/:id" element={
            <RutaGestor>
              <GestorLayout>
                <ActualizarEspacio />
              </GestorLayout>
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
