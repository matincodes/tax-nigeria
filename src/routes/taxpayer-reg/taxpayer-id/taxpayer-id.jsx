import NINProfile from "../../../assets/img/nin-profile.svg";
import InternationalID from "../../../assets/img/international-id.svg";
import NonID from "../../../assets/img/Non-id.svg";
import CircleDown from "../../../assets/img/CircleDown.svg";
import CheckCircle  from "../../../assets/img/CheckCircle.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TaxpayerID = ({nextStep}) => {

    const [selectedID, setSelectedID] = useState(null)
    const handleIDChange = (id, event) => {
        event.stopPropagation();
        setSelectedID(id)
    }
    return ( 
        <div className="font-montserrat flex flex-col justify-center items-center">
            <div className="flex flex-col text-center mt-16 mb-8">
                <h2 className="font-bold text-3xl">Tax Payer Registration</h2>
                <p className="font-normal text-2xl">Select means of identification for Taxpayer</p>
            </div>
            <div className="flex flex-col gap-5">
                <div className={`bg-zinc-100 w-[600px] ${selectedID === "NIN" ? "border-2 border-tax-blue" : ""}`}>
                    <div className="flex justify-between p-4" onClick={(event) => handleIDChange("NIN", event)}>
                        <div className="flex">
                            <img src={NINProfile} alt="NIN" />
                            <div className="flex flex-col justify-center pl-3">
                                <h3 className="text-2xl font-medium">Register with NIN</h3>
                                <p className={`text-lg ${selectedID === "NIN" ? "hidden" : "block"}`}>Register with NIN requires identity from NIN Number</p>
                            </div>
                        </div>
                        <img src={CircleDown} alt="" className={`${selectedID === "NIN" ? "block" : "hidden"}`}/>
                    </div>
                    <div className={`flex flex-col px-5 pb-5 ${selectedID === "NIN" ? "block" : "hidden"}`}>
                        <label>Input NIN Number</label>
                        <input type="text" className="pt-8 bg-transparent border-black border-b-2 outline-none"/>
                    </div>
                </div>

                <div className={`bg-zinc-100 w-[600px] ${selectedID === "International" ? "border-2 border-tax-blue" : ""}`}>
                    <div className="flex justify-between p-4" onClick={(event) => handleIDChange("International", event)}>
                        <div className="flex">
                            <img src={InternationalID} alt="Internation ID" />
                            <div className="flex flex-col justify-center pl-3">
                                <h3 className="text-2xl font-medium">Register with International ID</h3>
                                <p className={`text-lg ${selectedID === "International" ? "hidden" : "block"}`}>Register with International ID requires identity from International passport ID</p>
                            </div>
                        </div>
                        <img src={CircleDown} alt="" className={`${selectedID === "International" ? "block" : "hidden"}`}/>
                    </div>
                    <div className={`flex flex-col px-5 pb-5 ${selectedID === "International" ? "block" : "hidden"}`}>
                        <label>Input International ID Number</label>
                        <input type="text" className="pt-8 bg-transparent border-black border-b-2 outline-none"/>
                    </div>
                </div>


                <div className={`bg-zinc-100 w-[600px] ${selectedID === "Non" ? "border-2 border-tax-blue" : ""}`}>
                    <div className="flex justify-between p-4" onClick={(event) => handleIDChange("Non", event)}>
                        <div className="flex">
                            <img src={NonID} alt="NIN" />
                            <div className="flex flex-col justify-center pl-3">
                                <h3 className="text-2xl font-medium">Register without ID</h3>
                                <p className={`text-lg ${selectedID === "Non" ? "text-base" : ""}`}>Register without ID is temporary, ID will be required for 
                                future transactions</p>
                            </div>
                        </div>
                        <img src={CheckCircle} alt="" className={`${selectedID === "Non" ? "block" : "hidden"}`}/>
                    </div>
                </div>
            </div>
            <div className="flex gap-14 mt-10 w-[600px]">
                <button className="bg-[#CED8F2] w-full py-3 text-tax-blue rounded-md text-xl">
                    Back
                </button>
                <button className="bg-tax-blue w-full py-3 text-white rounded-md text-xl" onClick={nextStep}>
                    Continue
                </button>
            </div>
        </div>
     );
}
 
export default TaxpayerID;