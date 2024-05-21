const Inventories = ({ title, metric, image }) => {
  return (
    <div className="w-full flex items-start flex-col  gap-3 mb-3 rounded-lg bg-white border py-6 px-5">
      <img src={image} alt="" />
      <div className="flex-col  items-start flex">
        <h2 className="">{title}</h2>
        <p className="text-2xl text-black">{metric}</p>
      </div>
     
    </div>
  );
};

export default Inventories;
