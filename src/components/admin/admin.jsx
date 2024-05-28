import { Routes, Route } from "react-router-dom";
import DashNav from "../../routes/dashnav/dashnav";
import Dashboard from "../dashboard/dashboard";
import BusinessSector from "../business-sector-page/business-sector-page"
import ConsultantPage from "../consultant-page/consultant-page"
import AgentPage from "../agent/agent-page";
import TaskCardManagement from "../task-card-management/task-card-management";
import AgentProfile from "../profile/agentprofile";
import ConsultantProfile from "../profile/consultantprofile";
import ProfileSettings from "../profile-settings/profile-settings";

const Admin = () => {
    return ( 
        <div>
            <Routes>
                <Route path="/" element={<DashNav />}>
                    <Route index element={<Dashboard/> }/>
                    <Route path='business' element={<BusinessSector />} />
                    <Route path='consultant' element={<ConsultantPage />} />
                    <Route path='agent' element={<AgentPage />} />
                    <Route path='taxcard' element={<TaskCardManagement />} />
                    <Route path="agent-profile" element={<AgentProfile />} />
                    <Route path="consultant-profile" element={<ConsultantProfile />} />
                    <Route path="settings" element={<ProfileSettings />} />
                </Route>
            </Routes>
        </div>
     );
}
 
export default Admin;
