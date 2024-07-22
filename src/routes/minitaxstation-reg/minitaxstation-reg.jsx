import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import fetchWithRetry from '../../lib/fetchData'

const MiniTaxStationReg = () => {
  const [formData, setFormData] = useState({
    id: 0,
    name: '',
    address: '',
    miniTaxStationCode: '',
    taxStationId: '',
  })
  const [disabled, setDisabled] = useState(true)
  const [failed, setFailed] = useState(false)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [taxStations, setTaxStations] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchStateData = async () => {
      try {
        const data = await fetchWithRetry(
          'https://assettrack.com.ng/api/TaxStation',
        )
        setTaxStations(data)
      } catch (error) {
        console.error('Error fetching state data', error)
      }
    }

    fetchStateData()
  }, [])

  useEffect(() => {
    const { name, address, miniTaxStationCode, taxStationId } = formData
    setDisabled(!(name && address && miniTaxStationCode && taxStationId))
  }, [formData])

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      await fetchWithRetry({
        method: 'POST',
        data: formData,
        url: 'https://assettrack.com.ng/api/MiniTaxStation',
      })
      setFailed(false)
      
      navigate(-1)
    } catch (error) {
      setFailed(true)
      console.error('Error creating Tax Station', error)
    } finally {
      setLoading(false)
    }
  }

  const { name, address, miniTaxStationCode, taxStationId } = formData

  return (
    <div className='font-montserrat flex flex-col items-center'>
      <div className='flex flex-col text-center mt-6 mb-8'>
        <h2 className='font-bold text-3xl'>Mini Tax Station Registration</h2>
        <p className='font-normal text-2xl'>
          This can be done in less than a minute!
        </p>
      </div>
      <div className='w-3/5'>
        <form className='flex flex-col items-center'>
          <div className='w-full flex flex-col pb-5'>
            <label>Mini Station Name</label>
            <input
              type='text'
              name='name'
              value={name}
              onChange={handleChange}
              placeholder="Enter Mini Station's Name"
              className='border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded'
            />
          </div>
          <div className='w-full flex flex-col pb-5'>
            <label>Address</label>
            <input
              type='text'
              name='address'
              value={address}
              onChange={handleChange}
              placeholder='Enter Address'
              className='border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-400 rounded'
            />
          </div>
          <div className='w-full flex flex-col pb-5'>
            <label>Mini Tax Station Code</label>
            <input
              type='text'
              name='miniTaxStationCode'
              value={miniTaxStationCode}
              onChange={handleChange}
              placeholder='Enter Tax Station Code'
              className='border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-400 rounded'
            />
          </div>
          <div className='w-full flex gap-16 pb-5'>
            <div className='w-full flex flex-col'>
              <label>Tax Station</label>
              <select
                name='taxStationId'
                value={taxStationId}
                onChange={handleChange}
                className='border-2 border-tax-blue py-4 px-5 outline-none rounded text-gray-400 bg-white'
                disabled={!taxStations}
              >
                <option value='' key='select'>
                  Select Tax Station
                </option>
                {taxStations?.map(({ id, name }) => (
                  <option className='text-black' value={id} key={id}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className='w-full pb-5 flex flex-col'>
            {failed && (
              <p className='text-red-500 text-center'>
                Error: Failed to create Mini Tax Station
              </p>
            )}

            <button
              className={`bg-tax-blue w-full py-3 text-white rounded-md text-2xl ${
                disabled || loading
                  ? 'opacity-70 cursor-not-allowed'
                  : 'opacity-100 cursor-pointer'
              }`}
              disabled={disabled || loading}
              onClick={handleSubmit}
            >
              {loading ? 'Submitting...' : 'Confirm'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default MiniTaxStationReg
