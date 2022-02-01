import { AuthContext } from "../Context/AuthContext";
import { useContext } from "react";

const useAuthContext = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw Error('useAuthContect doit être dans un AuthContextProvider')
    }

    return context
}

export default useAuthContext; 