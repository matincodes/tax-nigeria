const TaxAgentReg = () => {
    return ( 
        <div className="font-montserrat flex flex-col items-center">
            <div className="flex flex-col text-center mt-16 mb-8">
                <h2 className="font-bold text-3xl">Tax Agent Registration</h2>
                <p className="font-normal text-2xl">This can be done in less than a minute!</p>
            </div>
            <div className="w-3/5">
                <form className="flex flex-col items-center">
                    <div className="w-full flex gap-16 pb-5">
                        <div className="w-full flex flex-col">
                            <label>
                                First Name 
                            </label>
                            <input 
                             type="text" 
                             placeholder="Enter First Name"
                             className="border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded"/>
                        </div>
                        <div className="w-full flex flex-col">
                            <label>
                                Last Name 
                            </label>
                            <input 
                            type="text" 
                            placeholder="Enter Last Name"
                            className="border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded"/>
                        </div>
                    </div>
                    <div className="w-full flex flex-col pb-5">
                        <label>
                            Email
                        </label>
                        <input 
                            type="email" 
                            placeholder="Enter Last Name"
                            className="border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded"/>
                    </div>
                    <div className="w-full flex gap-16 pb-5">
                        <div className="w-full flex flex-col">
                            <label>
                                Date of Birth
                            </label>
                            <input 
                             type="date"
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
                                Tax Agent ID 
                            </label>
                            <p className="border-2 border-tax-blue py-4 px-5 outline-none text-gray-300 rounded">
                                Tax Agent ID
                             </p>
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
                    <div className="w-full flex gap-16">
                        <div className="w-full flex flex-col">
                            <label>
                                Consultant ID
                            </label>
                            <select className="border-2 border-tax-blue py-4 px-5 outline-none rounded text-gray-400 bg-white">
                                <option value="Select Tax Station" key="select">Select Tax Station</option>
                            </select>
                        </div>
                        <div className="w-full flex flex-col pb-10">
                            <label>
                                Consultant Name
                            </label>
                            <select className="border-2 border-tax-blue py-4 px-5 outline-none rounded text-gray-400 bg-white">
                                <option value="Select Tax Station" key="select">Select Tax Station</option>
                            </select>
                        </div>
                    </div>
                    <div className="w-full pb-5">
                        <button className="bg-tax-blue w-full py-3 text-white rounded-md text-2xl">
                            Next
                        </button>
                    </div>
                </form>
            </div>
        </div>
     );
}
 
export default TaxAgentReg;