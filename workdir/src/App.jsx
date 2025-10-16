import { Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from './contexts/authContext';
import Home from "./pages/Home";
import "./App.css";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import 'leaflet/dist/leaflet.css';
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </AuthProvider>

    </div>
  );
}

export default App;