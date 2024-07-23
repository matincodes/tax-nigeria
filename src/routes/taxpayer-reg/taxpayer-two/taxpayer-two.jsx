import { useEffect, useState } from 'react'

const TaxPayerTwo = ({ nextStep, prevStep, setOnboardingData }) => {
  const [taxpayerData, setTaxpayerData] = useState({
    cac: '',
    businessTypeId: '',
    annualTurnover: '',
    associationId: '',
    numberOfShops: '',
    agentId: '',
    // taxAgent: '',
  })

  const [isFormComplete, setIsFormComplete] = useState(false)
  const [showError, setShowError] = useState(false)

  const handleChange = e => {
    const { name, value } = e.target
    setTaxpayerData(prevData => ({
      ...prevData,
      [name]: value,
    }))
    setShowError(false)
  }

  const handleNextStep = e => {
    e.preventDefault()
    if (isFormComplete) {
      setOnboardingData(prevData => ({
        ...prevData,
        ...taxpayerData,
      }))
      nextStep()
    } else {
      setShowError(true)
    }
  }

  useEffect(() => {
    const checkFormComplete = () => {
      const isComplete = Object.values(taxpayerData).every(
        value => value.trim() !== '',
      )
      setIsFormComplete(isComplete)
    }

    checkFormComplete()
  }, [taxpayerData])

  // destructure taxpayerData
  const {
    cac,
    businessTypeId,
    annualTurnover,
    associationId,
    numberOfShops,
    agentId,
    // taxAgent,
  } = taxpayerData

  return (
    <div className='font-montserrat flex flex-col items-center'>
      <div className='flex flex-col text-center mt-16 mb-8'>
        <h2 className='font-bold text-3xl'>Tax Payer Registration</h2>
        <p className='font-normal text-2xl'>
          Confirm all required information for registration
        </p>
      </div>
      <div className='w-3/5'>
        <form className='flex flex-col items-center'>
          <div className='w-full flex gap-16 pb-5'>
            <div className='w-full flex flex-col'>
              <label>CAC Number</label>
              <input
                type='text'
                placeholder='Enter Business Reg No'
                name='cac'
                value={cac}
                onChange={handleChange}
                className='border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded'
              />
            </div>
            {/*  */}
            <div className='w-full flex flex-col pb-5'>
              <label> Business Type </label>
              <select
                className='border-2 border-tax-blue py-4 px-5 outline-none rounded text-gray-400 bg-white'
                name='businessTypeId'
                value={businessTypeId}
                onChange={handleChange}
              >
                <option value='' key='select'>
                  Select Business Type
                </option>
              </select>
            </div>
            {/*  */}
          </div>

          <div className='w-full flex gap-16 pb-5'>
            {/*  */}
            <div className='w-full flex flex-col pb-5'>
              <label> Annual Turnover </label>
              <select
                className='border-2 border-tax-blue py-4 px-5 outline-none rounded text-gray-400 bg-white'
                name='annualTurnover'
                value={annualTurnover}
                onChange={handleChange}
              >
                <option value='' key='select'>
                  Select Annual Turnover
                </option>
              </select>
            </div>
            {/*  */}
            {/*  */}
            <div className='w-full flex flex-col pb-5'>
              <label> Trade Association </label>
              <select
                className='border-2 border-tax-blue py-4 px-5 outline-none rounded text-gray-400 bg-white'
                name='associationId'
                value={associationId}
                onChange={handleChange}
              >
                <option value='' key='select'>
                  Select Trade Association
                </option>
              </select>
            </div>
            {/*  */}
          </div>

          <div className='w-full flex gap-16 pb-0'>
            {/*  */}
            <div className='w-full flex flex-col pb-5'>
              <label> Number of Shops </label>
              <input
                type='text'
                placeholder='Enter Number of Shops'
                name='numberOfShops'
                value={numberOfShops}
                onChange={handleChange}
                className='border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded'
              />
            </div>
            {/*  */}
          </div>

          <div className='w-full flex gap-16 pb-0'>
            {/*  */}
            <div className='w-full flex flex-col pb-5'>
              <label> Tax Agent ID </label>
              <input
                type='text'
                placeholder='Enter Tax Agent ID'
                name='agentId'
                value={agentId ? agentId : '0000000'}
                className='border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded'
              />
            </div>
            {/*  */}
          </div>
          {showError && (
            <p className='text-red-500 text-sm text-center'>
              Please fill all fields
            </p>
          )}
          <div className='w-full pb-5 flex gap-12'>
            <button
              className='text-center bg-[#CED8F2] w-full py-3 text-tax-blue rounded-md text-2xl'
              onClick={prevStep}
            >
              Back
            </button>
            <button
              className='bg-tax-blue w-full py-3 text-white rounded-md text-2xl'
              onClick={handleNextStep}
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaxPayerTwo
