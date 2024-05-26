import Button from "../button/button"
import InnerTable from "./inner-section/inner-table";

const AgentPage = () => {
    return ( 
        <div className="w-full font-manrope p-[30px]">
      {/* Top Part */}
      <div className="flex gap-6 items-center p-[10px]">
        <b className="text-[20px] text-[#4C4C4C]">Consultants</b>
        <Button text="Add New" iconposition="left" icon="+" />
        <Button text="Export Members (CSV)"/>
        <Button text="Export Members (Excel)"/>
      </div>
      {/* Top Part */}


      <InnerTable />

    </div>
     );
}
 
export default AgentPage;