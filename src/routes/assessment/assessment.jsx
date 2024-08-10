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
  submitting: false,
  showSuccess: false,
  successData: '',
  loadingImage: false,
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
    case 'SET_TAXPAYER_IMAGE':
      return {
        ...state,
        taxpayerData: {
          ...state.taxpayerData,
          ...action.data,
        },
      }
    case 'CLEAR_TAXPAYER_DATA':
      return {
        ...state,
        taxpayerData: {
          ...initialState.taxpayerData,
          taxpayerId: state.taxpayerData.taxpayerId,
        },
      }
    case 'CHECK_FORM_COMPLETE':
      return {
        ...state,
        isFormComplete: Object.values(state.taxpayerData).every(
          value => value?.trim() !== '',
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
        showNotFound: action.showNotFound,
      }
    case 'SET_SUBMITTING':
      return {
        ...state,
        submitting: action.submitting,
      }
    case 'SHOW_SUCCESS':
      return {
        ...state,
        showSuccess: action.showSuccess,
      }
    case 'SET_SUCCESS_DATA':
      return {
        ...state,
        successData: action.data,
      }
    case 'SHOW_LOADING_IMAGE':
      return {
        ...state,
        loadingImage: true,
      }
    case 'HIDE_LOADING_IMAGE':
      return {
        ...state,
        loadingImage: false,
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

  const closePopup = () => {
    dispatch({ type: 'SHOW_SUCCESS', showSuccess: false })
  }

  const handleChange = e => {
    const { name, value } = e.target
    dispatch({ type: 'UPDATE_FIELD', field: name, value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    dispatch({ type: 'SET_SUBMITTING', submitting: true })
    const errors = validateInput(state.taxpayerData)

    if (errors.length === 0 && state.isFormComplete) {
      try {
        const response = await axios.post(
          'https://assettrack.com.ng/api/TaxPayerAssessment/CreateAssess',
          {
            amount: state.taxpayerData.amount,
            taxPayerId: state.taxpayerData.taxpayerId,
            income: state.taxpayerData.income,
            assets: state.taxpayerData.assets,
          },
        )

        dispatch({
          type: 'SET_SUCCESS_DATA',
          data: response.data?.assessmentRef,
        })
        dispatch({ type: 'SHOW_SUCCESS', showSuccess: true })
      } catch (error) {
        console.error('Error creating Tax Assessment', error)
        dispatch({
          type: 'SHOW_ERROR',
          errorMessages: ['Error creating Tax Assessment'],
        })
      } finally {
        dispatch({ type: 'SET_SUBMITTING', submitting: false })
      }
    } else {
      dispatch({ type: 'SHOW_ERROR', errorMessages: errors })
    }
  }

  useEffect(() => {
    let ignore = false
    dispatch({
      type: 'TAX_PAYER_NOT_FOUND',
      showNotFound: false,
    })
    dispatch({
      type: 'CLEAR_TAXPAYER_DATA',
    })
    if (state.taxpayerData.taxpayerId?.trim() !== '') {
      const fetchTaxpayerData = async () => {
        dispatch({ type: 'SHOW_LOADING_IMAGE' })
        axios
          .get(
            `https://assettrack.com.ng/api/TaxPayer/OnlyTaxpayerPics/${state.taxpayerData.taxpayerId}`,
          )
          .then(response => {
            const data = response.data
            if (ignore) return
            dispatch({
              type: 'SET_TAXPAYER_IMAGE',
              data: {
                picture: data.taxpayerPics,
              },
            })
          })
          .catch(error => {
            console.error('Error fetching taxpayer image', error)
          })
          .finally(() => {
            dispatch({ type: 'HIDE_LOADING_IMAGE' })
          })
        try {
          const response = await axios.get(
            `https://assettrack.com.ng/api/taxpayer/ByTaxPayerID/${state.taxpayerData.taxpayerId}`,
          )

          const data = response.data
          if (ignore) return
          dispatch({
            type: 'SET_TAXPAYER_DATA',
            data: {
              firstName: data.firstName,
              lastName: data.lastname,
              email: data.email,
              address: data.address,
              phoneNumber: data.phoneNumber,
              gender: data.gender,
            },
          })
          dispatch({
            type: 'TAX_PAYER_NOT_FOUND',
            showNotFound: false,
          })
        } catch (error) {
          const status = error.response ? error.response.status : null
          if (status === 404 && !ignore) {
            dispatch({
              type: 'TAX_PAYER_NOT_FOUND',
              showNotFound: true,
            })
            return
          }
          console.error('Error fetching taxpayer data', error)
        }
      }

      fetchTaxpayerData()

      return () => {
        ignore = true
      }
    }
  }, [state.taxpayerData.taxpayerId])

  useEffect(() => {
    dispatch({ type: 'CHECK_FORM_COMPLETE' })
  }, [state.taxpayerData])

  return { state, handleChange, handleSubmit, closePopup }
}

const SuccessPopup = ({ messages, onClose }) => (
  <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50'>
    <div className='bg-tax-gray p-6 rounded shadow-lg text-center font-montserrat'>
      <h2 className='text-green-500 text-2xl mb-4'>Success!</h2>
      {messages.map((message, index) => (
        <p className='mb-4' key={index}>{message}</p>
      ))}
      <button
        onClick={onClose}
        className='bg-tax-blue py-2 px-4 text-white rounded'
      >
        Close
      </button>
    </div>
  </div>
)

const TaxAssessment = () => {
  const { state, handleChange, handleSubmit, closePopup } =
    useTaxAssessmentForm(initialState)
  const {
    taxpayerData,
    showError,
    errorMessages,
    showNotFound,
    submitting,
    showSuccess,
    successData,
    loadingImage,
  } = state

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
            <div className='rounded-md w-32 h-32 mx-auto relative'>
              <img
                src={picture || 'https://via.placeholder.com/50'}
                alt='Profile'
                className='w-full h-full object-cover rounded-md z-0'
              />
              {loadingImage && (
                <p className='absolute top-0 left-0 p-2 bg-opacity-60 bg-gray-600 z-10 w-full h-full'>
                  Loading...
                </p>
              )}
            </div>
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
          {showSuccess && (
            <SuccessPopup
              messages={[
                'Tax Assessment created successfully',
                `Assessment Reference: ${successData}`,
              ]}
              onClose={closePopup}
            />
          )}
          {showError && (
            <div className='text-red-500 text-sm text-center'>
              {errorMessages.slice(0, 2).map((msg, index) => (
                <p key={index}>{msg}</p>
              ))}
            </div>
          )}
          <div className='w-full pb-5 flex gap-12'>
            <button
              className='bg-tax-blue w-full py-3 text-white rounded-md text-2xl'
              onClick={handleSubmit}
              disabled={submitting || showSuccess || showNotFound}
            >
              {submitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaxAssessment
