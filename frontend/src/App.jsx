import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { RutaGestor } from './components/RutaGestor';
import { RutaUsuario } from './components/RutaUsuario';
import UserLayout from './components/layouts/UserLayout';
import GestorLayout from './components/layouts/GestorLayout';

// Páginas
import HomeUsuario from './pages/HomeUsuario';
import HomeGestor from './pages/HomeGestor';
import Eventos from './pages/Eventos';
import Espacios from './pages/Espacios';
import GestionEventos from './pages/GestionEventos';
import GestionEspacios from './pages/GestionEspacios';
import RutaDefault from './pages/RutaDefault';

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
                <Eventos />
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

          {/* Ruta por defecto */}
          <Route path="*" element={
            <UserLayout>
              <RutaDefault />
            </UserLayout>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
