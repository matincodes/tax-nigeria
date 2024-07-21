import { useNavigate } from 'react-router-dom'
import Button from '../button/button'
import InnerTable from './inner-section/inner-table'

const ConsultantPage = () => {
  const navigate = useNavigate()
  return (
    <div className='w-full font-manrope p-[30px]'>
      {/* Top Part */}
      <div className='flex gap-6 items-center p-[10px]'>
        <b className='text-[20px] text-[#4C4C4C]'>Consultants</b>
        <Button
          text='Add New'
          iconposition='left'
          icon='+'
          handleButton={() => navigate('/taxconsultant-registration')}
        />
        <Button text='Export Members (CSV)' />
      </div>
      {/* Top Part */}

      <InnerTable />
    </div>
  )
}

export default ConsultantPage
