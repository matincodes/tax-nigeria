import userprofile from "../../assets/img/userprofile.png";
import phone from "../../assets/img/ph_phone-thin.png";
import location from "../../assets/img/system-uicons_location.png";
import { AiOutlinePlus } from "react-icons/ai";
import PayerCard from "./payercard/payercard";

const ConsultantProfile = () => {
  return (
    <div className="w-full p-6 h-full space-y-6">
      <div className="w-full bg-[#F6F6F6] grid grid-cols-10 p-6">
        <img src={userprofile} alt="" className="col-span-2" />
        <div className="w-full flex items-center justify-around h-full col-span-8">
          <div className="text-[#4C4C4C] flex flex-col gap-y-10 items-start justify-start border-r p-2 pr-14">
            <div className="flex flex-col items-start justify-start gap-y-1">
              <p className="font-medium text-lg">Abdulmatin Abdulrasak</p>
              <p className="text-base">Consultant</p>
            </div>
            <div className="flex flex-col items-start justify-start gap-y-1">
              <p className="text-base flex items-center gap-x-2">
                <img src={phone} alt="" />
                <span>+234814953111</span>
              </p>
              <p className="text-base flex items-center gap-x-2">
                <img src={location} alt="" />
                <span>Lagos</span>
              </p>
            </div>
          </div>
          <div className="text-[#4C4C4C] flex flex-col gap-y-10 items-start justify-start border-r p-2 pr-24">
            <div className="flex flex-col items-start justify-start gap-y-1">
              <p className="font-medium text-lg">Date of Birth</p>
              <p className="text-base">19/05/1996</p>
            </div>
            <div className="flex flex-col items-start justify-start gap-y-1">
              <p className="font-medium text-lg">Consultant ID</p>
              <p className="text-base">RY33NDH3D</p>
            </div>
          </div>
          <div className="text-[#4C4C4C] flex flex-col gap-y-10 items-start justify-start p-2">
            <div className="flex flex-col items-start justify-start gap-y-1">
              <p className="font-medium text-lg">Address</p>
              <p className="text-base">No 13, Adebowale Crescent</p>
            </div>
            <div className="flex flex-col items-start justify-start gap-y-1">
              <p className="font-medium text-lg">Tax Station</p>
              <p className="text-base">Ikeja, Lagos</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex gap-6 items-center">
        <div className="rounded-lg p-2 border border-[#87BB42] flex flex-col items-start justify-start w-[180px] h-fit">
          <p className="font-semibold text-xl">N 3,456</p>
          <p className="text-base">Balance</p>
        </div>
        <div className="rounded-lg p-2 border border-[#87BB42] flex flex-col items-start justify-start w-[180px] h-fit">
          <p className="font-semibold text-xl">N 3,456</p>
          <p className="text-base">Income</p>
        </div>
        <div className="rounded-lg p-2 border border-[#87BB42] flex flex-col items-start justify-start w-[180px] h-fit">
          <p className="font-semibold text-xl">N 3,456</p>
          <p className="text-base">Expenses</p>
        </div>
        <div className="rounded-lg p-2 bg-[#4E72D1] text-white flex flex-col items-center justify-center w-[180px] h-fit">
          <AiOutlinePlus className="text-[28px]" />
          <p className="font-semibold text-base">Fund Account</p>
        </div>
      </div>

      <div className="flex flex-col items-start justify-start gap-y-3">
        <h2 className="font-medium text-xl">Tax Agent in Charge</h2>
        <div className="w-full">
          <div className="w-full p-2 text-sm bg-[#F7F7F7] grid grid-cols-5">
            <p className="col-span-2">Payer</p>
            <p>Status</p>
            <p>Tax Station</p>
            <p>Action</p>
          </div>
          <PayerCard name={"Anuoluwapo"} station={"Lagos"} status={"Pending"} />
          <PayerCard name={"Olabode"} station={"Lagos"} status={"Verified"} />
        </div>
      </div>
    </div>
  );
};

export default ConsultantProfile;
