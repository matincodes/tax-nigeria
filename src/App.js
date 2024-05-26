import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/home/home";
import Login from "./routes/login/login";
import Admin from "./components/admin/admin";
import TaxAgentReg from "./routes/taxagent-reg/taxagent-reg";


const App = () => {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard/*" element={<Admin />} />
          <Route path="/taxagent-registration" element={<TaxAgentReg/>}/>
        </Routes>
    </div>
  );
};

export default App;
