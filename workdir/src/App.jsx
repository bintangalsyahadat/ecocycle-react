import { Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from './contexts/authContext';
import Home from "./pages/Home";
import "./App.css";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import 'leaflet/dist/leaflet.css';
import Dashboard from "./pages/Dashboard";
import Sell from "./pages/Transaction/Sell";
import UserProfile from "./pages/UserProfile";
import Buy from "./pages/Transaction/Buy";
import SellDetail from "./pages/Transaction/SellDetail";
import BuyDetail from "./pages/Transaction/BuyDetail";
import EcoPoint from "./pages/EcoPoint";
import RiwayatAktivitas from "./components/ecopoint/RiwayatAktivitas";
import EcoPlanner from "./pages/EcoPlanner";
import RencanaBaru from "./components/ecoplanner/RencanaBaru";   
import PlannerDetail from "./components/ecoplanner/PlannerDetail"; 
import EcoDucation from "./pages/EcoDucation";  
import Edukasi from "./components/ecoducation/Edukasi";
import Quiz from "./components/ecoducation/Quiz";


function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<UserProfile />} />
          
          <Route path="/transaction/sell" element={<Sell />} />
          <Route path="/transaction/sell/:noTransaction" element={<SellDetail />} />
          
          <Route path="/transaction/buy" element={<Buy />} />
          <Route path="/transaction/buy/:noTransaction" element={<BuyDetail />} />
           
          <Route path="/EcoPoint" element={<EcoPoint />} />
          <Route path="/ecopoint/RiwayatAktivitas" element={<RiwayatAktivitas />} />
          <Route path="/ecoplanner" element={<EcoPlanner />} />
          <Route path="/ecoplanner/RencanaBaru" element={<RencanaBaru />} />
          <Route path="/ecoplanner/PlannerDetail" element={<PlannerDetail />} />
          <Route path="/ecoducation" element={<EcoDucation />} />
          <Route path="/ecoducation/Edukasi" element={<Edukasi />} />
          <Route path="/ecoducation/Quiz" element={<Quiz />} />
        </Routes>
      </AuthProvider>

    </div>
  );
}

export default App;