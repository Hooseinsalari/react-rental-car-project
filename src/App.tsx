import { Routes, Route } from "react-router-dom";

// components
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";

// pages
import HomePage from "./pages/HomePage";
import VehiclesPage from "./pages/VehiclesPage";
import DetailCarPage from "./pages/DetailCarPage";

function App() {
  return (
    <div className="bg-[#F6F7F9;] min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="vehicles" element={<VehiclesPage />} />
        <Route path="detailCar/:id" element={<DetailCarPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
