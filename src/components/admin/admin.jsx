import { Routes, Route } from "react-router-dom";
import DashNav from "../../routes/dashnav/dashnav";
import Dashboard from "../dashboard/dashboard";
import BusinessSector from "../business-sector-page/business-sector-page";
import AgentProfile from "../profile/agentprofile";
import ConsultantProfile from "../profile/consultantprofile";

const Admin = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<DashNav />}>
          <Route index element={<Dashboard />} />
          <Route path="business" element={<BusinessSector />} />
          <Route path="agent-profile" element={<AgentProfile />} />
          <Route path="consultant-profile" element={<ConsultantProfile />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Admin;
