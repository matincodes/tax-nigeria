import { useState } from "react";
import LoginBG from "../../assets/img/login-bg.png";
import EyeClose from "../../assets/img/invisible.svg";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [load, setLoad] = useState(false);


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }


    return ( 
        <div className="flex">
            <div className="w-[40%] h-screen">
                <img className="object-fill w-full h-full" src={LoginBG} alt="Login Background" />
            </div>
            <div className="w-[60%] flex flex-col justify-center items-center">
                <h2 className="text-3xl font-montserrat font-semibold mb-10 w-[45%]">Login to your account</h2>
                <form className="w-[45%] font-poppins">
                    <div className="flex flex-col">
                        <label className="font-medium">Email</label>
                        <input 
                         type="email" 
                         placeholder="youremai@gmail.com" 
                         value={email}
                         onChange={(e) => setEmail(e.target.value)}
                         className="border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300"/>
                    </div>
                    <div className="flex flex-col mt-5 relative">
                        <label className="font-medium">Password</label>
                        <input 
                         type={showPassword ? "text" : "password"} 
                         placeholder="Enter your password" 
                         value={password}
                         onChange={(e) => setPassword((e.target.value))}
                         className="border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300"/>
                        <span className="absolute right-4 top-1/2 translate-y-1/2 cursor-pointer" 
                         onClick={togglePasswordVisibility}>
                            <img src={EyeClose} alt="Eye Close" />
                        </span> 
                    </div>
                    <button disabled={load} className={`mt-10 bg-tax-blue w-full py-3 text-white rounded-md text-2xl ${load ? "": "opacity-70"}`}>
                        Login
                    </button>
                    <p className="pt-3"><span className="font-medium">Forget Password? <span className="text-tax-blue">Password recovery</span></span></p>
                </form>
            </div>
        </div>
     );
}
 
export default Login;