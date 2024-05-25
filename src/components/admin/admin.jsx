import { Routes, Route } from "react-router-dom";
import DashNav from "../../routes/dashnav/dashnav";
import Dashboard from "../dashboard/dashboard";
import BusinessSector from "../business-sector-page/business-sector-page"
import ConsultantPage from "../consultant-page/consultant-page"
import AgentPage from "../agent/agent-page";

const Admin = () => {
    return ( 
        <div>
            <Routes>
                <Route path="/" element={<DashNav />}>
                    <Route index element={<Dashboard/> }/>
                    <Route path='business' element={<BusinessSector />} />
                    <Route path='consultant' element={<ConsultantPage />} />
                    <Route path='agent' element={<AgentPage />} />
                </Route>
            </Routes>
        </div>
     );
}
 
export default Admin;