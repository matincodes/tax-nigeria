import ChipImage from "../../assets/img/chip.png";
import Logo from "../../assets/img/tax-logo.svg";
import YellowGradient from "../../assets/img/yellow-gradient-circle.png";
import GreenGradient from "../../assets/img/green-gradient-circle.png";

const TaxCard = () => {
  return (
    <div className="flex items-center justify-center mt-16 font-manrope">
      <div className="w-[30%] border-2 bg-gradient-to-r from-tax-lime to-gray-50 rounded-lg shadow-lg drop-shadow-md">
        <div className="flex justify-between mt-5 px-10 mb-5">
          <img className="w-14 pt-14" src={ChipImage} alt="ChipImage" />
          <img className="w-36" src={Logo} alt="Logo" />
        </div>
        <div className="flex flex-col justify-center items-center text-center pb-7">
          <p className="text-4xl font-semibold pb-2 tracking-wide">
            4000 1234 5678 9101
          </p>
          <div className="flex items-center">
            <p className="flex flex-col text-xs px-1">
              <span>Valid</span>
              <span>Thru</span>
            </p>
            <p className="text-4xl font-semibold">12/24</p>
          </div>
        </div>
        <div
          className="flex px-3 justify-between items-center
                "
        >
          <p className="text-2xl font-bold">John Doe</p>
          <div
            className="relative flex items-center
                    "
          >
            <img className="w-14 h-14" src={YellowGradient} alt="" />
            <img className="w-14 h-14 -ml-5" src={GreenGradient} alt="" />
            <p className="font-semibold text-xl font-rubik tracking-wide">
              TAX CARD
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxCard;
