import NavbarLandingPage from "../components/Navbar";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import SearchInput from "../components/SearchInput";
import MenuList from "../components/MenuList";
import SectionCategoryList from "../components/SectionCategoryList";
import FooterPortal from "../components/FooterPortal";
import MapView from "../components/MapView";
import ActivityList from "../components/ActivityList";


export default function Dashboard() {
  return (
    <div className="f-montserrat">
      <NavbarLandingPage />

      <Container>
        <div className="mt-4">
          <SearchInput />
          <MenuList className="py-3 mb-4" />
        </div>
      </Container>

      <div className="py-5" style={{backgroundColor: "#F6F6F6"}}>
        <Container>
          <SectionCategoryList />
        </Container>
      </div>

      <Container>
        <div className="mt-5">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="fw-bold text-primary ">EcoCylce Location</h4>
            <div className="w-20">
              <SearchInput classNameGroup="input-group-sm" classNameInput="form-control-sm" placeHolder="Search Location" />
            </div>
          </div>
          <Card>
            <MapView />
          </Card>
        </div>

        <div className="mt-5">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="fw-bold text-primary mb-3">Our Activity</h4>
          </div>
          
          <ActivityList />
        </div>

      </Container>

      <div className="py-5"></div>
      <FooterPortal />
    </div>
  );
}
