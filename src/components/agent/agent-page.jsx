import Button from '../button/button'
import { useNavigate } from 'react-router-dom'
import InnerTable from '../inner-table/inner-table'
import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../../context/AuthContext'

const AgentPage = () => {
  const { user } = useAuth()
  const [agentData, setAgentData] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const columns = useMemo(
    () => [
      {
        header: 'Name',
        accessorKey: 'name',
        cell: ({ row }) => (
          <div className='flex items-center gap-3'>
            {`${row.original.firstName} ${row.original.lastName}`}
          </div>
        ),
      },
      {
        header: 'Email Address',
        accessorKey: 'emailAddress',
        cell: ({ cell }) => (
          <div className='flex items-center gap-3'>{cell.getValue()}</div>
        ),
      },
      {
        header: 'Address',
        accessorKey: 'address',
        cell: ({ cell }) => (
          <div className='flex items-center gap-3'>{cell.getValue()}</div>
        ),
      },
      {
        header: 'Telephone',
        accessorKey: 'telephone',
        cell: ({ cell }) => (
          <div className='flex items-center gap-3'>{cell.getValue()}</div>
        ),
      },
      {
        accessorKey: 'action',
        header: () => <div className='text-right pr-7'>Action</div>,
        cell: ({row}) => (
          <div className='flex place-content-end pr-4'>
            <Button
              text='Profile'
              handleButton={e => {
                e.preventDefault()
                navigate('/dashboard/agent-profile', {
                  state: { data: row.original },
                })
              }}
            />
          </div>
        ),
      },
    ],
    [navigate],
  )

  useEffect(() => {
    async function fetchAgentData() {
      try {
        setLoading(true)
        const res = await axios.get(
          user.role === 'admin'
            ? 'https://assettrack.com.ng/api/Agent'
            : `https://assettrack.com.ng/api/Agent/AllByConsult/${user.email}`,
        )
        setAgentData(res.data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchAgentData()
  }, [user.role, user.email])

  const addNewAgent = () => {
    navigate('/dashboard/taxagent-registration')
  }

  return (
    <div className='w-full font-manrope p-[30px]'>
      {/* Top Part */}
      <div className='flex gap-6 items-center p-[10px]'>
        <b className='text-[20px] text-[#4C4C4C]'>Tax Agents</b>
        <Button
          text='Add New'
          iconposition='left'
          icon='+'
          handleButton={addNewAgent}
        />
        {/*<Button text="Export Members (CSV)"/>*/}
        <Button text='Export Members (CSV)' />
      </div>
      {/* Top Part */}

      <InnerTable data={agentData} columns={columns} loading={loading} />
    </div>
  )
}

export default AgentPage
