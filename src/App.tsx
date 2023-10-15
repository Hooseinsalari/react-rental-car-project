import { Routes, Route } from "react-router-dom";

// components
import Navbar from "./components/Navbar";

// pages
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div className="bg-[#F6F7F9;] min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
