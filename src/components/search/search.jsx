import search from '../../assets/img/search.svg'

const Search = () => {
  return (
    <div className='relative w-1/3'>
      <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
        <img src={search} alt='search' className='w-4 h-4 text-gray-500' />
      </div>
      <input
        type='search'
        id='default-search'
        className='block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50'
        placeholder='Search by Name/ID'
      />
    </div>
  )
}

export default Search
