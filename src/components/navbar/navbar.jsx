import { Link } from "react-router-dom";

const TopNav = () => {
  return (
    <nav className="w-full px-4 sm:px-6 py-3 inset-x-0 top-0 sticky sm:py-4 flex items-center justify-between bg-[#0C0E40] text-gray-50">
      <div>
        <p className="text-start text-[18px]">Nigeria</p>
        <p className="text-start text-[15px]">Tax System</p>
      </div>
      <ul className="hidden text-sm sm:text-base font-medium md:flex items-center gap-x-3 ">
        <li>
          <Link to="">Supports</Link>
        </li>
        <li>
          <Link to="">FaQs</Link>
        </li>
      </ul>

      <div className="">
        <Link to="">
          <img src="https://teesas.com/assets/matric/images/g-btn.png" alt="" />
        </Link>
      </div>
    </nav>
  );
};

export default TopNav;
