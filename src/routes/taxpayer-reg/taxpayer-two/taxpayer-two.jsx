const TaxPayerTwo = ({nextStep, prevStep}) => {
  return (
    <div className="font-montserrat flex flex-col items-center">
      <div className="flex flex-col text-center mt-16 mb-8">
        <h2 className="font-bold text-3xl">Tax Payer Registration</h2>
        <p className="font-normal text-2xl">
          Confirm all required information for registration
        </p>
      </div>
      <div className="w-3/5">
        <form className="flex flex-col items-center">
          <div className="w-full flex gap-16 pb-5">
            <div className="w-full flex flex-col">
              <label>Business Registration Number (CAC)</label>
              <input
                type="text"
                placeholder="Enter Business Reg No"
                className="border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded"
              />
            </div>
            <div className="w-full flex flex-col">
              <label>Business Type</label>
              <input
                type="text"
                placeholder="Enter Business Type"
                className="border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded"
              />
            </div>
          </div>

          <div className="flex w-full gap-6 pb-5">
            {/*  */}
            <div className="w-full flex flex-col pb-5">
              <label> Business Type </label>
              <select className="border-2 border-tax-blue py-4 px-5 outline-none rounded text-gray-400 bg-white">
                <option value="select_business_type" key="select">
                  Select
                </option>
              </select>
            </div>
            {/*  */}
            {/*  */}
            <div className="w-full flex flex-col pb-5">
              <label> Annual Turnover </label>
              <select className="border-2 border-tax-blue py-4 px-5 outline-none rounded text-gray-400 bg-white">
                <option value="select_annual_turnover" key="select">
                  Select
                </option>
              </select>
            </div>
            {/*  */}
            {/*  */}
            <div className="w-full flex flex-col pb-5">
              <label> Trade Association </label>
              <select className="border-2 border-tax-blue py-4 px-5 outline-none rounded text-gray-400 bg-white">
                <option value="select_trade_association" key="select">
                  Select
                </option>
              </select>
            </div>
            {/*  */}
          </div>

          <div className="w-full flex gap-16 pb-0">
          {/*  */}
            <div className="w-full flex flex-col pb-5">
              <label> Number of Shops </label>
              <select className="border-2 border-tax-blue py-4 px-5 outline-none rounded text-gray-400 bg-white">
                <option value="select_number_of_shops" key="select">
                  Select
                </option>
              </select>
            </div>
          {/*  */}

          {/*  */}
            <div className="w-full flex flex-col pb-10">
              <label> Business Sector </label>
              <select className="border-2 border-tax-blue py-4 px-5 outline-none rounded text-gray-400 bg-white">
                <option value="select_business_sector" key="select">
                  Select 
                </option>
              </select>
            </div>
          {/*  */}
          </div>

          <div className="w-full flex gap-16 pb-0">
          {/*  */}
            <div className="w-full flex flex-col pb-5">
              <label> Tax Agent ID </label>
              <select className="border-2 border-tax-blue py-4 px-5 outline-none rounded text-gray-400 bg-white">
                <option value="select_tax_agent_id" key="select">
                  Select Tax Agent ID
                </option>
              </select>
            </div>
          {/*  */}

          {/*  */}
            <div className="w-full flex flex-col pb-10">
              <label> Tax Agent </label>
              <select className="border-2 border-tax-blue py-4 px-5 outline-none rounded text-gray-400 bg-white">
                <option value="select_tax_agent" key="select">
                  Select Tax Agent
                </option>
              </select>
            </div>
          {/*  */}
          </div>

          <div className="w-full pb-5 flex gap-12">
            <button className="text-center bg-[#CED8F2] w-full py-3 text-tax-blue rounded-md text-2xl" onClick={prevStep}>
              Back
            </button>
            <button className="bg-tax-blue w-full py-3 text-white rounded-md text-2xl" onClick={nextStep}>
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaxPayerTwo;
