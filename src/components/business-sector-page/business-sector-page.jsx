import { useNavigate } from "react-router-dom";
import Button from "../button/button";
import InnerTable from "./inner-section/inner-table";
import React, { useEffect, useState } from "react";
import axios from "axios";

const BusinessSectorPage = () => {
  const navigate = useNavigate();

  const [sectorData, setSectorData] = useState(null);

  useEffect(() => {
    const fetchSectors = async () => {
      try {
        const response = await axios.get(
          "https://assettrack.com.ng/api/sector",
        );
        setSectorData(response.data);
      } catch (error) {
        console.error("Error fetching Business Sector Data");
      }
    };

    fetchSectors();
  }, []);

  return (
    <div className="w-full font-manrope p-[30px]">
      {/* Top Part */}
      <div className="flex justify-between items-center p-[10px]">
        <b className="text-[20px] text-[#4C4C4C]">Business Sector Management</b>
        <Button
          handleButton={() =>
            navigate("/dashboard/business/add-business-sector")
          }
          text="Add New"
          iconposition="right"
          icon="+"
        />
      </div>
      {/* Top Part */}

      <InnerTable sectorData={sectorData} />
    </div>
  );
};

export default BusinessSectorPage;
