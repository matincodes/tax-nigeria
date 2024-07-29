import { Check } from "lucide-react";
import { FingerprintIcon } from "lucide-react";
import RightIndexFinger from "../../../assets/img/taxpayer-reg/rightfinger.png";

const TaxPayerOnboardingTwo = () => {
  return (
    <div className=" grid grid-cols-2">
      <div className="flex flex-col text-center mt-16 mb-8 pl-10 space-y-4">
        {/* Heading */}
        <div className="font-montserrat text-left">
          <h2 className="font-bold text-3xl">Taxpayer Onboarding</h2>
          <p className="font-normal text-2xl">
            Follow the 5 steps to complete your Onboarding
          </p>
        </div>
        {/* Heading */}

        <div className=" p-4 h-full">
          {/* first  */}
          <div className="text-[#C3C3C3]  flex items-center place-content-end space-x-9">
            <div className="font-montserrat  text-right space-y-1">
              <h2 className="font-bold text-[20px] tracking-wide">
                Face Capture
              </h2>
              <p className="text-[21px]">Upload or take an image</p>
            </div>
            <div className="icon w-[70px] bg-[#F2F2F2] h-[70px] rounded-full grid place-content-center">
              <Check className="w-14 h-14 p-2 bg-tax-blue rounded-full text-white" />
            </div>
            <div className=" border-l-2 h-20 flex items-center place-content-center ">
              <div className="w-[18px] h-[18px] absolute  bg-[#C3C3C3] rounded-full"></div>
            </div>
          </div>
          {/* first  */}

          {/* first  */}
          <div className=" flex items-center place-content-end space-x-9">
            <div className="font-montserrat  text-right space-y-1">
              <h2 className="font-bold text-[20px] tracking-wide">
                Right Index finger
              </h2>
              <p className="text-[21px]"> Scan print to right index</p>
            </div>
            <div className="icon bg-[#F2F2F2] w-[70px] h-[70px] rounded-full grid place-content-center">
              <FingerprintIcon className="w-10 h-10 text-tax-blue" />
            </div>

            <div className=" border-l-2 h-20 flex items-center place-content-center ">
              <div className="w-[18px] h-[18px] absolute bg-tax-blue rounded-full"></div>
            </div>
          </div>
          {/* first  */}

          {/* first  */}
          <div className="text-[#C3C3C3]  flex items-center place-content-end space-x-9">
            <div className="font-montserrat  text-right space-y-1">
              <h2 className="font-bold text-[20px] tracking-wide">
                Right Thumb finger
              </h2>
              <p className="text-[21px]"> Scan print to right thumb</p>
            </div>
            <div className="icon bg-[#F2F2F2] w-[70px] h-[70px] rounded-full grid place-content-center">
              <FingerprintIcon className="w-10 h-10" />
            </div>
            <div className=" border-l-2 h-20 flex items-center place-content-center ">
              <div className="w-[18px] h-[18px] absolute  bg-[#C3C3C3] rounded-full"></div>
            </div>
          </div>
          {/* first  */}

          {/* first  */}
          <div className="text-[#C3C3C3]  flex items-center place-content-end space-x-9">
            <div className="font-montserrat  text-right space-y-1">
              <h2 className="font-bold text-[20px] tracking-wide">
                Left Index finger
              </h2>
              <p className="text-[21px]"> Scan print to left index</p>
            </div>
            <div className="icon bg-[#F2F2F2] w-[70px] h-[70px] rounded-full grid place-content-center">
              <FingerprintIcon className="w-10 h-10" />
            </div>
            <div className=" border-l-2 h-20 flex items-center place-content-center ">
              <div className="w-[18px] h-[18px] absolute  bg-[#C3C3C3] rounded-full"></div>
            </div>
          </div>
          {/* first  */}

          {/* first  */}
          <div className="text-[#C3C3C3]  flex items-center place-content-end space-x-9">
            <div className="font-montserrat  text-right space-y-1">
              <h2 className="font-bold text-[20px] tracking-wide">
                Left Thumb finger
              </h2>
              <p className="text-[21px]"> Scan print to left thumb</p>
            </div>
            <div className="icon bg-[#F2F2F2] w-[70px] h-[70px] rounded-full grid place-content-center">
              <FingerprintIcon className="w-10 h-10" />
            </div>
            <div className=" border-l-2 h-20 flex items-center place-content-center ">
              <div className="w-[18px] h-[18px] absolute  bg-[#C3C3C3] rounded-full"></div>
            </div>
          </div>
          {/* first  */}
        </div>
      </div>

      {/*  */}
      <div className="flex place-content-center items-center flex-col space-y-12 ">
        <label
          htmlFor="imageUpload"
          className="w-[250px] h-[350px] bg-[#D9D9D9] relative grid  text-center place-content-center items-center "
        >
          <img
            src={RightIndexFinger}
            alt="SelectedImage"
            className="w-full h-full object-cover object-center absolute top-0"
          />
        </label>
        <div className="w-[70%] pb-5 flex gap-12">
          <button className="text-center bg-[#CED8F2] w-full py-3 text-tax-blue rounded-md text-2xl">
            Retry
          </button>
          <a
            href="taxpayer-onboarding-three"
            className="bg-tax-blue w-full py-3 text-white rounded-md text-2xl text-center"
          >
            Confirm
          </a>
        </div>
      </div>
    </div>
  );
};

export default TaxPayerOnboardingTwo;
