import {createContext, useContext, useState} from "react";
import { loginData } from "../data/loginData";


const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    // const {name, email, password, role} = loginData;
    const [user, setUser] = useState({role : "", name: ""})
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = (loginEmail, loginPassword) =>  {
        const findUser = loginData.find(user => user.email === loginEmail && user.password === loginPassword)
        

        if (findUser){
            setUser(findUser)
            setIsAuthenticated(true)
            return true;
        }else{
            return false;
        }

    }

    const  logout = () => {
        setUser({role: "", name: ""})
        setIsAuthenticated(false); 
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout, user}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)