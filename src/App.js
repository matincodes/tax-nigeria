
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/home/home";
import Dashboard from "./components/dashboard/dashboard";

const App = () => {
  return (
    <div className="App w-full h-full text-zinc-700 text-[13px] sm:text-sm">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
    </div>
  );
};

export default App;
