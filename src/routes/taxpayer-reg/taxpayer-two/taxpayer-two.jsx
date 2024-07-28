import axios from 'axios'
import { useEffect, useState } from 'react'
import { useAuth } from '../../../context/AuthContext'

const TaxPayerTwo = ({ nextStep, prevStep, setOnboardingData }) => {
    const { user } = useAuth()

  // const user = JSON.parse(localStorage.getItem('user'))
  const [taxpayerData, setTaxpayerData] = useState({
    cac: '',
    businessTypeId: '',
    annualTurnover: '',
    associationId: '',
    numberOfShops: '',
  })

  const [associations, setAssociations] = useState(null)
  const [businessTypes, setBusinessTypes] = useState(null)

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
        agentUserId: user.email,
        agentId: 0,
      }))
      nextStep()
    } else {
      setShowError(true)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Promise.all([
          axios('https://assettrack.com.ng/api/associations'),
          axios(
            'https://assettrack.com.ng/api/businessTypes/BusinessTypesOnly',
          ),
        ])
        setAssociations(data[0].data)
        setBusinessTypes(data[1].data)
      } catch (error) {
        console.error('Error fetching data', error)
      }
    }

    fetchData()
  }, [])

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
  const { cac, businessTypeId, annualTurnover, associationId, numberOfShops } =
    taxpayerData

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
                {businessTypes?.map(({ id, name }) => (
                  <option className='text-black' value={id} key={id}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            {/*  */}
          </div>

          <div className='w-full flex gap-16 pb-5'>
            {/*  */}
            <div className='w-full flex flex-col pb-5'>
              <label> Annual Turnover </label>
              <input
                className='border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded'
                type='text'
                placeholder='Enter Annual Turnover'
                name='annualTurnover'
                value={annualTurnover}
                onChange={handleChange}
              />
            </div>
            {/*  */}
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
                {associations?.map(({ id, name }) => (
                  <option className='text-black' value={id} key={id}>
                    {name}
                  </option>
                ))}
              </select>
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
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaxPayerTwo
