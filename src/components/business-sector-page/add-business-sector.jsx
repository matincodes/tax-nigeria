import axios from 'axios'
import { useState } from 'react'
import { HiOutlineUserGroup } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'

const AddBusinessSector = () => {
  const [sector, setSector] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await axios.post('https://assettrack.com.ng/api/Sector', {
        id: 0,
        sectorName: sector,
        description: '',
        isTaxRuleEnabled: true,
        sectorRules: null,
      })
      navigate('/dashboard/business')
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className='w-full px-6 space-y-6'>
      <h2 className='font-semibold text-xl'>Add Business Sector</h2>

      <div className='w-full h-[70vh] border border-gray-600 flex px-4 items-center justify-center'>
        <div className='w-full max-w-xl gap-y-3 bg-[#FAFAFA] shadow flex flex-col items-start justify-start p-6 h-fit'>
          <div className='flex items-center gap-x-2'>
            <HiOutlineUserGroup className='text-[60px]' />
            <p className='font-semibold text-lg'>Add New</p>
          </div>
          <p className='text-base'>Add New Business Sector</p>

          <div className='w-full grid grid-cols-10 mt-3 gap-3'>
            <input
              type='text'
              className='outline-none w-full col-span-8 border-b bg-transparent border-black px-4 h-11 placeholder:text-gray-400'
              value={sector}
              onChange={e => setSector(e.target.value)}
              placeholder='Enter Sector Name'
            />

            <button
              className={`h-11 text-white bg-[#4E72D1] rounded-md flex col-span-2 items-center justify-center ${
                !sector
                  ? 'opacity-70 cursor-not-allowed'
                  : 'opacity-100 cursor-pointer'
              }`}
              onClick={handleSubmit}
              disabled={!sector}
            >
              <p>{submitting ? 'Adding...' : 'Add'}</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddBusinessSector
