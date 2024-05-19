const TaxInflow = () => {
  return (
    <div className="w-full p-4 col-span-full  rounded-xl bg-gray-200">
      <p className="font-semibold mb-4">Tax Inflow</p>

     <div className="w-full   pb-3">
     <div className="font-semibold border-b mb-2 grid border-gray-400 text-sm w-full grid-cols-7 p-2 gap-2 ">
        <p>Date</p>
        <p>TaxID</p>
        <p className="col-span-2">Name</p>
        <p>Type</p>
        <p>In. Amount</p>
        <p>Status</p>
      </div>
      {[1, 2, 3, 4].map((_) => (
        <div
          key={_}
          className=" border-b border-gray-400 text-sm grid w-full grid-cols-7 p-2 gap-2 "
        >
          <p>10/02/2023</p>
          <p>RTIE343WDN</p>
          <p className="col-span-2 w-full text-ellipsis whitespace-nowrap overflow-hidden">Chukuemeka Emmmanuel</p>
          <p>Consultant</p>
          <p>N45,000</p>
          <p className="text-green-600">Cleared</p>
        </div>
      ))}
     </div>
    </div>
  );
};

export default TaxInflow;
