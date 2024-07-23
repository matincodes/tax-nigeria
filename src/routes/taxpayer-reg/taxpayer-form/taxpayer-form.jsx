import { useState } from 'react'
import TaxpayerID from '../taxpayer-id/taxpayer-id'
import TaxPayerOne from '../taxpayer-one/taxpayer-one'
import TaxPayerTwo from '../taxpayer-two/taxpayer-two'
import TaxPayerOnboardingFive from '../taxpayer-onboarding-five/taxpayer-onboarding-five'
import TaxPayerOnboardingOne from '../taxpayer-onboarding-one/taxpayer-onboarding-one'
import TaxPayerOnboardingFour from '../taxpayer-onboarding-four/taxpayer-onboarding-four'
import TaxPayerOnboardingTwo from '../taxpayer-onboarding-two/taxpayer-onboarding-two'
import TaxPayerOnboardingThree from '../taxpayer-onboarding-three/taxpayer-onboarding-three'
import TaxPayerThree from '../taxpayer-three/taxpayer-three'

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
          <TaxPayerOnboardingOne
            nextStep={nextStep}
            prevStep={prevStep}
            onboardingData={onboardingData}
            setOnboardingData={setOnboardingData}
          />
        )
      case 6:
        return (
          <TaxPayerOnboardingTwo
            nextStep={nextStep}
            prevStep={prevStep}
            onboardingData={onboardingData}
            setOnboardingData={setOnboardingData}
          />
        )
      case 7:
        return (
          <TaxPayerOnboardingThree
            nextStep={nextStep}
            prevStep={prevStep}
            onboardingData={onboardingData}
            setOnboardingData={setOnboardingData}
          />
        )
      case 8:
        return (
          <TaxPayerOnboardingFour
            nextStep={nextStep}
            prevStep={prevStep}
            onboardingData={onboardingData}
            setOnboardingData={setOnboardingData}
          />
        )
      case 9:
        return (
          <TaxPayerOnboardingFive
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
