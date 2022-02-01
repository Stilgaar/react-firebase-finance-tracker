import { useReducer, useEffect, useState } from "react";
import { projectFirestore, timestamp } from "../Firebase/config";

let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null,
}

const firestoreReducer = (state, action) => {
    switch (action.type) {
        case "IS_PENDING":
            return { isPending: true, document: null, success: false, error: null }
        case "ADDED_DOC":
            return { isPending: false, document: action.payload, success: true, error: null }
        case "DELETED_DOC":
            return { isPending: false, document: null, success: true, error: null }
        case "ERROR":
            return { isPending: false, document: null, success: false, error: action.payload }
        default:
            return state
    }
}

export const useFirestore = (collection) => {

    const [response, dispatch] = useReducer(firestoreReducer, initialState)
    const [isCancelled, setIsCancelled] = useState(false)

    // collection
    const ref = projectFirestore.collection(collection)

    // dispatch seulement si !isCancelled
    const dispatchIfNotCancelled = (action) => {
        if (!isCancelled) {
            dispatch(action)
        }
    }

    // rajouter un document
    const addDocument = async (doc) => {
        dispatch({ type: "IS_PENDING" })

        try {
            const createdAt = timestamp.fromDate(new Date())
            const adddedDocument = await ref.add({ ...doc, createdAt })
            dispatchIfNotCancelled({ type: "ADDED_DOC", payload: adddedDocument })
        }
        catch (err) {
            dispatchIfNotCancelled({ type: "ERROR", payload: err.message })
        }
    }

    // supprimimer un document
    const deleteDocument = async (id) => {
        dispatch({ type: "IS_PENDING" })

        try {
            await ref.doc(id).delete()
            dispatchIfNotCancelled({ type: "DELETED_DOC" })

        }
        catch (err) {
            dispatchIfNotCancelled({ type: 'ERROR', payload: "Impossible de supprimer" })
        }

    }

    //cleanup fonction 
    useEffect(() => { return () => setIsCancelled(true) }, [])


    return { addDocument, deleteDocument, response }

}