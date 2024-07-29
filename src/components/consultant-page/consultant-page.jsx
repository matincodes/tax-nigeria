import { useNavigate } from 'react-router-dom'
import Button from '../button/button'
import InnerTable from './inner-section/inner-table'
import ProgressBar from '../progress-bar/progress-bar'
import { consultants } from '../../data/consultants'
import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'

const data = consultants.flatMap(c => c.consultants)

const ConsultantPage = () => {
  const [consultantData, setConsultantData] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const columns = useMemo(
    () => [
      {
        header: 'Consultants',
        accessorKey: 'name',
        cell: ({ row }) => (
          <div className='flex items-center gap-3'>
            <img
              src={row.original.image}
              alt={row.original.name}
              className='w-[32px] h-[32px] grid place-content-center object-cover object-center rounded-full overflow-hidden'
            />
            {row.original.name}
          </div>
        ),
      },
      {
        header: 'Ratings',
        accessorKey: 'rating',
        cell: ({ cell }) => (
          <div className='flex gap-2 items-center'>
            <ProgressBar progress={cell.getValue()} max={100} />
            {cell.getValue()}%
          </div>
        ),
      },
      {
        header: () => <div className='text-center'>Tax Station</div>,
        accessorKey: 'tax_station',
        cell: ({ cell }) => (
          <div className='text-center'>{cell.getValue()}</div>
        ),
      },
      {
        accessorKey: 'action',
        header: () => <div className='text-right pr-7'>Action</div>,
        cell: () => (
          <div className='flex place-content-end pr-4'>
            <Button
              text='Profile'
              handleButton={e => {
                e.preventDefault()
                navigate('/dashboard/consultant-profile')
              }}
            />
          </div>
        ),
      },
    ],
    [navigate],
  )

  useEffect(() => {
    async function fetchConsultantData() {
      try {
        setLoading(true)
        // fetch tax stations
        const res = await axios.get('https://assettrack.com.ng/api/TaxStation')
        setConsultantData(res.data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchConsultantData()
  }, [])


  return (
    <div className='w-full font-manrope p-[30px]'>
      {/* Top Part */}
      <div className='flex gap-6 items-center p-[10px]'>
        <b className='text-[20px] text-[#4C4C4C]'>Consultants</b>
        <Button
          text='Add New'
          iconposition='left'
          icon='+'
          handleButton={() => navigate('/dashboard/taxconsultant-registration')}
        />
        <Button text='Export Members (CSV)' />
      </div>
      {/* Top Part */}

      <InnerTable data={data} columns={columns} loading={loading} />
    </div>
  )
}

export default ConsultantPage
