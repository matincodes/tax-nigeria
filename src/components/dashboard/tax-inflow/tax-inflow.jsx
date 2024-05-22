import { HiOutlineDownload } from "react-icons/hi";
import { IoFilter } from "react-icons/io5";

const TaxInflow = () => {
  return (
    <div className="w-full p-4 col-span-full  rounded-xl border shadow">
      <div className="w-full flex items-center mb-4 justify-between">
        <p className="font-semibold mb-4">Tax Inflow</p>
        <div className="flex items-center gap-x-3">
          <button className="flex items-center gap-x-2 border p-1 text-xs">
            <IoFilter className="text-lg" />
            <p>Filter</p>
          </button>
          <button className="bg-[#4E72D1] text-white p-2 flex items-center gap-x-2 rounded-lg text-sm">
            <HiOutlineDownload className="text-xl" />
            <p> Download</p>
          </button>
        </div>
      </div>

      <div className="w-full   pb-3">
        <div className="font-semibold border-b mb-2 grid border-gray-400 text-sm w-full grid-cols-6 p-2 gap-2 ">
          <p>Date</p>
          <p>TaxID</p>
          <p className="col-span-2">Agent</p>
          <p>In. Amount</p>
          <p>Status</p>
        </div>
        {[1, 2, 3, 4].map((_, index) => (
          <div
            key={_}
            className=" border-b border-gray-300 mb-1 text-sm grid w-full grid-cols-6 p-2 gap-2 "
          >
            <p>10/02/2023</p>
            <p>RTIE343WDN</p>
            <p className="col-span-2 w-full text-ellipsis whitespace-nowrap overflow-hidden">
              Chukuemeka Emmmanuel
            </p>
            <p>N45,000</p>
            <p
              className={` ${
                index === 1 ? "text-yellow-600" : "text-green-600"
              }`}
            >
              {index === 1 ? "Pending" : "Cleared"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaxInflow;
