
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/home/home";
import Dashboard from "./components/dashboard/dashboard";
import Login from "./routes/login/login";

const App = () => {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
    </div>
  );
};

export default App;
