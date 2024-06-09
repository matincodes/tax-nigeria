import { Smile } from "lucide-react";
import { FingerprintIcon } from "lucide-react";
import { PlusCircle } from "lucide-react";
import { useState } from "react";

const TaxPayerOnboardingOne = () => {
  const[selectedImage, setSelectedImage] = useState(null)

  const onImageSelect = (e) =>{
    const file = e.target.files[0]
    console.log(file)
    if(!file) return;

    setSelectedImage(URL.createObjectURL(file))
  }

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

       <div className=" p-4 h-full  relative">

        {/* first  */}  
          <div className=" flex items-center place-content-end space-x-9">
            <div className="font-montserrat  text-right space-y-1">
              <h2 className="font-bold text-[20px] tracking-wide">Face Capture</h2>
              <p className="text-[21px]">Upload or take an image</p>
            </div>
            <div className="icon bg-[#F2F2F2] w-[70px] h-[70px] rounded-full grid place-content-center">
              <Smile className="w-10 h-10 text-[#4E72D1]" />
            </div>
            <div className=" border-l-2 h-20 flex items-center place-content-center ">
                <div className="w-[18px] h-[18px] absolute bg-tax-blue rounded-full"></div>
            </div>
          </div>
        {/* first  */}  

        {/* first  */}  
          <div className="text-[#C3C3C3]  flex items-center place-content-end space-x-9">
            <div className="font-montserrat  text-right space-y-1">
              <h2 className="font-bold text-[20px] tracking-wide">Right Index finger</h2>
              <p className="text-[21px]"> Scan print to right index</p>
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
              <h2 className="font-bold text-[20px] tracking-wide">Right Thumb finger</h2>
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
              <h2 className="font-bold text-[20px] tracking-wide">Left Index finger</h2>
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
              <h2 className="font-bold text-[20px] tracking-wide">Left Thumb finger</h2>
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
    <div className="flex place-content-center items-center flex-col space-y-4">
      <input type="file" accept="image/" name="" id="imageUpload" onChange={onImageSelect} className="hidden " />
      <label htmlFor="imageUpload" className="w-[340px] h-[350px] bg-[#D9D9D9] relative cursor-pointer grid  text-center place-content-center items-center ">
      <PlusCircle className="w-12 h-12 text-tax-blue " />
      {selectedImage && <img src={selectedImage} alt="SelectedImage" className="w-full h-full object-cover object-center absolute top-0" />}
      </label> 
            <a href="taxpayer-onboarding-two" className="bg-tax-blue w-6/12 py-3 text-white rounded-md text-2xl text-center">
              Confirm
            </a>
    </div>

    </div>
  );
};

export default TaxPayerOnboardingOne;
