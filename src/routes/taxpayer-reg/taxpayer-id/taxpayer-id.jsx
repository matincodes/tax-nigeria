import NINProfile from '../../../assets/img/nin-profile.svg'
import InternationalID from '../../../assets/img/international-id.svg'
import NonID from '../../../assets/img/Non-id.svg'
import CircleDown from '../../../assets/img/CircleDown.svg'
import CheckCircle from '../../../assets/img/CheckCircle.svg'
import { useEffect, useState } from 'react'

const TaxpayerID = ({ nextStep, setOnboardingData }) => {
  const [taxpayerData, setTaxpayerData] = useState({
    NIN: '',
    identificationNumber: '',
  })
  const [selectedID, setSelectedID] = useState('')
  const handleIDChange = (id, event) => {
    event.stopPropagation()
    setSelectedID(id)
  }

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
        identityTypeName: selectedID,
      }))
      nextStep()
    } else {
      setShowError(true)
    }
  }

  useEffect(() => {
    const checkFormComplete = () => {
      const isComplete =
        selectedID === 'Non' ||
        Object.values(taxpayerData).some(value => value.trim() !== '')
      setIsFormComplete(isComplete)
    }

    checkFormComplete()
  }, [selectedID, taxpayerData])

  // destructure taxpayerData
  const { NIN, identificationNumber } = taxpayerData

  return (
    <div className='font-montserrat flex flex-col justify-center items-center mb-9'>
      <div className='flex flex-col text-center mt-16 mb-8'>
        <h2 className='font-bold text-3xl'>Tax Payer Registration</h2>
        <p className='font-normal text-2xl'>
          Select means of identification for Taxpayer
        </p>
      </div>
      <div className='flex flex-col gap-5'>
        <div
          className={`bg-zinc-100 w-[600px] ${
            selectedID === 'NIN' ? 'border-2 border-tax-blue' : ''
          }`}
        >
          <div
            className='flex justify-between p-4'
            onClick={event => handleIDChange('NIN', event)}
          >
            <div className='flex'>
              <img src={NINProfile} alt='NIN' />
              <div className='flex flex-col justify-center pl-3'>
                <h3 className='text-2xl font-medium'>Register with NIN</h3>
                <p
                  className={`text-lg ${
                    selectedID === 'NIN' ? 'hidden' : 'block'
                  }`}
                >
                  Register with NIN requires identity from NIN Number
                </p>
              </div>
            </div>
            <img
              src={CircleDown}
              alt=''
              className={`${selectedID === 'NIN' ? 'block' : 'hidden'}`}
            />
          </div>
          <div
            className={`flex flex-col px-5 pb-5 ${
              selectedID === 'NIN' ? 'block' : 'hidden'
            }`}
          >
            <label>Input NIN Number</label>
            <input
              type='text'
              name='NIN'
              value={NIN}
              onChange={handleChange}
              className='pt-8 bg-transparent border-black border-b-2 outline-none'
            />
          </div>
        </div>

        <div
          className={`bg-zinc-100 w-[600px] ${
            selectedID === 'Passport' ? 'border-2 border-tax-blue' : ''
          }`}
        >
          <div
            className='flex justify-between p-4'
            onClick={event => handleIDChange('Passport', event)}
          >
            <div className='flex'>
              <img src={InternationalID} alt='Internation ID' />
              <div className='flex flex-col justify-center pl-3'>
                <h3 className='text-2xl font-medium'>
                  Register with International ID
                </h3>
                <p
                  className={`text-lg ${
                    selectedID === 'Passport' ? 'hidden' : 'block'
                  }`}
                >
                  Register with International ID requires identity from
                  International passport ID
                </p>
              </div>
            </div>
            <img
              src={CircleDown}
              alt=''
              className={`${
                selectedID === 'Passport' ? 'block' : 'hidden'
              }`}
            />
          </div>
          <div
            className={`flex flex-col px-5 pb-5 ${
              selectedID === 'Passport' ? 'block' : 'hidden'
            }`}
          >
            <label>Input International ID Number</label>
            <input
              type='text'
              name='identificationNumber'
              value={identificationNumber}
              onChange={handleChange}
              className='pt-8 bg-transparent border-black border-b-2 outline-none'
            />
          </div>
        </div>

        <div
          className={`bg-zinc-100 w-[600px] ${
            selectedID === 'Non' ? 'border-2 border-tax-blue' : ''
          }`}
        >
          <div
            className='flex justify-between p-4'
            onClick={event => handleIDChange('Non', event)}
          >
            <div className='flex'>
              <img src={NonID} alt='NIN' />
              <div className='flex flex-col justify-center pl-3'>
                <h3 className='text-2xl font-medium'>Register without ID</h3>
                <p
                  className={`text-lg ${
                    selectedID === 'Non' ? 'text-base' : ''
                  }`}
                >
                  Register without ID is temporary, ID will be required for
                  future transactions
                </p>
              </div>
            </div>
            <img
              src={CheckCircle}
              alt=''
              className={`${selectedID === 'Non' ? 'block' : 'hidden'}`}
            />
          </div>
        </div>
      </div>
      {showError && (
        <p className='text-red-500 text-sm text-center'>
          Please select an ID Type
        </p>
      )}
      <div className='flex gap-14 my-10 w-[600px]'>
        <button className='bg-[#CED8F2] w-full py-3 text-tax-blue rounded-md text-xl'>
          Back
        </button>
        <button
          className={`bg-tax-blue w-full py-3 text-white rounded-md text-xl ${
            !selectedID ? 'opacity-70' : 'opacity-100'
          }`}
          onClick={handleNextStep}
          disabled={!selectedID}
        >
          Continue
        </button>
      </div>
    </div>
  )
}

export default TaxpayerID
