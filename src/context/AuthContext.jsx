import {createContext, useContext, useState} from "react";
import { loginData } from "../data/loginData";


const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const {email, password} = loginData;
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = (loginEmail, loginPassword) =>  {
        if (loginEmail === email && loginPassword === password){
            setIsAuthenticated(true)
            return true;
        }else{
            return false;
        }

    }

    const  logout = () => {
        setIsAuthenticated(false); 
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)