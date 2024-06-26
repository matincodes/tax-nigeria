import Inventories from "./inventories/inventories";
import { inventoryData } from "../../data/inventoryData";
import LineChart from "./lineChart/line-chart.jsx";
import TaxInflow from "./tax-inflow/tax-inflow";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import TimeAndDate from "../time-and-date/time-and-date";

const Dashboard = () => {
  const navigate = useNavigate();

  const addAgent = () => {
    navigate("/taxagent-registration")
  }

  const addTaxpayer = () => {
    navigate("/taxpayer")
  }
  return (
    <div className="p-4 w-full font-manrope">
      <h2 className="font-normal font-manrope text-2xl mb-4">Welcome back, <span className="font-semibold">Idris</span> ☀️</h2>

      <div className="w-full grid grid-cols-4 mb-3 items-center gap-6">
          {
            inventoryData.slice(0, -2).map(({title, numbers, imageSrc}, index) => (
              <Inventories key={index} title={title} metric={numbers} image={imageSrc}/>
            ))
          }
      </div>
      <div className="w-full grid grid-cols-12 gap-6">
        <div className="w-full col-span-9">
          {/** */}
          <div className="w-full grid grid-cols-5 ">
            <LineChart />
          </div>
          {/** */}
          <div className="w-full mt-3 grid grid-cols-5 gap-3 items-start">
            <TaxInflow />
          </div>
        </div>
        {/** 2 */}
        <div className="w-full col-span-3 space-y-5">
              {
                inventoryData.slice(-2).map(({title, numbers, imageSrc}, index) => (
                  <Inventories key={index} title={title} metric={numbers} image={imageSrc
                  }/>
                ))
              }
          

          <div className="w-full rounded-xl space-y-5 shadow p-4 flex flex-col justify-center items-center">
            <button className="w-[80%] text-white rounded-full gap-x-2 bg-tax-blue flex items-center justify-center px-5 py-3 ">
              <AiOutlinePlus className="text-2xl" />
              <p className="text-sm">Add New Consultant</p>
            </button>
            <button 
              className="w-[80%] text-white rounded-full gap-x-2 bg-tax-blue flex items-center justify-center px-5 py-3"
              onClick={addAgent}>
              <AiOutlinePlus className="text-2xl" />
              <p className="text-sm">Add New Tax Agent</p>
            </button>
            <button className="w-[80%] text-white rounded-full gap-x-2 bg-tax-blue flex items-center justify-center px-5 py-3" onClick={addTaxpayer}>
              <AiOutlinePlus className="text-2xl" />
              <p className="text-sm">Add New Tax Payer</p>
            </button>
          </div>

          <div>
              <TimeAndDate />
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
