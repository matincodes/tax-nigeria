const TaxPayerOne = () => {
     return ( 
         <div className="font-montserrat flex flex-col items-center">
             <div className="flex flex-col text-center mt-16 mb-8">
                 <h2 className="font-bold text-3xl">Tax Payer Registration</h2>
                 <p className="font-normal text-2xl">Confirm all required information for registration</p>
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
                                 Address 
                             </label>
                             <input 
                             type="tel" 
                             placeholder="Enter Address"
                             className="border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-400 rounded"/>
                         </div>
                         <div className="w-full flex flex-col pb-10">
                         <label> Gender </label>
                             <select className="border-2 border-tax-blue py-4 px-5 outline-none rounded text-gray-400 bg-white">
                                 <option value="select_gender" key="select">Select</option>
                             </select>
                         </div>
                     </div>
                     <div className="w-full pb-5 flex gap-12">
                         <button className="bg-[#CED8F2] w-full py-3 text-tax-blue rounded-md text-2xl">
                             Back
                         </button>
                         <button className="bg-tax-blue w-full py-3 text-white rounded-md text-2xl">
                             Next
                         </button>
                     </div>
                 </form>
             </div>
         </div>
      );
 }
  
 export default TaxPayerOne;