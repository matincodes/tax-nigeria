import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const BillDetails = () => {
  const [billData, setBillData] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    const fetchBill = async () => {
      try {
        const response = await axios.get(
          `https://assettrack.com.ng/api/BillGeneration/${id}`,
        )

        setBillData(response.data)
      } catch (error) {
        console.error('Error fetching data', error)
      }
    }

    fetchBill()
  }, [id])

  return (
    <div className='font-montserrat flex flex-col items-center'>
      <div className='flex flex-col text-center mt-16 mb-8'>
        <h2 className='font-bold text-3xl'>Tax Assessment</h2>
      </div>
      <div className='w-3/5'>
        <form className='flex flex-col items-center'>
          <div className='w-full flex gap-16 pb-5'>
            <div className='w-full flex flex-col'>
              <label>Taxpayer ID</label>
              <input
                type='text'
                name='taxpayerId'
                value={billData.taxpayerId}
                readOnly
                className='border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded'
              />
            </div>
            <div className='w-full flex flex-col pb-5'>
              <label>Bill Reference No</label>
              <input
                type='text'
                name='amount'
                value={billData.billReferenceNo}
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
                value={billData.billAmount}
                readOnly
                className='border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded'
              />
            </div>
            <div className='w-full flex flex-col pb-5'>
              <label>Bill Status</label>
              <input
                type='text'
                name='assets'
                value={billData.billStatus}
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
                value={billData.txPayFName}
                readOnly
                className='border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded'
              />
            </div>
            <div className='w-full flex flex-col'>
              <label className='text-gray-600'>Last Name</label>
              <input
                type='text'
                value={billData.txPayLName}
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
                value={billData.assessmentRef}
                readOnly
                className='border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded'
              />
            </div>
            <div className='w-full flex flex-col pb-5'>
              <label className='text-gray-600'>Date</label>
              <input
                type='text'
                value={new Date(billData.billDate).toLocaleDateString()}
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
                value={billData.totalAmountPaid}
                readOnly
                className='border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded'
              />
            </div>
          </div>
          <div className='w-full pb-5 flex gap-12'>
            <button
              className='bg-tax-blue w-full py-3 text-white rounded-md text-2xl'
              onClick={() => console.log('Payment Successful')}
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
