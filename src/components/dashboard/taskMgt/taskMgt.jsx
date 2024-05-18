import { Link } from "react-router-dom";
import paystack from "../../../assets/img/paystack.png";

const TaskMgt = () => {
  return (
    <div className="w-full flex flex-col items-start gap-y-4 justify-start">
      <div className="w-full flex items-center justify-between">
        <h2 className="font-semibold text-lg">Task Management</h2>
        <Link to="" className="text-[#B4CD93] font-medium text-xs">
          View All
        </Link>
      </div>

      <div className="flex w-full flex-col gap-y-2 items-start justify-start">
        {[1, 2, 3].map((_) => (
          <div key={_} className="w-full grid grid-cols-3 items-center">
            <div className="flex items-center gap-x-2">
              <img src={paystack} alt="" />
              <p className="text-sm">Paystack</p>
            </div>
            <p>N3,000</p>
            <button className="bg-[#B4CD93] text-white rounded-lg px-3 h-11 flex ">
              22/04/2023
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskMgt;
