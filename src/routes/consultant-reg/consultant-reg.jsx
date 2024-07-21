import { useEffect, useState } from 'react'
import useFetchWithRetry from '../../hooks/useFetchWithRetry'
import { useNavigate } from 'react-router-dom'

const handleSubmit =
  (
    firstName,
    lastName,
    email,
    phoneNumber,
    address,
    cacNumber,
    taxStation,
    setFailed,
    navigate,
  ) =>
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
          firstName,
          lastName,
          email,
          phoneNumber,
          address,
          cacNumber,
          taxStation,
        },
      })
      setFailed(false)

      navigate('/dashboard')
    } catch (error) {
      setFailed(true)
      console.error('Error creating Tax Station')
    }
  }

const ConsultantReg = () => {
  const [failed, setFailed] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [address, setAddress] = useState('')
  const [taxStationCode, setTaxStationCode] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [lastName, setLastName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [cacNumber, setCacNumber] = useState('')
  const [taxStation, setTaxStation] = useState('')
  const taxStations = useFetchWithRetry(
    'https://assettrack.com.ng/api/TaxStation',
  )

    const navigate = useNavigate()
    
    useEffect(() => {
        if (firstName && lastName && email && phoneNumber && address && cacNumber && taxStation) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [firstName, lastName, email, phoneNumber, address, cacNumber, taxStation])
    

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
                onChange={e => setFirstName(e.target.value)}
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
                onChange={e => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className='w-full flex flex-col pb-4'>
            <label>Email</label>
            <input
              type='email'
              placeholder='Enter Contact Email Address'
              className='border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className='w-full flex gap-16 pb-4'>
            <div className='w-full flex flex-col'>
              <label>Phone Number</label>
              <input
                type='tel'
                placeholder='Enter Contact Phone Number'
                className='border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded'
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className='w-full flex flex-col'>
              <label>Address</label>
              <input
                type='text'
                placeholder='Enter Company Address'
                className='border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded'
                value={address}
                onChange={e => setAddress(e.target.value)}
              />
            </div>
          </div>
          <div className='w-full flex gap-16 pb-4'>
            <div className='w-full flex flex-col'>
              <label>CAC Number</label>
              <input
                type='text'
                placeholder='Enter Company CAC Number'
                className='border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded'
                value={cacNumber}
                onChange={e => setCacNumber(e.target.value)}
              />
            </div>
            <div className='w-full flex flex-col'>
              <label>Tax Stations</label>
              <select
                name='TaxStations'
                value={taxStation}
                onChange={e => setTaxStation(e.target.value)}
                className='border-2 border-tax-blue py-4 px-5 outline-none rounded text-gray-400 bg-white'
              >
                <option value='' key='select'>
                  Select Tax Station
                </option>
                {taxStations?.map(({ name, lgaID }) => (
                  <option value={lgaID} key={lgaID}>
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
              className={`bg-tax-blue w-full py-3 text-white rounded-md text-2xl ${
                disabled ? 'opacity-70' : 'opacity-100 cursor-pointer'
              }`}
              disabled={disabled}
              onClick={handleSubmit(
                firstName,
                lastName,
                email,
                phoneNumber,
                address,
                cacNumber,
                taxStation,
                setFailed,
                navigate,
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

export default ConsultantReg
