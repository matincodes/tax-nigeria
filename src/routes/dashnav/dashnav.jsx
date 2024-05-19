import { Link, Outlet, useLocation } from "react-router-dom";
import Logo from "../../assets/img/tax-logo.svg";
import { navData } from "../../data/navData";
const DashNav = () => {
    const location = useLocation()
    const isNavActive = (path) => {
        const currentpage = location.pathname.split("/").slice(-1)[0]

        const navpath = path.split("/").slice(-1)[0]

        return currentpage === navpath
    }
    return ( 
        <div className="flex">
            <div className="flex flex-col flex-start h-screen bg-tax-gray w-[15%]">
                <div className="px-10 py-12">
                    <img src={Logo} alt="Logo" />
                </div>
                <div className="pl-10">
                    <ul className="flex flex-col gap-3 font-manrope">
                        {
                            navData.slice(0, -2).map((items, index) => (
                                <li key={index} className={`py-2 pl-2 w-[90%] rounded-md ${isNavActive(items.path) ? "bg-tax-lime" : "bg-none"}`}>
                                    <Link to={items.path} className="flex items-center">
                                        <img src={items.icon} alt={items.label} />
                                        <p className="ml-3 text-base">
                                            {items.label}
                                        </p>
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                    <ul>
                        {
                            navData.slice(-2).map((index, items) =>(
                                <li key={index}>
                                    <Link>

                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
            <Outlet/>
        </div>
     );
}
 
export default DashNav;