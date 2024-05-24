// import { useEffect } from "react";
import ThreeDotIcon from "../../../assets/img/Bussiness_Sector/three_dots.svg";
import { businessSectors } from "../../../data/businessSector";
import { useState, useEffect } from "react";

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
    <div className="w-full font-manrope p-1">
      <table className="w-full flex flex-col">
        <thead className="text-[#4C4C4C] text-[14px] grid bg-[#F7F7F7] p-[10px]">
          <tr className=" grid grid-cols-2">
            <th className="text-left ">Business Sector</th>
            <th className="flex   justify-end">Action</th>
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
                  <img src={ThreeDotIcon} alt="" className="p-1" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagnation */}
      <div className="p-2 mt-3 flex font-manrope">
        <ul className="flex gap-4">
          <button
            className={`${
              sectorSection === businessSectors[0]
                ? "disabled text-[14px] text-[#74737371]"
                : "text-[14px]"
            }`}
            onClick={sectorSection === businessSectors[0] ? null : prevPage}
            name="prevPage"
            disabled={sectorSection === businessSectors[0]}
          >
            Previous Page
          </button>

          {businessSectors.map((sector) => (
            <button
              className={`${
                sectorSection === sector
                  ? "border w-[30px] h-[30px] rounded-full flex place-content-center items-center bg-tax-blue text-white"
                  : "border w-[30px] h-[30px] rounded-full flex place-content-center items-center"
              }`}
            >
              <li
                className="font-semibold text-[14px]"
                id="sectorId"
                currentSector={sector.id + 1}
              >
                {sector.id + 1}
              </li>
            </button>
          ))}

          {/* Next Page */}
          <button
            className="text-[14px]"
            onClick={nextPage}
            name="nextPage"
          >
            Next Page
          </button>
          {/* Next Page */}
        </ul>
      </div>
      {/* Pagnation */}
    </div>
  );
};

export default InnerTable;
