import { Navigate } from "react-router-dom";
import ActivityCards from "../components/ActivityCard";
import DailyCard from "../components/DailyCard";
import FooterPortal from "../components/footer/FooterPortal";
import MapView from "../components/MapView";
import MenuList from "../components/MenuList";
import Navbar from "../components/navbar/Navbar";
import RecyclableCategories from "../components/RecyclableCategories";
import SearchInput from "../components/SearchInput";
import { useAuth } from "../contexts/authContext";


export default function UserProfile() {
  const { userLoggedIn } = useAuth();

  return (
    <>
      {!userLoggedIn ? <Navigate to="/login" replace={true} /> : <div className="bg-[#F8F9FA]">
        <Navbar />

        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mt-5">
          

          <div className="h-20" />
        </div>

        <FooterPortal />
      </div>}
    </>

  );
}
