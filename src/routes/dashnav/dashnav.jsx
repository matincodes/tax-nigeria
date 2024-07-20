import { Link, Outlet, useLocation } from "react-router-dom";
import Logo from "../../assets/img/tax-logo.svg";
import { navData } from "../../data/navData";
import Notification  from "../../assets/img/notification.svg";
import ProfilePicture from "../../assets/img/profile-pic.png";
import DropDown from "../../assets/img/arrow-drop-down-line.svg"
import { useAuth } from "../../context/AuthContext";
const DashNav = () => {
  const location = useLocation();

  const { user } = useAuth();
  const isNavActive = (path) => {
    const currentpage = location.pathname.split("/").slice(-1)[0];

    const navpath = path.split("/").slice(-1)[0];

        return currentpage === navpath
    }

    const filteredNavData = navData.filter(item => item.label !== "Consultant")

    return ( 
        <div className="flex">
            <div className="flex flex-col flex-start h-screen bg-tax-gray w-[16%] fixed">
                <div className="px-10 py-12">
                    <img src={Logo} alt="Logo" />
                </div>
                <div className="pl-10">
                    <ul className="flex flex-col gap-3 font-manrope">
                        {
                            (user.role === "admin" ? navData : filteredNavData).slice(0, -2).map((items, index) => (
                                <li key={index} className={`py-3 pl-2 w-[90%] rounded-md ${isNavActive(items.path) ? "bg-tax-lime" : "bg-none"}`}>
                                    <Link to={items.path} className="flex items-center">
                                        <img src={items.icon} alt={items.label} />
                                        <p className="ml-3 pr-2 text-base text-text-gray">
                                            {items.label}
                                        </p>
                                        {items.subsection ?  <img src={DropDown} alt="Drop Down"/> : ""} 
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                    <ul className="pt-10">
                        {
                            navData.slice(-2).map((items, index) =>(
                                <li key={index} className={`py-3 pl-2 w-[90%] rounded-md ${isNavActive(items.path) ? "bg-tax-lime" : "bg-none"}`}>
                                    <Link to={items.path} className="flex items-center">
                                        <img src={items.icon} alt={items.label} />
                                        <p className={`ml-3 text-base ${items.label === "Logout" ? "text-[#A65959]" : "text-text-gray"}`} >
                                            {items.label}
                                        </p> 
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
            <div className="w-full h-screen ml-[16%]">
                <div className="flex justify-end items-center mr-10 mt-5">
                    <div className="relative mr-5">
                        <img src={Notification} alt="" />
                        <span className="absolute right-0 top-0">
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                                <circle cx="5" cy="5" r="4.5" fill="#534FEB" stroke="white"/>
                            </svg>
                        </span>
                    </div>
                    <div className="flex justify-center items-center">
                        <div className="w-full">
                            <img src={ProfilePicture} alt="" className="w-[100%]"/>
                        </div>
                        <div className="ml-2 flex flex-col font-manrope">
                            <h4 className="font-medium">{user.name.split(" ")[0]}</h4>
                            <p className="text-gray-400">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
                        </div>
                    </div> 
                </div>
                 
                <Outlet/>       
            </div>
        </div>
     );
}
 
export default DashNav;
