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
import History from "./components/ecopoint/History";
import EcoPlanner from "./pages/EcoPlanner";
import NewPlanner from "./components/ecoplanner/NewPlanner";
import PlannerDetail from "./components/ecoplanner/PlannerDetail";
import EcoDucation from "./pages/EcoDucation";
import Education from "./components/ecoducation/Education";
import Quiz from "./components/ecoducation/Quiz";
import Profile from "./components/Profile";
import AddressList from "./components/AddAddress";
import Pesanan from "./components/Pesanan";
import EditName from "./components/EditName";
import EditEmail from "./components/EditEmail";
import EditPhone from "./components/EditPhone";
import EditPassword from "./components/EditPassword";
import Withdraw from "./components/Withdraw";
import EcoMunity from "./pages/EcoMunity";
import Comment from "./components/ecommunity/Comment";


function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/profile" element={<UserProfile />} /> */}

          <Route path="/transaction/sell" element={<Sell />} />
          <Route path="/transaction/sell/:noTransaction" element={<SellDetail />} />

          <Route path="/transaction/buy" element={<Buy />} />
          <Route path="/transaction/buy/:noTransaction" element={<BuyDetail />} />

          <Route path="/ecopoint" element={<EcoPoint />} />
          <Route path="/ecopoint/history" element={<History />} />
          <Route path="/ecoplanner" element={<EcoPlanner />} />
          <Route path="/ecoplanner/newplanner" element={<NewPlanner />} />
          <Route path="/ecoplanner/PlannerDetail" element={<PlannerDetail />} />
          <Route path="/ecoducation" element={<EcoDucation />} />
          <Route path="/ecoducation/education" element={<Education />} />
          <Route path="/ecoducation/quiz" element={<Quiz />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/address" element={<AddressList />} />
          <Route path="/pesanan" element={<Pesanan />} />
          <Route path="/components/editname" element={<EditName />} />
          <Route path="/components/editemail" element={<EditEmail />} />
          <Route path="/components/editphone" element={<EditPhone />} />
          <Route path="/components/editpassword" element={<EditPassword />} />
          <Route path="/components/withdraw" element={<Withdraw />} />
          <Route path="/ecommunity" element={<EcoMunity />} />
          <Route path="/ecommunity/comment" element={<Comment />} />
        </Routes>
      </AuthProvider>

    </div>
  );
}

export default App;