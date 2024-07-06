import { useState, useEffect } from "react";
import axios from "axios";

const TaxPayerThree = ({nextStep, prevStep}) => {
    const [taxpayerData, setTaxpayerData] = useState({
        stationID: "",
        consultantID: "",
        stateID: "",
        lgaID: "",
        arithOrder: ""
    });

    const [taxpayerId, setTaxpayerId] = useState('')

    const [isFormComplete, setIsFormComplete] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target
        setTaxpayerData((prevData) => ({
            ...prevData, [name] : value
        }))
    }

    useEffect(() => {
      const checkFormComplete = () => {
        const isComplete = Object.values(taxpayerData).every(value => value.trim() !== "");
            setIsFormComplete(isComplete)
        }   

        checkFormComplete()
    }, [taxpayerData]);

    const {stationID,consultantID,stateID,lgaID,arithOrder} = taxpayerData;

    useEffect(() => {
        const getTaxpayerID = async() => {
            try {
                const response = await axios.get(`http://assettrack.com.ng/api/Generator/NewTaxPayerId/${stationID},${consultantID},${stateID},${lgaID},${arithOrder}`)
                setTaxpayerId(response.data)
            } catch (error) {
                console.error("Error getting tax payer ID")
            }
        }

        if (isFormComplete) {
            getTaxpayerID()
        }
        
    },[isFormComplete])
    

    return ( 
        <div className="font-montserrat flex flex-col items-center">
             <div className="flex flex-col text-center mt-16 mb-8">
                 <h2 className="font-bold text-3xl">Tax Payer Registration</h2>
                 <p className="font-normal text-2xl">Confirm all required information for registration</p>
             </div>
             <div className="w-3/5">
                 <form className="flex flex-col items-center">
                    <div className="w-full flex flex-col pb-5">
                        <label>
                            Station ID
                        </label>
                        <input 
                         type="text"
                         name="stationID" 
                         value={stationID}
                         onChange={handleChange}
                         placeholder="Enter Station ID"
                         className="border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded"/>
                    </div>
                    <div className="w-full flex flex-col pb-5">
                        <label>
                            Consultant ID
                        </label>
                        <input 
                         type="text"
                         name="consultantID"
                         value={consultantID}
                         onChange={handleChange}
                         placeholder="Enter Consultant ID"
                         className="border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded"/>
                    </div>
                    <div className="w-full flex flex-col pb-5">
                        <label>
                            State ID
                        </label>
                        <input 
                         type="text"
                         name="stateID"
                         value={stateID}
                         onChange={handleChange}
                         placeholder="Enter State ID"
                         className="border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-400 rounded"/>
                    </div>
                    <div className="w-full flex flex-col pb-5">
                        <label>
                            LGA ID 
                        </label>
                        <input 
                        type="text"
                        name="lgaID"
                        value={lgaID}
                        onChange={handleChange}
                        placeholder="Enter Local Government ID"
                        className="border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-400 rounded"/>
                    </div>
                    <div className="w-full flex flex-col pb-5">
                        <label>
                            Arith Order
                        </label>
                        <input 
                        type="text"
                        name="arithOrder"
                        value={arithOrder}
                        onChange={handleChange}
                        placeholder="Enter Arith Order"
                        className="border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-400 rounded"/>
                    </div>
                    <div className="w-full flex flex-col  pb-10">
                        <label>
                            Tax Payer ID
                        </label>
                        <p className="border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-400 rounded">
                            {taxpayerId ? taxpayerId : "0000000"}
                        </p>
                    </div>
                     <div className="w-full pb-5 flex gap-12">
                         <button className="bg-[#CED8F2] w-full py-3 text-tax-blue rounded-md text-2xl" onClick={prevStep}>
                             Back
                         </button>
                         <button className="bg-tax-blue w-full py-3 text-white rounded-md text-2xl" onClick={nextStep}>
                             Next
                         </button>
                     </div>
                 </form>
             </div>
         </div>
     );
}
 
export default TaxPayerThree;