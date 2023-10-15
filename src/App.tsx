import { Routes, Route } from "react-router-dom";


// components
import Navbar from "./components/shared/Navbar";

// pages
import HomePage from "./pages/HomePage";
import Footer from "./components/shared/Footer";

function App() {
  return (
    <div className="bg-[#F6F7F9;] min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
