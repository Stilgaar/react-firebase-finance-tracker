import { useState, useEffect } from "react"
import { projetAuth } from "../Firebase/config"
import useAuthContext from "./useAuthContext"

const useLogout = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const logout = async () => {
        setError(null)
        setIsPending(true)

        // sign user out

        try {
            await projetAuth.signOut()

            // dispatch logout action
            dispatch({ type: "LOGOUT" })

            if (!isCancelled) {
                setError(null)
                setIsPending(false)
            }
        }
        catch (err) {
            if (isCancelled) {
                console.log(err)
                setError(null)
                setIsPending(false)
            }
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { logout, error, isPending }

}

export default useLogout;