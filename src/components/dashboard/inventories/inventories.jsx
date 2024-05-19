const Inventories = ({ title, metric, image }) => {
  return (
    <div className="w-full flex items-start justify-between gap-3 mb-3 rounded-lg bg-gray-200 shadow-xl py-6 px-5">
      <div className="flex-col  items-start flex">
        <h2 className="">{title}</h2>
        <p className="text-2xl text-black">{metric}</p>
      </div>
      <img src={image} alt="" />
    </div>
  );
};

export default Inventories;
