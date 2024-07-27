import React from 'react'

function pagination({paginationArray, paginationSection, prevPage, nextPage}) {
  return (
    <div className='p-2 mt-3 flex font-manrope'>
      <ul className='flex gap-4'>
        <button
          className={`${
            paginationSection === paginationArray[0]
              ? 'disabled text-[14px] text-[#74737371]'
              : 'text-[14px]'
          }`}
          onClick={paginationSection === paginationArray[0] ? null : prevPage}
          name='prevPage'
          disabled={paginationSection === paginationArray[0]}
        >
          Previous Page
        </button>

        {paginationArray.map(sector => (
          <button
            className={`${
              paginationSection === sector
                ? 'w-[30px] h-[30px] rounded-full flex place-content-center items-center bg-tax-blue text-white'
                : 'w-[30px] h-[30px] rounded-full flex place-content-center items-center'
            }`}
            key={sector.id}
          >
            <li className='font-semibold text-[14px]' id='sectorId'>
              {sector.id + 1}
            </li>
          </button>
        ))}

        {/* Next Page */}
        <button
          className={`${
            paginationSection === paginationArray.at(-1)
              ? 'disabled text-[14px] text-[#74737371]'
              : 'text-[14px]'
          }`}
          onClick={
            paginationSection === paginationArray.at(-1) ? null : nextPage
          }
          disabled={paginationSection === paginationArray.at(-1)}
          name='nextPage'
        >
          Next Page
        </button>
        {/* Next Page */}
      </ul>
    </div>
  )
}

export default pagination