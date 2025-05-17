import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { RutaGestor } from './components/RutaGestor';
import { RutaUsuario } from './components/RutaUsuario';

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
              <HomeUsuario />
            </RutaUsuario>
          } />
          <Route path="/eventos" element={
            <RutaUsuario>
              <Eventos />
            </RutaUsuario>
          } />
          <Route path="/espacios" element={
            <RutaUsuario>
              <Espacios />
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

          {/* Ruta por defecto */}
          <Route path="*" element={
            <RutaDefault />
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
