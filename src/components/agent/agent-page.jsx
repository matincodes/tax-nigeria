import Button from "../button/button"
import InnerTable from "./inner-section/inner-table";
import { useNavigate } from "react-router-dom";

const AgentPage = () => {
  const navigate = useNavigate()

  const addNewAgent = () => {
    navigate("/dashboard/taxagent-registration")
  }
    return ( 
        <div className="w-full font-manrope p-[30px]">
      {/* Top Part */}
      <div className="flex gap-6 items-center p-[10px]">
        <b className="text-[20px] text-[#4C4C4C]">Tax Agents</b>
        <Button text="Add New" iconposition="left" icon="+" handleButton={addNewAgent}/>
        {/*<Button text="Export Members (CSV)"/>*/}
        <Button text="Export Members (CSV)"/>
      </div>
      {/* Top Part */}


      <InnerTable />

    </div>
     );
}
 
export default AgentPage;