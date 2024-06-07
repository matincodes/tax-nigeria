import Button from '../button/button'
import Search from '../search/search'
import Inventories from '../dashboard/inventories/inventories'

import { taskCardData } from '../../data/taxCardData'
import Cloud from '../../assets/img/download-cloud-02.svg'
import Filter from '../../assets/img/filter-lines.svg'
import DataTable from '../data-table/data-table'

const TaskCardManagement = () => {
  return (
    <div className='p-2 px-4'>
      <Search />

      <div className='flex justify-between mt-5'>
        <h2 className='font-semibold text-xl'>Task Card Management</h2>
        <div className='flex gap-2'>
          <button className='h-10 px-4 py-2.5 bg-white rounded-lg justify-center items-center gap-2 inline-flex'>
            <img src={Filter} alt='filters' className='w-5 h-5 relative' />
            <span className='text-slate-700 text-sm font-medium'>Filters</span>
          </button>
          <button className='h-10 px-4 py-2.5 bg-white rounded-lg border border-gray-300 justify-center items-center gap-2 inline-flex'>
            <img src={Cloud} alt='export' className='w-5 h-5 relative' />
            <span className='text-slate-700 text-sm font-medium'>Export</span>
          </button>
          <Button text='Issue Card' icon='+' iconposition='left' />
        </div>
      </div>

      <div className='flex mt-5 gap-3'>
        {taskCardData.map((task, index) => (
          <Inventories
            key={index}
            title={task.title}
            metric={task.numbers}
            image={task.imageSrc}
          />
        ))}
      </div>

      <DataTable />
    </div>
  )
}

export default TaskCardManagement
