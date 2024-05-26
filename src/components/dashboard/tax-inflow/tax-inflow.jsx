import { HiOutlineDownload } from "react-icons/hi";
import { taxinflowData } from "../../../data/taxinflowData";

const TaxInflow = () => {
  return (
    <div className="w-full py-4 pr-4 col-span-full  rounded-xl border shadow">
      <div className="w-full flex items-center mb-4 justify-between px-10">
        <p className="font-bold mb-4 font-poppins text-base">Tax Inflow</p>
        <div className="flex items-center gap-x-3">
          <button className="bg-[#4E72D1] text-white p-2 flex items-center gap-x-2 rounded-lg text-sm">
            <HiOutlineDownload className="text-xl" />
            <p> Download</p>
          </button>
        </div>
      </div>

      <div className="w-full pb-3">
        <div className="font-semibold border-b-2 mb-2 grid border-gray-[#808080] text-sm w-full grid-cols-5 p-2 pl-10 gap-2 font-poppins">
          <p>Tax ID</p>
          <p>Agent</p>
          <p>Date</p>
          <p>Invoiced Amount</p>
          <p className="pl-16">Status</p>
        </div>
          {
            taxinflowData.map((tax, index) => (
              <div key={index} className="border-b-2 border-gray-[#808080] mb-1 text-sm grid w-full grid-cols-5 p-2 gap-2 pl-10">
                <p>{tax.taxId}</p>
                <p>{tax.agent}</p>
                <p>{tax.date}</p>
                <p>{tax.amount}</p>
                <p className={`text-green-600 pl-16 ${tax.status === "Pending" ? "text-[#AF790E]" : ""}`}>{tax.status}</p>
              </div>
            ))
          }
        {/*[1, 2, 3, 4].map((_, index) => (
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
        ))*/}
      </div>
    </div>
  );
};

export default TaxInflow;
