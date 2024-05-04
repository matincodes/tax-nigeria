import vector from "../../assets/img/vector.png"
import arrow from "../../assets/img/arrow.png"
import qrcode from "../../assets/img/qrcode.png"
import house from "../../assets/img/houzz.png"
import esty from "../../assets/img/esty.png"
import ikea from "../../assets/img/ikea.png"
import timeless from "../../assets/img/timeless.png"
export function Hero() {
    return (
        <>
        <div className="text-sm sm:text-base w-full bg-[#0C0E40] text-white flex items-center xl:items-start gap-8 h-fit xl:h-[600px] px-4 sm:px-10 xl:px-0 xl:pl-10 py-8 sm:py-10 ">
              <div className="w-full xl:w-[65%] flex flex-col xl:items-start items-center gap-y-8 sm:gap-y-10">
              <h2 className="text-xl md:text-[30px] lg:text-4xl xl:text-7xl font-semibold relative">
                    <span>Taxing Made Easy with Nigeria Tax System</span>
                    <img  src={vector} className="absolute w-[70px] md:w-[150px] xl:w-fit right-[30%] top-2" alt=""  />
                    </h2>

                    <div className="flex items-start justify-start gap-x-4">
                        <img src={qrcode} alt=""/>
                        <div className="flex flex-col items-center justify-center">
                            <p className="max-w-[150px] flex flex-wrap items-start justify-start text-sm">Scan QR code to downloadthe  NTS app</p>
                            <img src={arrow} alt="" />

                        </div>

                    </div>

                    <div className="flex flex-col items-start justify-start gap-y-2">
                        <p className="">Trusted by fast-growing businesses</p>
                        <div className="flex items-center gap-x-4">
                            <p className="font-medium">As seen on</p>
                            <div className="flex items-center gap-x-2 sm:gap-x-3">
                                <img src={ikea} alt="" />
                                <img src={esty} alt="" />
                                <img src={house} alt="" />
                            </div>
                        </div>
                    </div>

              </div>

              <div className="hidden xl:block xl:w-[35%]">
                    <div className="w-full h-full bg-gray-300/20 pl-12">
                        <img src={timeless} alt="" className="w-full h-full " />

                    </div>
              </div>
        </div>
        </>
    )
}