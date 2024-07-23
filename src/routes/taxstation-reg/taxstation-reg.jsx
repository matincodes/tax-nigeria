import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import useFetchWithRetry from '../../hooks/useFetchWithRetry'

const handleSubmit =
  (stationName, address, taxStationCode, lgaId, navigate, setFailed) =>
  async e => {
    e.preventDefault()
    try {
      // await axios.post('https://assettrack.com.ng/api/TaxStation', {
      //   name: stationName,
      //   address,
      //   taxStationCode,
      //   lgaID: lgaId,
      // })
      useFetchWithRetry('https://assettrack.com.ng/api/TaxStation', {
        method: 'post',
        data: {
          name: stationName,
          address,
          taxStationCode,
          lgaID: lgaId,
        },
      })
      setFailed(false)

      navigate('/dashboard')
    } catch (error) {
      setFailed(true)
      console.error('Error creating Tax Station')
    }
  }

const TaxStationReg = () => {
  const [selectedState, setSelectedState] = useState('')
  const [lgaId, setLgaId] = useState('')
  const [address, setAddress] = useState('')
  const [taxStationCode, setTaxStationCode] = useState('')
  const [stationName, setStationName] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [failed, setFailed] = useState(false)
  const [success, setSuccess] = useState(false)
  const stateData =
    useFetchWithRetry('https://assettrack.com.ng/api/State') || null
  const lgaData = useFetchWithRetry(
    `https://assettrack.com.ng/api/lgas/bystate/${selectedState}`,
    [selectedState],
  ) || []

  const navigate = useNavigate()

  useEffect(() => {
    setFailed(false)
    setDisabled(!(stationName && address && taxStationCode && lgaId))
  }, [stationName, address, taxStationCode, lgaId])

  return (
    <div className='font-montserrat flex flex-col items-center'>
      <div className='flex flex-col text-center mt-6 mb-8'>
        <h2 className='font-bold text-3xl'>Tax Station Registration</h2>
        <p className='font-normal text-2xl'>
          This can be done in less than a minute!
        </p>
      </div>
      <div className='w-3/5'>
        <form className='flex flex-col items-center'>
          <div className='w-full flex flex-col pb-5'>
            <label>Station Name</label>
            <input
              type='text'
              name='stationName'
              value={stationName}
              onChange={e => setStationName(e.target.value)}
              placeholder="Enter Station's Name"
              className='border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded'
            />
          </div>
          <div className='w-full flex flex-col pb-5'>
            <label>Address</label>
            <input
              type='text'
              name='address'
              value={address}
              onChange={e => setAddress(e.target.value)}
              placeholder='Enter Address'
              className='border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-400 rounded'
            />
          </div>
          <div className='w-full flex flex-col pb-5'>
            <label>Tax Station Code</label>
            <input
              type='text'
              name='taxStationCode'
              value={taxStationCode}
              onChange={e => setTaxStationCode(e.target.value)}
              placeholder='Enter Tax Station Code'
              className='border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-400 rounded'
            />
          </div>
          <div className='w-full flex gap-16 pb-5'>
            <div className='w-full flex flex-col'>
              <label>State</label>
              <select
                name='stateId'
                value={selectedState}
                onChange={e => setSelectedState(e.target.value)}
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
            <div className='w-full flex flex-col'>
              <label>LGA</label>
              <select
                name='LgaId'
                value={lgaId}
                onChange={e => setLgaId(e.target.value)}
                disabled={!selectedState}
                className='border-2 border-tax-blue py-4 px-5 outline-none rounded text-gray-400 bg-white'
              >
                <option value='' key='select'>
                  Select LGA
                </option>
                {lgaData?.map(({ lgaId, lgaName }) => (
                  <option value={lgaId} key={lgaId}>
                    {lgaName}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className='w-full pb-5 flex flex-col'>
            {failed && (
              <p className='text-red-500 text-center'>
                Error: Failed to create Tax Station
              </p>
            )}

            <button
              className={`bg-tax-blue w-full py-3 text-white rounded-md text-2xl ${
                disabled ? 'opacity-70' : 'opacity-100 cursor-pointer'
              }`}
              disabled={disabled}
              onClick={handleSubmit(
                stationName,
                address,
                taxStationCode,
                lgaId,
                navigate,
                setFailed,
              )}
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaxStationReg
