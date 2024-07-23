import { useEffect, useState } from 'react'

const TaxPayerOne = ({ nextStep, prevStep, setOnboardingData }) => {
  const [taxpayerData, setTaxpayerData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    phoneNumber: '',
    address: '',
    gender: '',
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

  const handleNextStep = (e) => {
    e.preventDefault()
    if (isFormComplete) {
      setOnboardingData(prevData => ({
        ...prevData,
        ...taxpayerData,
        otherName: '',
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
  const { firstName, lastName, email, dob, phoneNumber, address, gender } =
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
              <label>First Name</label>
              <input
                type='text'
                placeholder='Enter First Name'
                name='firstName'
                value={firstName}
                onChange={handleChange}
                className='border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded'
              />
            </div>
            <div className='w-full flex flex-col'>
              <label>Last Name</label>
              <input
                type='text'
                placeholder='Enter Last Name'
                name='lastName'
                value={lastName}
                onChange={handleChange}
                className='border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded'
              />
            </div>
          </div>
          <div className='w-full flex flex-col pb-5'>
            <label>Email</label>
            <input
              type='email'
              placeholder='Enter Last Name'
              name='email'
              value={email}
              onChange={handleChange}
              className='border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded'
            />
          </div>
          <div className='w-full flex gap-16 pb-5'>
            <div className='w-full flex flex-col'>
              <label>Date of Birth</label>
              <input
                type='date'
                name='dob'
                value={dob}
                onChange={handleChange}
                className='border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-400 rounded'
              />
            </div>
            <div className='w-full flex flex-col'>
              <label>Phone Number</label>
              <input
                type='tel'
                placeholder='Enter Phone Number'
                name='phoneNumber'
                value={phoneNumber}
                onChange={handleChange}
                className='border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-400 rounded'
              />
            </div>
          </div>
          <div className='w-full flex gap-16 pb-5'>
            <div className='w-full flex flex-col'>
              <label>Address</label>
              <input
                type='text'
                placeholder='Enter Address'
                name='address'
                value={address}
                onChange={handleChange}
                className='border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-400 rounded'
              />
            </div>
            <div className='w-full flex flex-col pb-10'>
              <label> Gender </label>
              <select
                className='border-2 border-tax-blue py-4 px-5 outline-none rounded text-gray-400 bg-white'
                name='gender'
                value={gender}
                onChange={handleChange}
              >
                <option value='' key='select'>
                  Select Gender
                </option>
                {[`Male`, `Female`].map((value, index) => (
                  <option className='text-black' value={value} key={index}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {showError && (
            <p className='text-red-500 text-sm text-center'>
              Please fill all fields
            </p>
          )}
          <div className='w-full pb-5 flex gap-12'>
            <button
              className='bg-[#CED8F2] w-full py-3 text-tax-blue rounded-md text-2xl'
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

export default TaxPayerOne
