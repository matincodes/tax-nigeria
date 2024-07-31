import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../button/button'
import axios from 'axios'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import ThreeDotIcon from '../../assets/img/Bussiness_Sector/three_dots.svg'
import InnerTable from '../inner-table/inner-table'

const columns = [
  {
    header: 'Business Type',
    accessorKey: 'name',
    cell: ({ cell }) => (
      <div className='flex items-center gap-3'>{cell.getValue()}</div>
    ),
  },
  {
    header: 'Business Sector',
    accessorKey: 'sector',
    cell: ({ cell }) => (
      <div className='flex items-center gap-3'>{cell.getValue()}</div>
    ),
  },
  {
    accessorKey: 'action',
    header: () => <div className='text-right pr-7'>Action</div>,
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger className='w-full outline-none flex justify-center'>
          <img src={ThreeDotIcon} alt='' />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>View</DropdownMenuItem>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]

const BusinessTypePage = () => {
  const [loading, setLoading] = useState(true)
  const [typesData, setTypesData] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        setLoading(true)
        const response = await axios.get(
          'https://assettrack.com.ng/api/businessTypes',
        )
        setTypesData(response.data)
      } catch (error) {
        console.error('Error fetching Business Sector Data')
      } finally {
        setLoading(false)
      }
    }

    fetchTypes()
  }, [])

  return (
    <div className='w-full font-manrope p-[30px]'>
      {/* Top Part */}
      <div className='flex justify-between items-center p-[10px]'>
        <b className='text-[20px] text-[#4C4C4C]'>Business Type Management</b>
        <Button
          handleButton={() => navigate('/dashboard/business/add-business-type')}
          text='Add New'
          iconposition='right'
          icon='+'
        />
      </div>
      {/* Top Part */}

      <InnerTable data={typesData} columns={columns} loading={loading} />
    </div>
  )
}

export default BusinessTypePage
