import { useState, useEffect } from "react";
import axios from "axios";

const TaxAgentReg = () => {

    const [agentData, setAgentData] = useState({
        companyName: "",
        telephoneNo: "",
        emailAddress: "",
        address: "",
        city: "",
        lgaId: 0,
        description: "",
        agentName: "",
        telephone: "",
        consultantId: 0,
    })

  

    return ( 
        <div className="font-montserrat flex flex-col items-center">
            <div className="flex flex-col text-center mt-6 mb-8">
                <h2 className="font-bold text-3xl">Tax Agent Registration</h2>
                <p className="font-normal text-2xl">This can be done in less than a minute!</p>
            </div>
            <div className="w-3/5">
                <form className="flex flex-col items-center">
                    <div className="w-full flex gap-16 pb-5">
                        <div className="w-full flex flex-col">
                            <label>
                                Full Name
                            </label>
                            <input 
                             type="text"
                             name="agentName" 
                             placeholder="Enter Agent's Name"
                             className="border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded"/>
                        </div>
                        <div className="w-full flex flex-col">
                            <label>
                                Password
                            </label>
                            <input 
                            type="password" 
                            placeholder="Create Temporary Password"
                            className="border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded"/>
                        </div>
                    </div>
                    <div className="w-full flex flex-col pb-5">
                        <label>
                            Email
                        </label>
                        <input 
                            type="email" 
                            placeholder="Enter Email Address"
                            className="border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded"/>
                    </div>
                    <div className="w-full flex gap-16 pb-5">
                        <div className="w-full flex flex-col">
                            <label>
                                Address
                            </label>
                            <input 
                             type="text"
                             placeholder="Enter Address"
                             className="border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-400 rounded"/>
                        </div>
                        <div className="w-full flex flex-col">
                            <label>
                                Phone Number 
                            </label>
                            <input 
                            type="tel" 
                            placeholder="Enter Phone Number"
                            className="border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-400 rounded"/>
                        </div>
                    </div>
                    <div className="w-full flex gap-16 pb-5">
                        <div className="w-full flex flex-col">
                            <label>
                                City
                            </label>
                            <input 
                            type="text"
                            placeholder="Enter City Tax Station is Located"
                            className="border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-400 rounded"/>
                        </div>
                        <div className="w-full flex flex-col">
                            <label>
                                Tax Station
                            </label>
                            <select className="border-2 border-tax-blue py-4 px-5 outline-none rounded text-gray-400 bg-white">
                                <option value="Select Tax Station" key="select">Select Tax Station</option>
                            </select>
                        </div>
                    </div>
                    <div className="w-full flex gap-16 pb-5">
                        <div className="w-full flex flex-col">
                            <label>
                                Mini Tax Station
                            </label>
                            <select className="border-2 border-tax-blue py-4 px-5 outline-none rounded text-gray-400 bg-white">
                                <option value="Select Mini Tax Station" key="select">Select Mini Tax Station</option>
                            </select>
                        </div>
                        <div className="w-full flex flex-col">
                            <label>
                                Consultant Name
                            </label>
                            <select className="border-2 border-tax-blue py-4 px-5 outline-none rounded text-gray-400 bg-white">
                                <option value="Select Tax Station" key="select">Select Consultant</option>
                            </select>
                        </div>
                    </div>
                    <div className="w-full flex flex-col pb-5">
                        <label>
                            Description
                        </label>
                        <input 
                         type="text" 
                         placeholder="Tax Agent"
                         className="border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded"/>
                    </div>
                    <div className="w-full pb-5">
                        <button className="bg-tax-blue w-full py-3 text-white rounded-md text-2xl">
                            Confirm
                        </button>
                    </div>
                </form>
            </div>
        </div>
     );
}
 
export default TaxAgentReg;