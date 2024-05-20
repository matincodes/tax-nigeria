import { Routes, Route } from "react-router-dom";
import DashNav from "../../routes/dashnav/dashnav";
import Dashboard from "../dashboard/dashboard";

const Admin = () => {
    return ( 
        <div>
            <Routes>
                <Route path="/" element={<DashNav />}>
                    <Route index element={<Dashboard/> }/>
                </Route>
            </Routes>
        </div>
     );
}
 
export default Admin;