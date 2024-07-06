import { useState } from "react";

const ConsultantReg = () => {
    
    const [consultantData, setConsultantData] = useState({

    })

    return ( 
        <div className="font-montserrat flex flex-col items-center">
            <div className="flex flex-col text-center mt-16 mb-8">
                <h2 className="font-bold text-3xl">Consultant Registration</h2>
                <p className="font-normal text-2xl">This can be done in less than a minute!</p>
            </div>
            <div className="w-3/5">
                <form className="flex flex-col items-center">
                    <div className="w-full flex flex-col pb-4">
                        <label>
                            Full Name
                        </label>
                        <input 
                         type="text"
                         name="consultantName"
                         placeholder="Consultant Name"
                         className="border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded"/>
                    </div>
                    <div className="w-full flex flex-col pb-4">
                        <label>
                            Email
                        </label>
                        <input 
                         type="email"
                         placeholder="Enter Email Address"
                         className="border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded"  />
                    </div>
                    <div className="w-full flex gap-16 pb-4">
                        <div className="w-full flex flex-col">
                            <label>
                                Phone Number
                            </label>
                            <input 
                            type="tel"
                            placeholder="Enter Phone Number"
                            className="border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded"  />
                        </div>
                        <div className="w-full flex flex-col">
                            <label>
                                Address
                            </label>
                            <input 
                            type="text"
                            placeholder="Enter Company Address"
                            className="border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded"/>
                        </div>
                    </div>
                    <div className="w-full flex gap-16 pb-4">
                        <div className="w-full flex flex-col">
                            <label>
                                CAC Number
                            </label>
                            <input 
                            type="text"
                            placeholder="Enter Company CAC Number"
                            className="border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded"  />
                        </div>
                        <div className="w-full flex flex-col">
                            <label>
                                City
                            </label>
                            <input 
                            type="text"
                            placeholder="Enter City Location"
                            className="border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded"/>
                        </div>
                    </div>
                    <div className="w-full flex flex-col">
                        <label>
                            Created By
                        </label>
                        <input 
                         type="text"
                         placeholder="Enter Name of "
                         className="border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded"/>
                    </div>
                </form>
            </div>
        </div>
     );
}
 
export default ConsultantReg;