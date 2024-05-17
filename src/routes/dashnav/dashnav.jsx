import { Link } from "react-router-dom";
import Logo from "../../assets/img/tax-logo.svg";
import { navData } from "../../data/navData";
const DashNav = () => {
    return ( 
        <div className="flex flex-col h-screen bg-tax-gray w-[20%]">
            <div className="px-3 py-4">
                <img src={Logo} alt="Logo" />
            </div>
            <div className="">
                <ul className="flex flex-col gap-3">
                    {
                        navData.slice(0, -2).map((index, items) => (
                            <li key={index}>
                                <Link to={items.path} className="flex">
                                    <img src={items.icon} alt={items.label} />
                                    <p>
                                        {items.label}
                                    </p>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
     );
}
 
export default DashNav;