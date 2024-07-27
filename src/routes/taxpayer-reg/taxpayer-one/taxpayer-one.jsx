import { useEffect, useReducer } from 'react'

const initialState = {
  taxpayerData: {
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    phoneNumber: '',
    address: '',
    gender: '',
  },
  isFormComplete: false,
  showError: false,
  errorMessages: [],
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        taxpayerData: {
          ...state.taxpayerData,
          [action.field]: action.value,
        },
        showError: false,
        errorMessages: [],
      }
    case 'CHECK_FORM_COMPLETE':
      return {
        ...state,
        isFormComplete: Object.values(state.taxpayerData).every(
          value => value.trim() !== '',
        ),
      }
    case 'SHOW_ERROR':
      return {
        ...state,
        showError: true,
        errorMessages: action.errorMessages,
      }
    case 'HIDE_ERROR':
      return {
        ...state,
        showError: false,
        errorMessages: [],
      }
    default:
      return state
  }
}

const validateInput = data => {
  const errors = []

  if (!data.firstName.trim()) errors.push('First Name is required')
  if (!data.lastName.trim()) errors.push('Last Name is required')
  if (!data.email.trim() || !/\S+@\S+\.\S+/.test(data.email))
    errors.push('A valid Email is required')
  if (!data.dob.trim()) errors.push('Date of Birth is required')
  if (!data.phoneNumber.trim() || !/^\d+$/.test(data.phoneNumber))
    errors.push('A valid Phone Number is required')
  if (!data.address.trim()) errors.push('Address is required')
  if (!data.gender.trim()) errors.push('Gender is required')

  return errors
}

const useTaxpayerForm = initialState => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const handleChange = e => {
    const { name, value } = e.target
    dispatch({ type: 'UPDATE_FIELD', field: name, value })
  }

  const handleNextStep = (e, nextStep, setOnboardingData) => {
    e.preventDefault()
    const errors = validateInput(state.taxpayerData)

    if (errors.length === 0 && state.isFormComplete) {
      setOnboardingData(prevData => ({
        ...prevData,
        ...state.taxpayerData,
        otherName: '',
      }))
      nextStep()
    } else {
      dispatch({ type: 'SHOW_ERROR', errorMessages: errors })
    }
  }

  useEffect(() => {
    dispatch({ type: 'CHECK_FORM_COMPLETE' })
  }, [state.taxpayerData])

  return { state, handleChange, handleNextStep }
}

const TaxPayerOne = ({ nextStep, prevStep, setOnboardingData }) => {
  const { state, handleChange, handleNextStep } = useTaxpayerForm(initialState)
  const { taxpayerData, showError, errorMessages } = state

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
              <label htmlFor='firstName'>First Name</label>
              <input
                type='text'
                placeholder='Enter First Name'
                name='firstName'
                id='firstName'
                value={firstName}
                onChange={handleChange}
                className='border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded'
              />
            </div>
            <div className='w-full flex flex-col'>
              <label htmlFor='lastName'>Last Name</label>
              <input
                type='text'
                placeholder='Enter Last Name'
                name='lastName'
                id='lastName'
                value={lastName}
                onChange={handleChange}
                className='border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded'
              />
            </div>
          </div>
          <div className='w-full flex flex-col pb-5'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              placeholder='Enter Email'
              name='email'
              id='email'
              value={email}
              onChange={handleChange}
              className='border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded'
            />
          </div>
          <div className='w-full flex gap-16 pb-5'>
            <div className='w-full flex flex-col'>
              <label htmlFor='dob'>Date of Birth</label>
              <input
                type='date'
                name='dob'
                id='dob'
                value={dob}
                onChange={handleChange}
                className='border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-400 rounded'
              />
            </div>
            <div className='w-full flex flex-col'>
              <label htmlFor='phoneNumber'>Phone Number</label>
              <input
                type='tel'
                placeholder='Enter Phone Number'
                name='phoneNumber'
                id='phoneNumber'
                value={phoneNumber}
                onChange={handleChange}
                className='border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-400 rounded'
              />
            </div>
          </div>
          <div className='w-full flex gap-16 pb-5'>
            <div className='w-full flex flex-col'>
              <label htmlFor='address'>Address</label>
              <input
                type='text'
                placeholder='Enter Address'
                name='address'
                id='address'
                value={address}
                onChange={handleChange}
                className='border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-400 rounded'
              />
            </div>
            <div className='w-full flex flex-col pb-10'>
              <label htmlFor='gender'>Gender</label>
              <select
                className='border-2 border-tax-blue py-4 px-5 outline-none rounded text-gray-400 bg-white'
                name='gender'
                id='gender'
                value={gender}
                onChange={handleChange}
              >
                <option value='' key='select'>
                  Select Gender
                </option>
                {['male', 'female'].map((value, index) => (
                  <option className='text-black capitalize' value={value} key={index}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {showError && (
            <div className='text-red-500 text-sm text-center'>
              {errorMessages.map((msg, index) => (
                <p key={index}>{msg}</p>
              ))}
            </div>
          )}
          <div className='w-full pb-5 flex gap-12'>
            <button
              type='button'
              className='bg-[#CED8F2] w-full py-3 text-tax-blue rounded-md text-2xl'
              onClick={prevStep}
            >
              Back
            </button>
            <button
              type='submit'
              className='bg-tax-blue w-full py-3 text-white rounded-md text-2xl'
              onClick={e => handleNextStep(e, nextStep, setOnboardingData)}
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
