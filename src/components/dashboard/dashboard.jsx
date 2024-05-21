import bill from "../../assets/img/icon.png";
import tax from "../../assets/img/icon (1).png";
import revenue from "../../assets/img/icon (2).png";
import consultant from "../../assets/img/icon (3).png";
import Inventories from "./inventories/inventories";
import LineChart from "./linechart/linechart";
import TaxInflow from "./texinflow/taxinflow";
import { AiOutlinePlus } from "react-icons/ai";

const Dashboard = () => {
  return (
    <div className="p-4 w-full ">
      <h2 className="font-semibold text-2xl mb-2">Welcome Back, Nathan</h2>

      <div className="w-full grid grid-cols-4 mb-3 items-center gap-3">
        <Inventories title={"Bills Generated"} metric={100} image={bill} />
        <Inventories title={"Tax Income"} metric={100} image={tax} />
        <Inventories title={"Revenue"} metric={100} image={revenue} />
        <Inventories title={"Consultants"} metric={100} image={consultant} />
      </div>
      <div className="w-full grid grid-cols-10 gap-4">
        <div className="w-full col-span-7">
          {/** */}
          <div className="w-full  grid grid-cols-5 ">
            <LineChart />
          </div>
          {/** */}
          <div className="w-full mt-3 grid grid-cols-5 gap-3 items-start">
            <TaxInflow />
          </div>
        </div>
        {/** 2 */}
        <div className="w-full col-span-3 space-y-5">
          <div className="w-full rounded-xl shadow p-4">
            <div className="w-full flex-col   items-start flex gap-3 mb-3   py-4 px-2">
              <h2 className="text-sm w-full ">Registered TaxPayers</h2>
              <p className="text-2xl text-black">20k</p>
            </div>
            <div className="w-full flex-col  items-start flex gap-3 mb-3   py-6 px-5">
              <h2 className="text-sm w-full">Registered Businesses</h2>
              <p className="text-xl text-black">7k</p>
            </div>
            <div className="w-full flex-col  items-start flex gap-3 mb-3   py-6 px-5">
              <h2 className="text-sm w-full">Registered Tax Agents</h2>
              <p className="text-xl text-black">3k</p>
            </div>
          </div>

          <div className="w-full rounded-xl space-y-3 shadow p-4">
            <button className="w-full text-white h-20 rounded-3xl gap-x-2 bg-[#4E72D1] flex items-center justify-center">
              <AiOutlinePlus className="text-3xl" />
              <p className="">Add New Consultant</p>
            </button>
            <button className="w-full text-white h-20 rounded-3xl gap-x-2 bg-[#4E72D1] flex items-center justify-center">
              <AiOutlinePlus className="text-3xl" />
              <p className="">Add New Tax Agent</p>
            </button>
            <button className="w-full text-white h-20 rounded-3xl gap-x-2 bg-[#4E72D1] flex items-center justify-center">
              <AiOutlinePlus className="text-3xl" />
              <p className="">Add New Tax Payer</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

/**
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
 */
