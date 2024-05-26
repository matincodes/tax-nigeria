import Button from "./button/button";
import InnerTable from "./inner-section/inner-table";

const businessSectorPage = () => {
  return (
    <div className="w-full font-manrope p-[30px]">
      {/* Top Part */}
      <div className="flex justify-between items-center p-[10px]">
        <b className="text-[20px] text-[#4C4C4C]">Business Sector Management</b>
        <Button text="Add New" iconposition="right" icon="+" />

      </div>
      {/* Top Part */}

      <InnerTable />
    </div>
  );
};

export default businessSectorPage;
