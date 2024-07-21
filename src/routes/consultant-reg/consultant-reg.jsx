import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import fetchWithRetry from '../../lib/fetchData'
import { useAuth } from '../../context/AuthContext'

const ConsultantReg = () => {
  const { user, accessToken } = useAuth()
  const [consultantData, setConsultantData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    cacNumber: '',
    taxStation: '',
    companyName: '',
    amountDeposited: '',
    consultantCode: '',
    accessToken,
    sentByUserID: user.email,
  })
  const [failed, setFailed] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [loading, setLoading] = useState(false)
  const [taxStations, setTaxStations] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    const fetchTaxStations = async () => {
      try {
        const stations = await fetchWithRetry(
          'https://assettrack.com.ng/api/TaxStation',
        )
        setTaxStations(stations)
      } catch (error) {
        console.error('Error fetching tax stations', error)
      }
    }

    fetchTaxStations()
  }, [])

  useEffect(() => {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      cacNumber,
      taxStation,
      amountDeposited,
      consultantCode,
    } = consultantData
    setDisabled(
      !(
        firstName &&
        lastName &&
        email &&
        phoneNumber &&
        address &&
        cacNumber &&
        taxStation &&
        amountDeposited &&
        consultantCode
      ),
    )
    setFailed(false)
  }, [consultantData])

  const handleChange = e => {
    const { name, value } = e.target
    setConsultantData(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      await fetchWithRetry(
        'https://assettrack.com.ng//api/Consultant/ConsultantWithCredent',
        {
          method: 'POST',
          data: consultantData,
        },
      )
      setFailed(false)
      navigate('/dashboard')
    } catch (error) {
      setFailed(true)
      console.error('Error creating Tax Station', error)
    } finally {
      setLoading(false)
    }
  }

  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    address,
    cacNumber,
    taxStation,
    companyName,
    amountDeposited,
    consultantCode,
  } = consultantData

  return (
    <div className='font-montserrat flex flex-col items-center'>
      <div className='flex flex-col text-center mt-16 mb-8'>
        <h2 className='font-bold text-3xl'>Consultant Registration</h2>
        <p className='font-normal text-2xl'>
          This can be done in less than a minute!
        </p>
      </div>
      <div className='w-3/5'>
        <form className='flex flex-col items-center'>
          <div className='w-full flex gap-16 pb-4'>
            <div className='flex flex-col w-full'>
              <label>First Name</label>
              <input
                type='text'
                name='firstName'
                placeholder='First Name'
                className='border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded'
                value={firstName}
                onChange={handleChange}
              />
            </div>
            <div className='flex flex-col w-full'>
              <label>Last Name</label>
              <input
                type='text'
                name='lastName'
                placeholder='Last Name'
                className='border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded'
                value={lastName}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='w-full flex flex-col pb-4'>
            <label>Company Name</label>
            <input
              type='text'
              name='companyName'
              placeholder='Enter Company Name'
              className='border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded'
              value={companyName}
              onChange={handleChange}
            />
          </div>
          <div className='w-full flex flex-col pb-4'>
            <label>Email</label>
            <input
              type='email'
              name='email'
              placeholder='Enter Company Email Address'
              className='border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded'
              value={email}
              onChange={handleChange}
            />
          </div>
          <div className='w-full flex gap-16 pb-4'>
            <div className='w-full flex flex-col'>
              <label>Phone Number</label>
              <input
                type='tel'
                name='phoneNumber'
                placeholder='Enter Company Phone Number'
                className='border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded'
                value={phoneNumber}
                onChange={handleChange}
              />
            </div>
            <div className='w-full flex flex-col'>
              <label>Address</label>
              <input
                type='text'
                name='address'
                placeholder='Enter Company Address'
                className='border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded'
                value={address}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='w-full flex gap-16 pb-4'>
            <div className='w-full flex flex-col'>
              <label>Amount Deposited</label>
              <input
                type='text'
                name='amountDeposited'
                placeholder='Enter Amount Deposited'
                className='border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded'
                value={amountDeposited}
                onChange={handleChange}
              />
            </div>
            <div className='w-full flex flex-col'>
              <label>Consultant Code</label>
              <input
                type='text'
                name='consultantCode'
                placeholder='Enter Consultant Code'
                className='border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded'
                value={consultantCode}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='w-full flex gap-16 pb-4'>
            <div className='w-full flex flex-col'>
              <label>CAC Number</label>
              <input
                type='text'
                name='cacNumber'
                placeholder='Enter Company CAC Number'
                className='border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded'
                value={cacNumber}
                onChange={handleChange}
              />
            </div>
            <div className='w-full flex flex-col'>
              <label>Tax Stations</label>
              <select
                name='taxStation'
                value={taxStation}
                onChange={handleChange}
                className='border-2 border-tax-blue py-4 px-5 outline-none rounded text-gray-400 bg-white'
              >
                <option value='' key='select'>
                  Select Tax Station
                </option>
                {taxStations?.map(({ name, id }) => (
                  <option value={id} key={id}>
                    {name}
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
              type='submit'
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

export default ConsultantReg
