import { Routes, Route, Navigate } from "react-router-dom";

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
import PaymentPage from "./pages/PaymentPage";
import DashboardPage from "./pages/DashboardPage";
import NotFound from "./pages/NotFound";

// helper
import ScrollToTop from "./helper/ScrollToTop";

// context
import { useAuth } from "./context/AuthContextProvider";

function App() {
  const { userData } = useAuth();

  return (
    <div className="bg-[#F6F7F9;] min-h-screen">
      <Navbar />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<HomePage />} />
        <Route path="vehicles" element={<VehiclesPage />} />
        <Route path="detailCar/:id" element={<DetailCarPage />} />
        <Route
          path="register"
          element={userData.user ? <Navigate to="/" /> : <RegisterPage />}
        />
        <Route
          path="login"
          element={userData.user ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
      <Footer />
      <Toaster />
      <ScrollToTop />
    </div>
  );
}

export default App;
