const Inventories = ({ title, metric, image }) => {
  return (
    <div className='w-full flex items-start flex-col gap-3 mb-3 rounded-lg bg-white border py-6 px-5'>
      <div className='w-full flex justify-between items-center'>
        <img src={image} alt='' />
        <p>
          <span className='text-[#069855]'>As of </span>
          <span className='opacity-60'>today</span>
        </p>
      </div>

      <div className='flex-col items-start flex justify-between h-full'>
        <h6 className='text-base'>{title}</h6>
        <p className='text-3xl text-black font-medium'>{metric}</p>
      </div>
    </div>
  )
};

export default Inventories;
