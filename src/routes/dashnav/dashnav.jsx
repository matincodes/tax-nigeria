import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import Logo from '../../assets/img/tax-logo.svg'
import { navData } from '../../data/navData'
import Notification from '../../assets/img/notification.svg'
import ProfilePicture from '../../assets/img/face_placeholder.png'
import DropDown from '../../assets/img/arrow-drop-down-line.svg'
import { useAuth } from '../../context/AuthContext'
import { useState } from 'react'

const DashNav = () => {
  const location = useLocation()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const [dropdown, setDropdown] = useState(false)

  const toggleDropdown = e => {
    e.preventDefault()
    setDropdown(!dropdown)
  }

  const isNavActive = path => {
    const currentpage = location.pathname.split('/').slice(-1)[0]

    const navpath = path.split('/').slice(-1)[0]

    return currentpage === navpath
  }

  const filteredNavData = navData.filter(item =>
    item.visible.includes(user?.role),
  )

  return (
    <div className='flex'>
      <div className='flex flex-col flex-start h-screen bg-tax-gray w-[16%] fixed z-[100]'>
        <a href='/dashboard' className='px-10 py-12'>
          <img src={Logo} alt='Logo' />
        </a>
        <div className='pl-10 overflow-y-scroll'>
          <ul className='flex flex-col gap-3 font-manrope'>
            {filteredNavData.slice(0, -2).map((items, index) => (
              <li key={items.label.replace(/\s+/g, '_')}>
                <Link
                  className={`py-3 pl-2 w-[90%] rounded-md flex items-center ${
                    isNavActive(items.path) ? 'bg-tax-lime' : 'bg-none'
                  }`}
                  to={items.path}
                >
                  <img src={items.icon} alt={items.label} />
                  <p className='ml-3 pr-2 text-base text-text-gray'>
                    {items.label}
                  </p>
                  {items.subsection ? (
                    <img
                      src={DropDown}
                      alt='Drop Down'
                      style={{
                        transform: dropdown ? 'rotate(0deg)' : 'rotate(180deg)',
                        translate: 'transform 0.3s ease-out',
                      }}
                      onClick={toggleDropdown}
                    />
                  ) : (
                    ''
                  )}
                </Link>
                {dropdown && (
                  <ul
                    key={`${items.label.replace(/\s+/g, '_')}${(
                      Math.random() * 100
                    ).toFixed(0)}-dropdown`}
                  >
                    {items.subsection?.map((subitem, index) => (
                      <li
                        key={subitem.label.replace(/\s+/g, '_')}
                        className={`py-3 pl-2 w-[90%] rounded-md ${
                          isNavActive(subitem.path) ? 'bg-tax-lime' : 'bg-none'
                        }`}
                      >
                        <Link to={subitem.path} className='flex items-center'>
                          <img src={subitem.icon} alt={subitem.label} />
                          <p className='ml-3 text-base text-text-gray'>
                            {subitem.label}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <ul className='py-10'>
            {navData.slice(-2).map((items, index) =>
              items.label === 'Logout' ? (
                <li
                  key={index}
                  className={`py-3 pl-2 w-[90%] rounded-md cursor-pointer ${
                    isNavActive(items.path) ? 'bg-tax-lime' : 'bg-none'
                  }`}
                  onClick={logout}
                >
                  <div className='flex items-center'>
                    <img src={items.icon} alt={items.label} />
                    <p
                      className={`ml-3 text-base ${
                        items.label === 'Logout'
                          ? 'text-[#A65959]'
                          : 'text-text-gray'
                      }`}
                    >
                      {items.label}
                    </p>
                  </div>
                </li>
              ) : (
                <li
                  key={index}
                  className={`py-3 pl-2 w-[90%] rounded-md ${
                    isNavActive(items.path) ? 'bg-tax-lime' : 'bg-none'
                  }`}
                >
                  <Link to={items.path} className='flex items-center'>
                    <img src={items.icon} alt={items.label} />
                    <p
                      className={`ml-3 text-base ${
                        items.label === 'Logout'
                          ? 'text-[#A65959]'
                          : 'text-text-gray'
                      }`}
                    >
                      {items.label}
                    </p>
                  </Link>
                </li>
              ),
            )}
          </ul>
        </div>
      </div>
      <div className='w-full h-screen ml-[16%]'>
        <div className='flex justify-end items-center mr-10 mt-5'>
          <div className='relative mr-5'>
            <img src={Notification} alt='' />
            <span className='absolute right-0 top-0'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='10'
                height='10'
                viewBox='0 0 10 10'
                fill='none'
              >
                <circle cx='5' cy='5' r='4.5' fill='#534FEB' stroke='white' />
              </svg>
            </span>
          </div>
          <div
            className='flex justify-center items-center cursor-pointer'
            onClick={() =>
              navigate(
                `/dashboard/${
                  user.role.toLowerCase() === 'consultant'
                    ? `consultant-profile/${user.email}`
                    : user.role.toLowerCase() === 'agent'
                    ? `agent-profile/${user.email}`
                    : ''
                }`,
              )
            }
          >
            <div className='w-[40px] '>
              <img
                src={ProfilePicture}
                alt=''
                className='w-[100%] rounded-full'
              />
            </div>
            <div className='ml-2 flex flex-col font-manrope'>
              <h4 className='font-medium capitalize'>
                {user?.name.split(' ')[0]}
              </h4>
              <p className='text-gray-400 capitalize'>{user?.role}</p>
            </div>
          </div>
        </div>

        <Outlet />
      </div>
    </div>
  )
}

export default DashNav
