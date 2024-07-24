import { useState, useEffect } from 'react'
import axios from 'axios'

const TaxPayerThree = ({ nextStep, prevStep, setOnboardingData }) => {
  const user = JSON.parse(localStorage.getItem('user'))
  const [taxpayerData, setTaxpayerData] = useState({
    miniStationId: '',
    stateID: '',
    localGovernmentId: '',
    taxId: '',
  })

  const [isFormComplete, setIsFormComplete] = useState(false)
  const [showError, setShowError] = useState(false)
  const [miniTaxStations, setMiniTaxStations] = useState(null)
  const [stateData, setStateData] = useState(null)
  const [lgaData, setLgaData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Promise.all([
          axios('https://assettrack.com.ng/api/MiniTaxStation'),
          axios('https://assettrack.com.ng/api/State'),
        ])
        setMiniTaxStations(data[0].data)
        setStateData(data[1].data)
      } catch (error) {
        console.error('Error fetching data', error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const fetchLgaData = async () => {
      try {
        let response
        if (taxpayerData.stateID)
          response = await axios.get(
            `https://assettrack.com.ng/api/lgas/bystate/${taxpayerData.stateID}`,
          )
        setLgaData(response?.data)
      } catch (error) {
        console.error('Error fetching LGA Data', error)
      }
    }

    fetchLgaData()
  }, [taxpayerData.stateID])

  const handleChange = e => {
    const { name, value } = e.target
    setTaxpayerData(prevData => ({
      ...prevData,
      [name]: value,
    }))
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

  const handleNextStep = (e) => {
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

  const { miniStationId, stateID, localGovernmentId, taxId } = taxpayerData

  useEffect(() => {
    const getTaxpayerID = async () => {
      try {
        const response = await axios.get(
          `https://assettrack.com.ng/api/Generator/NewTaxPayerId/${miniStationId},${
            user.email
          },${stateID},${localGovernmentId},${Math.floor(Math.random() * 5 + 1)}`,
        )
        setTaxpayerData(prevData => ({
          ...prevData,
          taxId: response.data?.taxId,
        }))
      } catch (error) {
        console.error('Error getting tax payer ID')
      }
    }

    if ((miniStationId && stateID && localGovernmentId && user.email)) {
      getTaxpayerID()
    }
  }, [miniStationId, stateID, localGovernmentId, user.email])

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
            <div className='w-full flex flex-col bg-white'>
              <label>Mini Tax Station</label>
              <select
                name='miniStationId'
                value={miniStationId}
                onChange={handleChange}
                className='border-2 border-tax-blue py-4 px-5 outline-none rounded text-gray-400 bg-white'
                disabled={!miniTaxStations}
              >
                <option value='' key='select'>
                  Select Mini Tax Station
                </option>
                {miniTaxStations?.map(({ name, id }) => (
                  <option className='text-black' value={id} key={id}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className='w-full flex gap-16 pb-5'>
            <div className='w-full flex flex-col'>
              <label>State</label>
              <select
                name='stateID'
                value={stateID}
                onChange={handleChange}
                className='border-2 border-tax-blue py-4 px-5 outline-none rounded text-gray-400 bg-white'
                disabled={!stateData}
              >
                <option value='' key='select'>
                  Select State
                </option>
                {stateData?.map(({ stateId, stateName }) => (
                  <option className='text-black' value={stateId} key={stateId}>
                    {stateName}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className='w-full flex gap-16 pb-5'>
            <div className='w-full flex flex-col'>
              <label>LGA</label>
              <select
                name='localGovernmentId'
                value={localGovernmentId}
                onChange={handleChange}
                disabled={!stateID}
                className='border-2 border-tax-blue py-4 px-5 outline-none rounded text-gray-400 bg-white'
              >
                <option value='' key='select'>
                  Select LGA
                </option>
                {lgaData?.map(({ lgaId, lgaName }) => (
                  <option className='text-black' value={lgaId} key={lgaId}>
                    {lgaName}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className='w-full flex flex-col  pb-10'>
            <label>Tax Payer ID</label>
            <p className='border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-400 rounded'>
              {taxId ? taxId : '0000000'}
            </p>
          </div>
          {showError && (
            <p className='text-red-500 text-sm text-center'>
              Please fill in all fields
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

export default TaxPayerThree
