import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import Inventories from "./inventories/inventories";
import sector from "../../assets/img/CircleChart.png";
import org from "../../assets/img/Organization.png";
import bills from "../../assets/img/Bribery.png";
import LineChart from "./lineChart/lineChart";
import { CiBellOn } from "react-icons/ci";
import TaxInflow from "./texInflow/taxInflow";

const Dashboard = () => {
  const newReg = [
    { title: "Register Consultant", href: "" },
    { title: "Register TaxPayer", href: "" },
    { title: "Register Agent", href: "" },
  ];

  return (
    <div className="p-4 w-full">
      <h2 className="font-semibold text-2xl mb-2">Welcome Back, Nathan</h2>
      <div className="w-full grid grid-cols-10 gap-4">
        <div className="w-full col-span-8">
          <div className="w-full grid grid-cols-3 mb-3 items-center gap-3">
            {newReg.map(({ title, href }, index) => (
              <Link
                key={index}
                to={href}
                className="w-full flex gap-x-2 bg-[#4E72D1] text-white items-center justify-center rounded-lg py-8 px-4"
              >
                <p>{title}</p>
                <FaPlus className="text-3xl" />
              </Link>
            ))}
          </div>
          {/** */}
          <div className="w-full  grid grid-cols-5 gap-3 items-start">
            <LineChart />
            <div className="w-full col-span-2 gap-y-3 grid-rows-3 h-[320px]">
              <Inventories
                title={"Business Sectors"}
                metric={10}
                image={sector}
              />
              <Inventories title={"Business Type"} metric={10} image={org} />
              <Inventories
                title={"Bills Generated"}
                metric={10}
                image={bills}
              />
            </div>
          </div>
          {/** */}
          <div className="w-full mt-3 grid grid-cols-5 gap-3 items-start">
            <TaxInflow />
            <div className="hidden w-full rounded-xl bg-gray-200 p-4">
              <p className="font-semibold mb-3 text-base">Notification</p>

              {[1, 2, 3, 4, 5, 6].map((_) => (
                <div key={_} className="flex items-center mb-3 gap-x-2">
                  <CiBellOn className="text-yellow-600 text-xl" />
                  <p className="text-sm max-w-[200px] whitespace-nowrap text-ellipsis overflow-hidden">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/** 2 */}
        <div className="w-full col-span-2 rounded-xl bg-gray-200 p-4">
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
          <div className="w-full flex-col  items-start flex gap-3 mb-3   py-6 px-5">
            <h2 className="text-sm w-full">Total Tax Income</h2>
            <p className="text-xl text-black">3k</p>
          </div>
          <div className="w-full flex-col  items-start flex gap-3 mb-3   py-6 px-5">
            <h2 className="text-sm w-full">New Consultants</h2>
            <p className="text-xl text-black">3k</p>
          </div>
          <div className="w-full flex-col  items-start flex gap-3 mb-3   py-6 px-5">
            <h2 className="text-sm w-full">New Tax Agents</h2>
            <p className="text-xl text-black">3k</p>
          </div>
          <div className="w-full flex-col  items-start flex gap-3 mb-3   py-6 px-5">
            <h2 className="text-sm w-full">Total Revenue</h2>
            <p className="text-xl text-black">3k</p>
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
