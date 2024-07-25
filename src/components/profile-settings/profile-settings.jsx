import Userprofile from "../../assets/img/userprofile.png"
import UploadBtn from "../../assets/img/upload.svg"


function profile_settings() {
  return (
    <div className="font-manrope">
      {/* Top part */}
      <div className="flex p-[20px]">
        <b className="text-[30px] text-[#4C4C4C]">My Profile</b>
      </div>
      {/* Top part */}

      {/* Inner Content */}
      <div className="border flex p-[30px] space-x-3">
        <h2 className="text-[26px] basis-[10%]">Details</h2>

        <form action="" method="post" className="border basis-full grid">
          <div className="col-span-full flex items-center flex-col p-4 space-y-7">

            {/* img */}
            <div className="w-[90%] flex items-center space-x-3">
              <div className="rounded-full w-[100px] h-[100px] border-2 border-dashed border-[#00000067] grid place-content-center relative">
                <img src={Userprofile} alt="" srcSet="" className="w-[100px] h-[100px] rounded-full object-cover object-center p-2 " />
              </div>

              <label htmlFor="file-upload" className="relative cursor-pointer border border-[#D0D5DD] focus:border-2 pt-2 pb-2 pl-5 pr-5 mb-1 rounded-xl font-semibold">
                  <span className="flex items-center"><img src={UploadBtn} alt="" className="mr-2" /> Upload</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" />
              </label>
            </div>
            {/* img */}

            {/* fName */}
            <div className="w-[90%] flex space-x-4">
              <div className="basis-[80%] space-y-2">
                <label htmlFor="fullName" className="text-[18px] text-[#4C4C4C]">Full Name</label>
                <input type="text" name="fullName" placeholder="Abdulmatin Adeniji" id="fullName" className="border border-[#E6E6E6] w-full outline-none p-3"/>
              </div>
              <div className="basis-[30%] flex items-end place-items-start">
                <button type="button" className=" border border-[#D0D5DD] focus:border-2 pt-2 pb-2 pl-4 pr-4 mb-1 rounded-xl font-semibold">Edit</button>
              </div>
            </div>
            {/* fName */}

            {/* Email Address */}
            <div className="w-[90%] flex space-x-4">
              <div className="basis-[80%] space-y-2">
                <label htmlFor="Email" className="text-[18px] text-[#4C4C4C]">Email Address</label>
                <input type="email" name="Email" placeholder="AbdulMatin@gmail.com" id="Email" className="border border-[#E6E6E6] w-full outline-none p-3"/>
              </div>
              <div className="basis-[30%] flex items-end place-items-start">
                <button type="button" className=" border border-[#D0D5DD] focus:border-2 pt-2 pb-2 pl-4 pr-4 mb-1 rounded-xl font-semibold">Edit</button>
              </div>
            </div>
            {/* Email Address */}

            {/* Phone Number */}
            <div className="w-[90%] flex space-x-4">
              <div className="basis-[80%] space-y-2">
                <label htmlFor="phoneNum" className="text-[18px] text-[#4C4C4C]">Phone Number</label>
                <input type="number" name="phoneNum" placeholder="09033666121" id="phoneNum" className="border border-[#E6E6E6] w-full outline-none p-3"/>
              </div>
              <div className="basis-[30%] flex items-end place-items-start">
                <button type="button" className=" border border-[#D0D5DD] focus:border-2 pt-2 pb-2 pl-4 pr-4 mb-1 rounded-xl font-semibold">Edit</button>
              </div>
            </div>
            {/* Phone Number */}

            {/* Password */}
            <div className="w-[90%] flex space-x-4">
              <div className="basis-[80%] space-y-2">
                <label htmlFor="password" className="text-[18px] text-[#4C4C4C]">Password</label>
                <input type="password" name="password" placeholder="*********************" id="password" className="border border-[#E6E6E6] w-full outline-none p-3"/>
              </div>
              <div className="basis-[30%] flex items-end place-items-start">
                <button type="button" className=" border border-[#D0D5DD] focus:border-2 pt-2 pb-2 pl-4 pr-4 mb-1 rounded-xl font-semibold">Change Password</button>
              </div>
            </div>
            {/* Password */}

          </div>
        </form>
      </div>
      {/* Inner Content */}
    </div>
  );
}

export default profile_settings;
