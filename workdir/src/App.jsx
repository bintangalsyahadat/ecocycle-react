import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/login" element={<Login />} />
         <Route path="/register" element={<Register />} />
      </Routes>
     
    </div>
  );
}

export default App;