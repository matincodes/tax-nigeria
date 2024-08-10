import { Navigate, useLocation } from 'react-router-dom'
import phone from '../../assets/img/ph_phone-thin.png'
import locationImg from '../../assets/img/system-uicons_location.png'
import userprofile from '../../assets/img/face_placeholder.png'

const TaxpayerDetails = () => {
  const location = useLocation()
  const taxpayer = location?.state?.data

  if (!taxpayer) return <Navigate to='/dashboard/taxpayer' />

  return (
    <div className='w-full p-6 h-full space-y-6'>
      <div className='w-full bg-[#F6F6F6] grid grid-cols-10 p-6'>
        <img src={userprofile} alt='' className='col-span-2 rounded-full' />
        <div className='w-full flex items-center justify-around h-full col-span-8'>
          <div className='text-[#4C4C4C] flex flex-col gap-y-10 items-start justify-start border-r p-2 pr-14'>
            <div className='flex flex-col items-start justify-start gap-y-1'>
              <p className='font-medium text-lg'>{`${taxpayer?.firstName} ${taxpayer?.lastname}`}</p>
              <p className='text-base'>Taxpayer</p>
            </div>
            <div className='flex flex-col items-start justify-start gap-y-1'>
              <p className='text-base flex items-center gap-x-2'>
                <img src={phone} alt='' />
                <span>{taxpayer?.phoneNumber}</span>
              </p>
              <p className='text-base flex items-center gap-x-2'>
                <img src={locationImg} alt='' />
                <span>{taxpayer?.address}</span>
              </p>
            </div>
          </div>
          <div className='text-[#4C4C4C] flex flex-col gap-y-10 items-start justify-start border-r p-2 pr-24'>
            <div className='flex flex-col items-start justify-start gap-y-1'>
              <p className='font-medium text-lg'>Email</p>
              <p className='text-base'>{taxpayer?.email}</p>
            </div>
            <div className='flex flex-col items-start justify-start gap-y-1'>
              <p className='font-medium text-lg'>Tax ID</p>
              <p className='text-base'>{taxpayer?.taxPayerId}</p>
            </div>
          </div>
          <div className='text-[#4C4C4C] flex flex-col gap-y-10 items-start justify-start p-2 pr-24'>
            <div className='flex flex-col items-start justify-start gap-y-1'>
              <p className='font-medium text-lg'>Identity Type</p>
              <p className='text-base'>{taxpayer?.identityTypeName}</p>
            </div>
            <div className='flex flex-col items-start justify-start gap-y-1'>
              <p className='font-medium text-lg'>Date of Birth</p>
              <p className='text-base'>{taxpayer?.dob}</p>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full flex gap-6 items-center'>
        <div className='rounded-lg p-4 gap-3 border border-[#87BB42] flex flex-col items-start justify-start min-w-48 h-fit'>
          <p className='font-semibold text-2xl'>{taxpayer?.annualTurnover}</p>
          <p className='text-base'>Annual Turnover</p>
        </div>
        <div className='rounded-lg p-4 gap-3 border border-[#938406] flex flex-col items-start justify-start min-w-48 h-fit'>
          <p className='font-semibold text-2xl'>{taxpayer?.numberofShops}</p>
          <p className='text-base'>Number of Shops</p>
        </div>
      </div>
    </div>
  )
}

export default TaxpayerDetails
