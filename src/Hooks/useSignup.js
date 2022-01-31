import { useEffect, useState } from "react"
import { projetAuth } from "../Firebase/config"
import { useAuthContext } from "./useAuthContext"

export const useSignup = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const signup = async (email, password, displayName) => {

        setError(null)
        setIsPending(true)

        try {
            // engeristrer un nouvel user
            const res = await projetAuth.createUserWithEmailAndPassword(email, password)

            if (!res) {
                throw new Error("Signup Loupé ?")
            }

            // add l'username (displayName)
            await res.user.updateProfile({ displayName })

            // dispatch login action
            dispatch({ type: "LOGIN", payload: res.user })

            // update state
            if (!isCancelled) {
                setIsPending(false)
                setError(null)
            }

        } catch (err) {
            if (!isCancelled) {
                console.log(err.message)
                setError(err.message)
                setIsPending(false)
            }
        }
    }
    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { error, isPending, signup }
}