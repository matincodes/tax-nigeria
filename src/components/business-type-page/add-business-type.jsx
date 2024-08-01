import axios from 'axios'
import { useEffect, useState } from 'react'
import { HiOutlineUserGroup } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'

const AddBusinessType = () => {
  const [sectors, setSectors] = useState(null)
  const [selectedSector, setSelectedSector] = useState('')
  const [type, setType] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchSectors = async () => {
      try {
        const response = await axios.get('https://assettrack.com.ng/api/sector')
        setSectors(response.data)
      } catch (error) {
        console.error('Error fetching Business Sector Data')
      }
    }

    fetchSectors()
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    setSubmitting(true)
    try {
      // TODO: Add Business Type
      await axios.post('https://assettrack.com.ng/api/businessTypes', {
        id: 0,
        name: type,
        description: '',
        requiresLicense: true,
        isInternational: true,
        sectorId: JSON.parse(selectedSector)?.id,
        sector: JSON.parse(selectedSector)?.sectorName,
        isTaxRuleEnabled: true,
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
      <h2 className='font-semibold text-xl'>Add Business Type</h2>

      <div className='w-full h-[70vh] border border-gray-600 flex px-4 items-center justify-center'>
        <div className='w-full max-w-xl gap-y-3 bg-[#FAFAFA] shadow flex flex-col items-start justify-start p-6 h-fit'>
          <div className='flex items-center gap-x-2'>
            <HiOutlineUserGroup className='text-[60px]' />
            <p className='font-semibold text-lg'>Add New</p>
          </div>
          <p className='text-base'>Add New Business Type</p>

          <div className='w-full flex gap-16 pb-5'>
            <div className='w-full flex flex-col'>
              <label>Sector</label>
              <select
                name='stateId'
                value={selectedSector}
                onChange={e => setSelectedSector(e.target.value)}
                className='border-2 border-tax-blue py-4 px-5 outline-none rounded text-gray-400 bg-white'
                disabled={!sectors}
              >
                <option value={''} key='select'>
                  Select Sector
                </option>
                {sectors?.map(({ id, sectorName }) => (
                  <option
                    className='text-black'
                    value={JSON.stringify({ id, sectorName })}
                    key={id}
                  >
                    {sectorName}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className='w-full grid grid-cols-10 mt-3 gap-3'>
            <input
              type='text'
              className='outline-none w-full col-span-8 border-b bg-transparent border-black px-4 h-11 placeholder:text-gray-400'
              value={type}
              onChange={e => setType(e.target.value)}
              placeholder='Enter Business Type'
            />

            <button
              className={`h-11 text-white bg-[#4E72D1] rounded-md flex col-span-2 items-center justify-center ${
                !type && !selectedSector
                  ? 'opacity-70 cursor-not-allowed'
                  : 'opacity-100 cursor-pointer'
              }`}
              onClick={handleSubmit}
              disabled={!type && !selectedSector}
            >
              <p>{submitting ? 'Adding...' : 'Add'}</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddBusinessType
