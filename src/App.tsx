import { Routes, Route } from "react-router-dom";

// toast
import { Toaster } from "react-hot-toast";

// components
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";

// pages
import HomePage from "./pages/HomePage";
import VehiclesPage from "./pages/VehiclesPage";
import DetailCarPage from "./pages/DetailCarPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

// helper
import ScrollToTop from "./helper/ScrollToTop";

function App() {
  return (
    <div className="bg-[#F6F7F9;] min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="vehicles" element={<VehiclesPage />} />
        <Route path="detailCar/:id" element={<DetailCarPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
      </Routes>
      <Footer />
      <Toaster />
      <ScrollToTop />
    </div>
  );
}

export default App;
