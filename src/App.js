import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/home/home";
import Login from "./routes/login/login";
import Admin from "./components/admin/admin";
import ProtectedRoute from "./components/protectedRoute/protectedRoute";
import TaxAgentReg from "./routes/taxagent-reg/taxagent-reg";
import TaxPayerOne from "./routes/taxpayer-reg/taxpayer-one/taxpayer-one";
import TaxPayerTwo from "./routes/taxpayer-reg/taxpayer-two/taxpayer-two";
import TaxPayerOnboardingOne from "./routes/taxpayer-reg/taxpayer-onboarding-one/taxpayer-onboarding-one"
import TaxPayerOnboardingTwo from "./routes/taxpayer-reg/taxpayer-onboarding-two/taxpayer-onboarding-two"
import TaxPayerOnboardingThree from "./routes/taxpayer-reg/taxpayer-onboarding-three/taxpayer-onboarding-three"
import TaxPayerOnboardingFour from "./routes/taxpayer-reg/taxpayer-onboarding-four/taxpayer-onboarding-four"
import TaxPayerOnboardingFive from "./routes/taxpayer-reg/taxpayer-onboarding-five/taxpayer-onboarding-five"
import TaxpayerID from "./routes/taxpayer-reg/taxpayer-id/taxpayer-id";
import TaxpayerForm from "./routes/taxpayer-reg/taxpayer-form/taxpayer-form";
import ConsultantReg from "./routes/consultant-reg/consultant-reg";
import TaxCard from "./components/tax-card/tax-card";


const App = () => {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard/*" element={
            <ProtectedRoute>
                <Admin />
            </ProtectedRoute>
            } />
          <Route path="/taxagent-registration" element={<TaxAgentReg/>}/>
          <Route path="/taxconsultant-registration" element={<ConsultantReg/>}/>
          <Route path="/taxcard" element={<TaxCard/>}/>
        </Routes>
    </div>
  );
};

export default App;
