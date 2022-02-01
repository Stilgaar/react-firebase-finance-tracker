import { useEffect, useState, useRef } from "react";
import { projectFirestore } from "../Firebase/config";

const useCollection = (collection, _query, _orderBy) => {
    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)

    // on mets le query dans un useRef pour pas qu'il soit réévalué à chaque changement quand on le spread.
    // sinon le useEffect ferait une boucle infinie
    // parce que _query est un array et est différent à chaque appel de la fonction. 
    const query = useRef(_query).current
    const orderBy = useRef(_orderBy).current

    useEffect(() => {

        let ref = projectFirestore.collection(collection)

        if (query) {
            ref = ref.where(...query)
        }
        if (orderBy) {
            ref = ref.orderBy(...orderBy)
        }

        const unsub = ref.onSnapshot((snapshot) => {
            let results = []
            snapshot.docs.forEach(doc => {
                results.push({ ...doc.data(), id: doc.id })
            })

            // states
            setDocuments(results)
            setError(null)
        }, (err) => {
            console.log(err)
            setError('Impossible de récupérer les données')
        })

        // cleanup (unsub quand on unmount le composant)
        return () => unsub()

    }, [collection, query, orderBy])

    return { documents, error }

}

export default useCollection;