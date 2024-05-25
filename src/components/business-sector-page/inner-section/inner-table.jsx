// import { useEffect } from "react";
import ThreeDotIcon from "../../../assets/img/Bussiness_Sector/three_dots.svg";
import { businessSectors } from "../../../data/businessSector";
import { useState, useEffect } from "react";
import Pagination from "../../pagination/pagination";

const InnerTable = () => {
  const [paginationNum, setPaginationNum] = useState(0);
  const [sectorSection, setSectorSection] = useState(
    businessSectors[paginationNum]
  );

  const prevPage = (e) => {
    if (paginationNum <= 0) {
      return;
    }
    setPaginationNum(paginationNum - 1);
    console.log(paginationNum);
  };  

  const nextPage = (e) => {
    if (paginationNum === businessSectors.length - 1) {
      return;
    }
    setPaginationNum(paginationNum + 1);
    console.log(paginationNum);
  };

  useEffect(() => {
    setSectorSection(businessSectors[paginationNum]);
  }, [paginationNum]);

  return (
    <div className="w-full font-manrope p-1 mt-[15px]">
      <table className="w-full flex flex-col">
        <thead className="text-[#4C4C4C] text-[14px] grid bg-[#F7F7F7] p-[10px]">
          <tr className=" grid grid-cols-2">
            <th className="text-left ">Business Sector</th>
            <th className="flex justify-end pr-3">Action</th>
          </tr>
        </thead>

        <tbody className="text-[13px] divide-y divide-gray-200 bg-[#f7f7f7cb]">
          {sectorSection.sectors.map((business) => (
            <tr
              className="flex items-center justify-between w-full p-[10px]"
              key={business.id}
            >
              <td className="py-[14px] text-left"> {business.sector} </td>
              <td className="py-[14px] flex justify-end items-center">
                <button type="button" className="w-full mr-4">
                  <img src={ThreeDotIcon} alt="" className="pr-3" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination prevPage={prevPage} nextPage={nextPage} paginationArray={businessSectors} paginationSection={sectorSection} />
      
    </div>
  );
};

export default InnerTable;
