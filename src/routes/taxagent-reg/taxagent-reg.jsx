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
        stateId: 0,
        wallletId: 1,
        wallet: null,
        maxCap: 50000.00,
        miniTaxStationId: 1,
        miniTaxStation: null
    })

    const [stateData, setStateData] = useState([]);
    const [lgaData, setLgaData]  =  useState([]);
    const [selectedState, setSelectedState] = useState("")
    const [filteredLgaData, setFilteredLgaData] = useState([])
    

    useEffect(() => {
        const fetchState = async() => {
            try {
                const response = await axios.get("https://assettrack.com.ng/api/State")
                setStateData(response.data)
            } catch (error) {
                console.error("Error fetching State Data")
            }
            
        } 

        const fetchLga = async() => {
            try {
                const response = await axios.get("https://assettrack.com.ng/api/lgas")
                setLgaData(response.data)
            } catch (error) {
                console.error("Error getting LGA Data")
            }
        }

        fetchState()
        fetchLga()

    },[])

    useEffect(() => {
        if(selectedState){
            const filteredLga = lgaData.filter(lga => lga.stateId === Number(selectedState))
            setFilteredLgaData(filteredLga)
        }else{
            setFilteredLgaData([])
        }
    }, [selectedState, lgaData]);

  
    const handleStateChange = (event) => {
        setSelectedState(event.target.value);
    };

    const handleValueChange = (event) => {
        const {name, value} = event.target
        setAgentData((prevData) => ({...prevData, [name]: value}));
    } 

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
                             value={agentData.agentName}
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
                            name="emailAddress"
                            value={agentData.emailAddress}
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
                             name="address"
                             value={agentData.address}
                             placeholder="Enter Address"
                             className="border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-400 rounded"/>
                        </div>
                        <div className="w-full flex flex-col">
                            <label>
                                Phone Number 
                            </label>
                            <input 
                            type="tel"
                            name="telephoneNo" 
                            value={agentData.telephoneNo}
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
                            name="city"
                            value={agentData.city}
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
                            <select name="companyName" value={agentData.companyName} className="border-2 border-tax-blue py-4 px-5 outline-none rounded text-gray-400 bg-white">
                                <option value="Select Tax Station" key="select">Select Consultant</option>
                            </select>
                        </div>
                    </div>
                    <div className="w-full flex gap-16 pb-5">
                        <div className="w-full flex flex-col">
                            <label>
                                State
                            </label>
                            <select name="stateId" value={agentData.stateId} onClick={handleStateChange} className="border-2 border-tax-blue py-4 px-5 outline-none rounded text-gray-400 bg-white">
                                <option value="" key="select">Select Mini Tax Station</option>
                                {stateData.map(({stateId, stateName}) => (
                                    <option className="text-black" value={stateId} key={stateId}>
                                        {stateName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="w-full flex flex-col">
                            <label>
                                LGA
                            </label>
                            <select name="LgaId" value={agentData.lgaId} disabled={!selectedState} className="border-2 border-tax-blue py-4 px-5 outline-none rounded text-gray-400 bg-white">
                                <option value="" key="select">Select Consultant</option>
                                {filteredLgaData.map(({lgaId, lgaName}) => (
                                    <option value={lgaId} key={lgaId}>
                                        {lgaName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="w-full flex flex-col pb-5">
                        <label>
                            Description
                        </label>
                        <input 
                         type="text" 
                         name="description"
                         value={agentData.description}
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