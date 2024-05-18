import user from "../../assets/img/user.png";
const ConsultantMgt = () => {
  return (
    <div className="w-full flex flex-col items-start gap-y-4 justify-start">
      <h2 className="font-semibold text-lg">Consultant Management</h2>

   <div className="flex w-full flex-col gap-y-2 items-start justify-start">
   {[1, 2, 3].map((_) => (
        <div key={_} className="w-full grid grid-cols-3 items-center">
          <div className="flex items-center gap-x-2">
            <img src={user} alt="" />
            <p className="text-sm">Will Smith</p>
          </div>
          <p>Lagos</p>
          <button className="bg-[#B4CD93] text-white rounded-lg px-3 h-11 flex ">
            Manage
          </button>
        </div>
      ))}

   </div>
    </div>
  );
};

export default ConsultantMgt;
