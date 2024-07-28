import Inventories from './inventories/inventories'
import { inventoryData } from '../../data/inventoryData'
import LineChart from './lineChart/line-chart.jsx'
import TaxInflow from './tax-inflow/tax-inflow'
import { AiOutlinePlus } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import TimeAndDate from '../time-and-date/time-and-date'
import { useAuth } from '../../context/AuthContext'
import { consultantInventoryData } from '../../data/consultantInventoryData'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { formatNumber } from '../../lib/formatNumber'

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const { user } = useAuth()

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true)
        switch (user.role) {
          case 'admin':
            const response = await axios.get(
              'https://assettrack.com.ng/api/DashBoard',
            )
            setDashboardData(response.data)
            break
          case 'consultant':
            const consultantResponse = await axios.get(
              `https://assettrack.com.ng/api/DashBoard/ByConsulantEmail/${user.email}`,
            )
            setDashboardData(consultantResponse.data)
            break
          default:
            break
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchDashboardData()
  }, [user.role, user.email])

  const addReg = reg => {
    navigate(`/dashboard/${reg}`)
  }

  return (
    <div className='p-4 w-full font-manrope'>
      <h2 className='font-normal font-manrope text-2xl mb-4'>
        Welcome back,{' '}
        <span className='font-semibold capitalize'>{user.name}</span> ☀️
      </h2>

      <div className='w-full grid grid-cols-4 mb-3 items-center gap-6'>
        {(user.role === 'admin' ? inventoryData : consultantInventoryData)
          .slice(0, -2)
          .map(({ title, imageSrc, accessor }, index) => (
            <Inventories
              key={index}
              title={title}
              metric={
                loading ? (
                  <p className='text-sm'>loading...</p>
                ) : (
                  formatNumber(dashboardData[accessor]) ?? 'N/A'
                )
              }
              image={imageSrc}
            />
          ))}
      </div>
      <div className='w-full grid grid-cols-12 gap-6'>
        <div className='w-full col-span-9'>
          {/** */}
          <div className='w-full grid grid-cols-5 '>
            <LineChart />
          </div>
          {/** */}
          <div className='w-full mt-3 grid grid-cols-5 gap-3 items-start'>
            <TaxInflow />
          </div>
        </div>
        {/** 2 */}
        <div className='w-full col-span-3 space-y-5'>
          {(user.role === 'admin' ? inventoryData : consultantInventoryData)
            .slice(-2)
            .map(({ title, imageSrc, accessor }, index) => (
              <Inventories
                key={index}
                title={title}
                metric={
                  loading ? (
                    <p className='text-sm'>loading...</p>
                  ) : (
                    formatNumber(dashboardData[accessor]) ?? 'N/A'
                  )
                }
                image={imageSrc}
              />
            ))}

          <div className='w-full rounded-xl space-y-5 shadow p-4 flex flex-col justify-center items-center'>
            {user.role === 'admin' && (
              <button
                className='w-[80%] text-white rounded-full gap-x-2 bg-tax-blue flex items-center justify-center px-5 py-3 my-16'
                onClick={() => addReg('taxconsultant-registration')}
              >
                <AiOutlinePlus className='text-2xl' />
                <p className='text-sm'>Add New Consultant</p>
              </button>
            )}
            {user.role === 'consultant' && (
              <button
                className='w-[80%] text-white rounded-full gap-x-2 bg-tax-blue flex items-center justify-center px-5 py-3 my-16'
                onClick={() => addReg('taxagent-registration')}
              >
                <AiOutlinePlus className='text-2xl' />
                <p className='text-sm'>Add New Agent</p>
              </button>
            )}
          </div>

          <div>
            <TimeAndDate />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

/**
 import { Route, Routes } from "react-router-dom";
import DashNav from "../../routes/dashnav/dashnav";

const Dashboard = () => {
    return ( 
        <Routes>
            <Route path="/" element={<DashNav/> } />
        </Routes>
     );
}
 
export default Dashboard;
 */
