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
          <Route path="/transaction/buy" element={<Buy />} />
        </Routes>
      </AuthProvider>

    </div>
  );
}

export default App;