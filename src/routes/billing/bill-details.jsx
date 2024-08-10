import axios from 'axios'
import { useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const NGN = new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN',
})

const BillDetails = () => {
  const location = useLocation()
  const billData = location.state?.data
  const navigate = useNavigate()
  const { user } = useAuth()

  const [walletDetails, setWalletDetails] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    async function fetchWalletDetails() {
      const response = await axios.get(
        `https://assettrack.com.ng/api/Wallet/AgentWalletBalance/${user.email}`,
      )
      const wallet = response.data
      setWalletDetails(wallet)
    }
    fetchWalletDetails()
  }, [user.email])

  const handlePayment = async e => {
    e.preventDefault()
    setError('')
    try {
      setLoading(true)
      if (billData.billAmount > walletDetails?.balance)
        return setError(
          'Insufficient balance. Please fund your wallet to make payment',
        )
      await axios.post('https://assettrack.com.ng/api/transactions', {
        id: 0,
        amount: billData.billAmount,
        bill: billData.billReferenceNo,
        date: billData.billDate,
        walletId: walletDetails?.id,
        wallet: null,
      })
      setSuccess('Payment successful')
      // navigate('/dashboard/billing')
    } catch (error) {
      console.error(error)
      setError('An error occurred. Please try again later')
    } finally {
      setLoading(false)
    }
  }

  if (!billData) return <Navigate to='/dashboard/billing' />

  return (
    <div className='font-montserrat flex flex-col items-center'>
      <div className='flex w-full text-center items-center justify-end place-content-end mt-4 mr-8 pr-8'>
        <h2 className='font-semibold text-2xl'>Wallet Balance:</h2>
        <p className='text-xl ml-3'>
          {walletDetails ? NGN.format(walletDetails.balance) : 'loading...'}
        </p>
      </div>

      <div className='flex flex-col text-center mt-10 mb-8'>
        <h2 className='font-bold text-3xl'>Bill Details</h2>
      </div>
      <div className='w-3/5'>
        <form className='flex flex-col items-center'>
          <div className='w-full flex gap-16 pb-5'>
            <div className='w-full flex flex-col'>
              <label>Taxpayer ID</label>
              <input
                type='text'
                name='taxpayerId'
                value={billData?.taxPayer_Id}
                placeholder='Taxpayer ID'
                readOnly
                className='border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded'
              />
            </div>
            <div className='w-full flex flex-col pb-5'>
              <label>Bill Reference No</label>
              <input
                type='text'
                name='amount'
                value={billData?.billReferenceNo}
                placeholder='Bill Reference No'
                readOnly
                className='border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded'
              />
            </div>
          </div>
          <div className='w-full flex gap-16 pb-5'>
            <div className='w-full flex flex-col pb-5'>
              <label>Bill Amount</label>
              <input
                type='text'
                name='income'
                value={NGN.format(billData?.billAmount)}
                placeholder='Bill Amount'
                readOnly
                className='border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded'
              />
            </div>
            <div className='w-full flex flex-col pb-5'>
              <label>Bill Status</label>
              <input
                type='text'
                name='assets'
                value={billData?.billStatus}
                placeholder='Bill Status'
                readOnly
                className='border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded'
              />
            </div>
          </div>
          <div className='w-full flex gap-16 pb-5'>
            <div className='w-full flex flex-col'>
              <label className='text-gray-600'>First Name</label>
              <input
                type='text'
                value={billData?.txPayFName}
                placeholder='First Name'
                readOnly
                className='border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded'
              />
            </div>
            <div className='w-full flex flex-col'>
              <label className='text-gray-600'>Last Name</label>
              <input
                type='text'
                value={billData?.txPayLName}
                placeholder='Last Name'
                readOnly
                className='border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded'
              />
            </div>
          </div>
          <div className='w-full flex gap-16 pb-5'>
            <div className='w-full flex flex-col pb-5'>
              <label className='text-gray-600'>Assessment Reference No</label>
              <input
                type='text'
                value={billData?.assessmentRef}
                placeholder='Assessment Reference No'
                readOnly
                className='border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded'
              />
            </div>
            <div className='w-full flex flex-col pb-5'>
              <label className='text-gray-600'>Date</label>
              <input
                type='text'
                value={new Date(billData?.billDate).toLocaleDateString()}
                placeholder='Date'
                readOnly
                className='border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-400 rounded'
              />
            </div>
          </div>
          <div className='w-full flex gap-16 pb-5'>
            <div className='w-full flex flex-col pb-5'>
              <label className='text-gray-600'>Total Amount Paid</label>
              <input
                type='text'
                value={NGN.format(billData?.totalAmountPaid)}
                placeholder='Total Amount Paid'
                readOnly
                className='border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded'
              />
            </div>
          </div>
          {error && <p className='text-red-500'>{error}</p>}
          {success && <p className='text-green-500'>{success}</p>}
          <div className='w-full pb-5 flex gap-12'>
            <button
              className='bg-tax-blue w-full py-3 text-white rounded-md text-2xl'
              onClick={handlePayment}
              disabled={loading || success}
            >
              {loading ? 'Processing...' : 'Pay'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default BillDetails
