import anu from "../../../assets/img/anu.png";
import dots from "../../../assets/img/Bussiness_Sector/three_dots.svg";
import deleteicon from "../../../assets/img/trash-2.png";
import editicon from "../../../assets/img/iconamoon_edit-light.png";
import { useState } from "react";

const PayerCard = ({ name, status, station }) => {
  const [isShow, setShow] = useState(false);

  return (
    <div className="bg-[#FCFCFC] text-sm w-full grid grid-cols-5 px-2 py-4 border-b items-center ">
      <div className="flex items-center col-span-2 gap-x-2">
        <img src={anu} alt="" />
        <p>{name}</p>
      </div>
      <p
        className={` text-xs w-fit  px-2 py-1 ${
          status === "Pending"
            ? "text-yellow-600 bg-yellow-100"
            : "text-green-600 bg-green-100"
        }`}
      >
        {status}
      </p>
      <p>{station}</p>

      <button onClick={() => setShow(!isShow)} className="relative">
        <img src={dots} alt="" />
      </button>
      {isShow && <DropDown close={() => setShow(!isShow)} />}
    </div>
  );
};

export default PayerCard;

export const DropDown = ({ close, className }) => {
  return (
    <div
      className={`absolute top-5 ${className ? className : " right-[200px]"}`}
    >
      <button
        onClick={close}
        className="w-full z-20 h-full inset-0 fixed"
      ></button>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="bg-white z-50 shadow relative w-[200px] h-fit "
      >
        <div className="w-full border-b p-3 flex items-start justify-between">
          <div
            onClick={close}
            className="flex flex-col text-sm items-start justify-start"
          >
            <p>Edit</p>
            <p className="text-xs text-gray-500">Edit this Profile</p>
          </div>
          <img src={editicon} alt="" />
        </div>
        <div
          onClick={close}
          className="w-full p-3 flex items-start justify-between"
        >
          <div className="flex flex-col text-sm items-start justify-start">
            <p>Delete</p>
            <p className="text-xs text-gray-500">Delete this Profile</p>
          </div>
          <img src={deleteicon} alt="" />
        </div>
      </div>
    </div>
  );
};
