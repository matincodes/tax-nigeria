import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import fetchWithRetry from '../../lib/fetchData'
import { useAuth } from '../../context/AuthContext'

const ConsultantReg = () => {
  const { user, accessToken } = useAuth()
  const [consultantData, setConsultantData] = useState({
    firstName: '',
    lastName: '',
    emailAddress: '',
    telephoneNo: '',
    address: '',
    cac: '',
    taxStationId: '',
    companyName: '',
    amountDeposited: '',
    consultantCode: '',
    accessToken,
    sentByUserID: user.email,
    consultantPics: '',
    userpwd: '',
    Kolapo: 'string',
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
      emailAddress,
      telephoneNo,
      address,
      cac,
      taxStationId,
      amountDeposited,
      consultantCode,
      companyName,
      userpwd,
    } = consultantData
    setDisabled(
      !(
        firstName &&
        lastName &&
        emailAddress &&
        telephoneNo &&
        address &&
        cac &&
        taxStationId &&
        amountDeposited &&
        consultantCode &&
        companyName &&
        userpwd
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
      await fetchWithRetry({
        method: 'POST',
        url: 'https://assettrack.com.ng/api/Consultant/ConsultantWithCredent',
        data: consultantData,
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

  const {
    firstName,
    lastName,
    emailAddress,
    telephoneNo,
    address,
    cac,
    taxStationId,
    companyName,
    amountDeposited,
    consultantCode,
    userpwd,
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
          <div className='w-full flex gap-16 pb-5'>
            <div className='w-full flex flex-col'>
              <label>Password</label>
              <input
                type='text'
                placeholder='Create Temporary Password'
                name='userpwd'
                value={userpwd}
                onChange={handleChange}
                className='border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded'
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
              name='emailAddress'
              placeholder='Enter Company Email Address'
              className='border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded'
              value={emailAddress}
              onChange={handleChange}
            />
          </div>
          <div className='w-full flex gap-16 pb-4'>
            <div className='w-full flex flex-col'>
              <label>Phone Number</label>
              <input
                type='tel'
                name='telephoneNo'
                placeholder='Enter Company Phone Number'
                className='border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded'
                value={telephoneNo}
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
                name='cac'
                placeholder='Enter Company CAC Number'
                className='border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded'
                value={cac}
                onChange={handleChange}
              />
            </div>
            <div className='w-full flex flex-col'>
              <label>Tax Stations</label>
              <select
                name='taxStationId'
                value={taxStationId}
                onChange={handleChange}
                className='border-2 border-tax-blue py-4 px-5 outline-none rounded text-gray-400 bg-white'
              >
                <option value='' key='select'>
                  Select Tax Station
                </option>
                {taxStations?.map(({ name, id }) => (
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
