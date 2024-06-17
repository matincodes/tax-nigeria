import { useState } from "react";
import TaxpayerID from "../taxpayer-id/taxpayer-id";
import TaxPayerOne from "../taxpayer-one/taxpayer-one";
import TaxPayerTwo from "../taxpayer-two/taxpayer-two";
import TaxPayerOnboardingFive from "../taxpayer-onboarding-five/taxpayer-onboarding-five";
import TaxPayerOnboardingOne from "../taxpayer-onboarding-one/taxpayer-onboarding-one";
import TaxPayerOnboardingFour from "../taxpayer-onboarding-four/taxpayer-onboarding-four";
import TaxPayerOnboardingTwo from "../taxpayer-onboarding-two/taxpayer-onboarding-two";
import TaxPayerOnboardingThree from "../taxpayer-onboarding-three/taxpayer-onboarding-three";

const TaxpayerForm = () => {
    const [currentStep, setCurrentStep] = useState(1);

    const nextStep = () => {
        setCurrentStep((prevStep)  => prevStep + 1)
    }

    const prevStep = () => {
        setCurrentStep((prevStep) => prevStep - 1)
    }

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <TaxpayerID nextStep={nextStep}/>
            case 2: 
                return <TaxPayerOne nextStep={nextStep} prevStep={prevStep}/>
            case 3: 
                return <TaxPayerTwo nextStep={nextStep} prevStep={prevStep}/>
            case 4:
                return <TaxPayerOnboardingOne nextStep={nextStep} prevStep={prevStep} />
            case 5: 
                return <TaxPayerOnboardingTwo nextStep={nextStep} prevStep={prevStep} />
            case 6: 
                return <TaxPayerOnboardingThree nextStep={nextStep} prevStep={prevStep} />
            case 7:
                return <TaxPayerOnboardingFour nextStep={nextStep} prevStep={prevStep} />
            case 8: 
                return <TaxPayerOnboardingFive nextStep={nextStep} prevStep={prevStep} />
            default:
                return <TaxpayerID nextStep={nextStep}/>
        }
    }

    return ( 
        <div>
            {renderStep()}
        </div>
     );
}
 
export default TaxpayerForm;