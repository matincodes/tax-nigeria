import { useState } from "react";
import LoginBG from "../../assets/img/login-bg.png";
import EyeClose from "../../assets/img/invisible.svg";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }


    return ( 
        <div className="flex">
            <div className="w-[40%] h-screen">
                <img className="object-fill w-full h-full" src={LoginBG} alt="Login Background" />
            </div>
            <div className="w-[60%] flex flex-col justify-center items-center">
                <h2 className="text-3xl font-montserrat font-semibold mb-10 w-[50%]">Login to your Account</h2>
                <form className="w-[50%]">
                    <div className="flex flex-col">
                        <label>Email</label>
                        <input 
                         type="text" 
                         placeholder="youremai@gmail.com" 
                         className="border-2 border-tax-blue py-4 px-4 outline-none placeholder:text-gray-300"/>
                    </div>
                    <div className="flex flex-col mt-5 relative">
                        <label>Password</label>
                        <input 
                         type={showPassword ? "text" : "password"} 
                         placeholder="Enter your password" 
                         className="border-2 border-tax-blue py-4 px-4 outline-none placeholder:text-gray-300"/>
                        <span className="absolute right-3 top-1/2 translate-y-1/2 cursor-pointer" 
                         onClick={togglePasswordVisibility}>
                            <img src={EyeClose} alt="Eye Close" />
                        </span> 
                    </div>
                    <button disabled={loading} className="mt-5 bg-tax-blue w-full">
                        Login
                    </button>
                </form>
            </div>
        </div>
     );
}
 
export default Login;