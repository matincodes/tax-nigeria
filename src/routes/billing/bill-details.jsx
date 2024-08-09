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

  useEffect(() => {
    async function fetchWalletDetails() {
      const response = await axios.get(
        `https://assettrack.com.ng/api/Wallet/AgentWalletBalance/${user.email}`,
      )
      const wallet = response.data
      setWalletDetails(wallet)
      console.log(wallet)
    }
    fetchWalletDetails()
  }, [user.email])

  const handlePayment = async e => {
    e.preventDefault()

    try {
      console.log(billData)
      await axios.post('https://assettrack.com.ng/api/transactions', {
        id: 0,
        amount: billData.billAmount,
        bill: billData.billReferenceNo,
        date: billData.billDate,
        walletId: walletDetails.id,
        wallet: null,
      })
      navigate('/dashboard/billing')
    } catch (error) {
      console.error(error)
    }
  }

  if (!billData) return <Navigate to='/dashboard/billing' />

  return (
    <div className='font-montserrat flex flex-col items-center'>
      <div className='flex flex-col text-center mt-16 mb-8'>
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
          <div className='w-full pb-5 flex gap-12'>
            <button
              className='bg-tax-blue w-full py-3 text-white rounded-md text-2xl'
              onClick={handlePayment}
            >
              Pay Now
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default BillDetails
