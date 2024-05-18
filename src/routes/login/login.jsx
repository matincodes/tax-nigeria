import LoginBG from "../../assets/img/login-bg.png"

const Login = () => {
    return ( 
        <div className="flex">
            <div className="w-[40%] h-screen">
                <img className="object-fill w-full h-full" src={LoginBG} alt="Login Background" />
            </div>
            <div className="w-[60%] flex flex-col justify-center items-center">
                <h2 className="text-xl font-montserrat font-semi">Login to your Account</h2>
                <form className="">
                    <div className="flex flex-col">
                        <label>Email</label>
                        <input type="text" placeholder="youremai@gmail.com" className="border border-tax-blue py-2 px-4 placeholder:text-gray-100"/>
                    </div>
                </form>
            </div>
        </div>
     );
}
 
export default Login;