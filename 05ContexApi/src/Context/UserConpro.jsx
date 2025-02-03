import { useState } from "react";
import UserContext from "./UserContext";





const UserConPro = ({children}) =>{
    const [user, setuser] = useState("")
    return (
        <UserContext.Provider value={{user , setuser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserConPro;

//  lets make a function called provider of some context
// initialize all required variable that nee to pass to some component
// return varaible as value 
