import axios from 'axios'
import { useEffect, useReducer } from 'react'

const initialState = {
  taxpayerData: {
    taxpayerId: '',
    amount: '',
    income: '',
    assets: '',
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    phoneNumber: '',
    gender: '',
    picture: '',
  },
  isFormComplete: false,
  showError: false,
  showNotFound: false,
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
    case 'SET_TAXPAYER_DATA':
      return {
        ...state,
        taxpayerData: {
          ...state.taxpayerData,
          ...action.data,
        },
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
    case 'TAX_PAYER_NOT_FOUND':
      return {
        ...state,
        showNotFound: true,
      }
    default:
      return state
  }
}

const validateInput = data => {
  const errors = []
  if (!data.taxpayerId.trim()) errors.push('Taxpayer ID is required')
  if (!data.amount.trim()) errors.push('Amount is required')
  if (!data.income.trim()) errors.push('Income is required')
  if (!data.assets.trim()) errors.push('Assets are required')

  return errors
}

const useTaxAssessmentForm = initialState => {
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
      }))
      nextStep()
    } else {
      dispatch({ type: 'SHOW_ERROR', errorMessages: errors })
    }
  }

  useEffect(() => {
    if (state.taxpayerData.taxpayerId?.trim() !== '') {
      const fetchTaxpayerData = async () => {
        try {
          const response = await axios.get(
            `https://assettrack.com.ng/api/taxpayer/ByTaxPayerID/${state.taxpayerData.taxpayerId}`,
          )

          const data = response.data
          dispatch({
            type: 'SET_TAXPAYER_DATA',
            data: {
              firstName: data.firstName,
              lastName: data.lastname,
              email: data.email,
              address: data.address,
              phoneNumber: data.phoneNumber,
              gender: data.gender,
              picture: data.payerPics,
            },
          })
        } catch (error) {
          const status = error.response ? error.response.status : null
          if (status === 404) {
            dispatch({
              type: 'TAX_PAYER_NOT_FOUND',
            })
            return
          }
          console.error('Error fetching taxpayer data', error)
        }
      }

      fetchTaxpayerData()
    }
  }, [state.taxpayerData.taxpayerId])

  useEffect(() => {
    dispatch({ type: 'CHECK_FORM_COMPLETE' })
  }, [state.taxpayerData])

  return { state, handleChange, handleNextStep }
}

const TaxAssessment = ({ nextStep, prevStep, setOnboardingData }) => {
  const { state, handleChange, handleNextStep } =
    useTaxAssessmentForm(initialState)
  const { taxpayerData, showError, errorMessages, showNotFound } = state

  const {
    taxpayerId,
    amount,
    income,
    assets,
    firstName,
    lastName,
    email,
    address,
    phoneNumber,
    picture,
    gender,
  } = taxpayerData

  return (
    <div className='font-montserrat flex flex-col items-center'>
      <div className='flex flex-col text-center mt-16 mb-8'>
        <h2 className='font-bold text-3xl'>Tax Assessment</h2>
        <p className='font-normal text-2xl'>
          Confirm all required information for tax assessment
        </p>
        <p className='font-normal text-md'>
          *When Taxpayer ID is entered, other related fields will be
          automatically populated
        </p>
      </div>
      <div className='w-3/5'>
        <form className='flex flex-col items-center'>
          <div className='w-full flex gap-16 pb-5'>
            <div className='w-full flex flex-col'>
              <label>Taxpayer ID*</label>
              <input
                type='text'
                placeholder='Enter Taxpayer ID'
                name='taxpayerId'
                value={taxpayerId}
                onChange={handleChange}
                className='border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded'
              />
              {showNotFound && (
                <p className='text-red-500 text-sm text-center'>
                  Taxpayer not found
                </p>
                  )}
            </div>
            <div className='w-full flex flex-col pb-5'>
              <label>Amount</label>
              <input
                type='text'
                placeholder='Enter Amount'
                name='amount'
                value={amount}
                onChange={handleChange}
                className='border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded'
              />
            </div>
          </div>
          <div className='w-full flex gap-16 pb-5'>
            <div className='w-full flex flex-col pb-5'>
              <label>Income</label>
              <input
                type='text'
                placeholder='Enter Income'
                name='income'
                value={income}
                onChange={handleChange}
                className='border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded'
              />
            </div>
            <div className='w-full flex flex-col pb-5'>
              <label>Assets</label>
              <input
                type='text'
                placeholder='Enter Assets'
                name='assets'
                value={assets}
                onChange={handleChange}
                className='border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded'
              />
            </div>
          </div>
          <div className='w-full flex gap-16 pb-5'>
            <div className='w-full flex flex-col'>
              <label className='text-gray-600'>First Name</label>
              <input
                type='text'
                placeholder='John'
                value={firstName}
                readOnly
                className='border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded'
              />
            </div>
            <div className='w-full flex flex-col'>
              <label className='text-gray-600'>Last Name</label>
              <input
                type='text'
                placeholder='Doe'
                value={lastName}
                readOnly
                className='border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded'
              />
            </div>
          </div>
          <div className='w-full flex flex-col pb-5'>
            <label className='text-gray-600'>Picture</label>
            <img
              src={picture || 'https://via.placeholder.com/50'}
              alt='Profile'
              className='rounded-md w-32 h-32 mx-auto'
            />
          </div>
          <div className='w-full flex gap-16 pb-5'>
            <div className='w-full flex flex-col pb-5'>
              <label className='text-gray-600'>Gender</label>
              <input
                type='text'
                placeholder='Male'
                value={gender}
                readOnly
                className='border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded'
              />
            </div>
            <div className='w-full flex flex-col pb-5'>
              <label className='text-gray-600'>Phone Number</label>
              <input
                type='text'
                placeholder='08012345678'
                value={phoneNumber}
                readOnly
                className='border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-400 rounded'
              />
            </div>
          </div>
          <div className='w-full flex gap-16 pb-5'>
            <div className='w-full flex flex-col pb-5'>
              <label className='text-gray-600'>Email</label>
              <input
                type='email'
                placeholder='johndoe@gmail.com'
                value={email}
                readOnly
                className='border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded'
              />
            </div>
            <div className='w-full flex flex-col pb-5'>
              <label className='text-gray-600'>Address</label>
              <input
                type='text'
                placeholder='123, Main Street, Lagos'
                value={address}
                readOnly
                className='border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded'
              />
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
              className='text-center bg-[#CED8F2] w-full py-3 text-tax-blue rounded-md text-2xl'
              onClick={prevStep}
            >
              Back
            </button>
            <button
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

export default TaxAssessment
