import { useState, useEffect } from "react";
import { consultants } from "../../../data/consultants";
import Button from "../../button/button";
import ProgressBar from "../../progress-bar/progress-bar";
import Pagination from "../../pagination/pagination";

const InnerTable = () => {
  const [paginationNum, setPaginationNum] = useState(0);
  const [consultantSection, setConsultantSection] = useState(
    consultants[paginationNum]
  );

  const prevPage = (e) => {
    if (paginationNum <= 0) {
      return;
    }
    setPaginationNum(paginationNum - 1);
    console.log(paginationNum);
  };

  const nextPage = (e) => {
    if (paginationNum === consultants.length - 1) {
      return;
    }
    setPaginationNum(paginationNum + 1);
    console.log(paginationNum);
  };

  useEffect(()=>{
    setConsultantSection(consultants[paginationNum])
  }, [paginationNum])

  return (
    <div className="w-full font-manrope p-1 mt-[15px]">
      <table className="w-full flex flex-col">
        <thead className="text-[#4C4C4C] text-[14px] grid bg-[#F7F7F7] p-[10px]">
          <tr className=" grid grid-cols-2">
            <div className="left w-full flex">
              <th className="text-left basis-[50%]">Conultants</th>
              <th className="text-left basis-[50%]">Ratings</th>
            </div>

            <div className="right w-full flex justify-end">
              <th className="text-left">Tax Station</th>
              <th className="basis-[50%] text-right pr-7">Action</th>
            </div>
          </tr>
        </thead>

        <tbody className="text-[13px] bg-[#f7f7f7cb] p-[10px] space-y-3">
          {consultantSection.consultants.map((consultant) => (
            <tr className="flex">
              <div className="left w-full flex items-center">
                <td className="text-left basis-[50%] flex items-center gap-3">
                  
                  <img
                    src={consultant.image}
                    alt={consultant.name}
                    className="w-[32px] h-[32px] grid place-content-center object-cover object-center rounded-full overflow-hidden"
                  />
                  {consultant.name}
                </td>

                <td className="text-left basis-[50%]  flex gap-2 items-center ">
                 <ProgressBar progress={consultant.rating} max={100} />
                  {consultant.rating}{"%"}
                </td>
              </div>

              <div className="right w-full flex justify-end items-center">
                <td className="text-left flex basis-[47.8%] ">
                  
                  {consultant.tax_station}
                </td>
                <td className="flex place-content-center">
                  
                  <Button text="Profile" />
                </td>
              </div>
            </tr>
          ))}
        </tbody>
      </table>
          
      <Pagination prevPage={prevPage} nextPage={nextPage} paginationArray={consultants} paginationSection={consultantSection} />
      
    </div>
  );
};

export default InnerTable;
