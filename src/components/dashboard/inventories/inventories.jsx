const Inventories = ({ title, metric }) => {
  return (
    <div className="w-full flex flex-col items-start gap-y-4 rounded-lg bg-white shadow-lg py-10 px-8">
      <h2 className="font-semibold text-2xl text-[#B4CD93]">{metric}</h2>
      <p className="text-black">{title}</p>
    </div>
  );
};

export default Inventories;
