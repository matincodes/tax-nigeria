import { useState } from "react";
import TaxpayerID from "../taxpayer-id/taxpayer-id";
import TaxPayerOne from "../taxpayer-one/taxpayer-one";

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