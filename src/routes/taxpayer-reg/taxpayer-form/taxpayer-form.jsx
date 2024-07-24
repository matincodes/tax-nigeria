import { useState } from 'react'
import TaxpayerID from '../taxpayer-id/taxpayer-id'
import TaxPayerOne from '../taxpayer-one/taxpayer-one'
import TaxPayerTwo from '../taxpayer-two/taxpayer-two'
import TaxPayerThree from '../taxpayer-three/taxpayer-three'
import TaxPayerFour from '../taxpayer-four/taxpayer-four'

const TaxpayerForm = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [onboardingData, setOnboardingData] = useState()

  const nextStep = () => {
    setCurrentStep(prevStep => prevStep + 1)
  }

  const prevStep = () => {
    setCurrentStep(prevStep => prevStep - 1)
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <TaxpayerID
            nextStep={nextStep}
            onboardingData={onboardingData}
            setOnboardingData={setOnboardingData}
          />
        )
      case 2:
        return (
          <TaxPayerOne
            nextStep={nextStep}
            prevStep={prevStep}
            onboardingData={onboardingData}
            setOnboardingData={setOnboardingData}
          />
        )
      case 3:
        return (
          <TaxPayerTwo
            nextStep={nextStep}
            prevStep={prevStep}
            onboardingData={onboardingData}
            setOnboardingData={setOnboardingData}
          />
        )
      case 4:
        return (
          <TaxPayerThree
            nextStep={nextStep}
            prevStep={prevStep}
            onboardingData={onboardingData}
            setOnboardingData={setOnboardingData}
          />
        )
      case 5:
        return (
          <TaxPayerFour
            nextStep={nextStep}
            prevStep={prevStep}
            onboardingData={onboardingData}
            setOnboardingData={setOnboardingData}
          />
        )
      default:
        return (
          <TaxpayerID
            nextStep={nextStep}
            onboardingData={onboardingData}
            setOnboardingData={setOnboardingData}
          />
        )
    }
  }

  return <div>{renderStep()}</div>
}

export default TaxpayerForm
