import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/home/home";
import Login from "./routes/login/login";
import Admin from "./components/admin/admin";
import ProtectedRoute from "./components/protectedRoute/protectedRoute";
import TaxAgentReg from "./routes/taxagent-reg/taxagent-reg";
import ConsultantReg from "./routes/consultant-reg/consultant-reg";
import TaxCard from "./components/tax-card/tax-card";
import TaxStationReg from "./routes/taxstation-reg/taxstation-reg";


const App = () => {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route
          path='/dashboard/*'
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route path='/taxagent-registration' element={<TaxAgentReg />} />
        <Route path='/taxconsultant-registration' element={<ConsultantReg />} />
        <Route path='/taxstation-registration' element={<TaxStationReg />} />
        <Route path='/taxcard' element={<TaxCard />} />
      </Routes>
    </div>
  )
};

export default App;
