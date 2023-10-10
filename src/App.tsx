import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";

import {Routes, Route} from "react-router-dom"

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
