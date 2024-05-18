import { Route, Routes } from "react-router-dom";
import DashNav from "../../routes/dashnav/dashnav";


const Dashboard = () => {
    return ( 
        <Routes>
            <Route path="/" element={<DashNav/> } />
        </Routes>
     );
}
 
export default Dashboard;