import { Smile, PlusCircle } from 'lucide-react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const TaxPayerFour = ({ prevStep, setOnboardingData, onboardingData }) => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const onImageSelect = e => {
    const file = e.target.files[0]

    if (!file) return

    setSelectedImage(URL.createObjectURL(file))
    const reader = new FileReader()
    reader.onload = function (e) {
      const base64String = e.target.result
      setError(false)
      setOnboardingData(prevData => ({
        ...prevData,
        payerPics: base64String,
        identityPics: '',
        id: 0,
      }))
    }
    reader.onerror = function () {
      setError(true)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      await axios({
        method: 'POST',
        url: 'https://assettrack.com.ng/api/TaxPayer',
        data: onboardingData,
      })
      setError(false)
      setSuccess(true)
      setTimeout(() => {
        navigate(`/dashboard/assessment/${onboardingData.taxPayerId}`)
      }, 2000)
    } catch (error) {
      setError(true)
      console.error('Error creating Tax Station', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='pb-10'>
      <div className='flex flex-col justify-center text-center mt-16 mb-8 pl-10 space-y-4'>
        {/* Heading */}
        <div className='font-montserrat text-center'>
          <h2 className='font-bold text-3xl'>Taxpayer Onboarding</h2>
          <p className='font-normal text-2xl'>Complete your Onboarding</p>
        </div>
        {/* Heading */}

        <div className='p-4 h-full relative justify-center text-center'>
          {/* first */}
          <div className='flex items-center space-x-9 justify-center text-center'>
            <div className='font-montserrat text-center space-y-1'>
              <h2 className='font-bold text-[20px] tracking-wide'>
                Face Capture
              </h2>
              <p className='text-[21px]'>Upload or take an image</p>
            </div>
            <div className='icon bg-[#F2F2F2] w-[70px] h-[70px] rounded-full grid place-content-center'>
              <Smile className='w-10 h-10 text-[#4E72D1]' />
            </div>
          </div>
          {/* first */}
        </div>
      </div>

      {/* */}
      <div className='flex flex-col justify-center items-center space-y-4 mb-5'>
        <input
          type='file'
          accept='image/*'
          name='imageUpload'
          id='imageUpload'
          onChange={onImageSelect}
          className='hidden'
        />
        <label
          htmlFor='imageUpload'
          className='w-6/12 h-96 bg-[#D9D9D9] relative cursor-pointer grid text-center place-content-center items-center'
        >
          <PlusCircle className='w-12 h-12 text-tax-blue' />
          {selectedImage && (
            <img
              src={selectedImage}
              alt='SelectedImage'
              className='w-full h-full object-cover object-center absolute top-0'
            />
          )}
        </label>
        {error && (
          <p className='text-red-500 text-sm text-center'>
            An error occurred. Please try again.
          </p>
        )}
        {success && (
          <p className='text-green-500 text-sm text-center'>
            Taxpayer created successfully. Redirecting...
          </p>
        )}
        <button
          className='bg-tax-blue w-6/12 py-3 text-white rounded-md text-2xl text-center'
          onClick={handleSubmit}
          disabled={loading || !selectedImage || success}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </div>
  )
}

export default TaxPayerFour
