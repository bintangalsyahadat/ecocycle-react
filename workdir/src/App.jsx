import { Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from './contexts/authContext';
import Home from "./pages/Home";
import "./App.css";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import 'leaflet/dist/leaflet.css';
import Dashboard from "./pages/Dashboard";
import Sell from "./pages/Transaction/Sell";
import Buy from "./pages/Transaction/Buy";
import EcoPoint from "./pages/Eco/EcoPoint";
import RiwayatAktivitas from "./components/ecopoint/RiwayatAktivitas";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
          <Route path="/transaction/sell" element={<Sell />} />
          <Route path="/transaction/buy" element={<Buy />} /> 
          <Route path="/Eco/EcoPoint" element={<EcoPoint />} />
          <Route path="/ecopoint/RiwayatAktivitas" element={<RiwayatAktivitas />} />
        </Routes>
      </AuthProvider>

    </div>
  );
}

export default App;