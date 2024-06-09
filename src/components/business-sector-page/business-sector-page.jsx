import { useNavigate } from "react-router-dom";
import Button from "../button/button";
import InnerTable from "./inner-section/inner-table";
import React from "react";
import axios from "axios";

const BusinessSectorPage = () => {
  const navigate = useNavigate()

  return (
    <div className="w-full font-manrope p-[30px]">
      {/* Top Part */}
      <div className="flex justify-between items-center p-[10px]">
        <b className="text-[20px] text-[#4C4C4C]">Business Sector Management</b>
        <Button
        handleButton={() => navigate("business/add-business-sector")}
        text="Add New" iconposition="right" icon="+" />

      </div>
      {/* Top Part */}

      <InnerTable />
    </div>
  );
};

export default BusinessSectorPage;
