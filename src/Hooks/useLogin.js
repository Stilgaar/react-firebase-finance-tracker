import { useEffect, useState } from "react"
import { projetAuth } from "../Firebase/config"
import { useAuthContext } from "./useAuthContext"

export const useLogin = () => {

    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {

        setError(null)
        setIsPending(true)
        // sign user out
        try {
            const res = await projetAuth.signInWithEmailAndPassword(email, password)
            // dispatch logout action
            dispatch({ type: "LOGIN", payload: res.user })

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



    return { login, error, isPending }

}