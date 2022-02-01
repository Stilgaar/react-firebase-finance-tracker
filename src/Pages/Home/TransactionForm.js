import { useState, useEffect } from "react";
import { useFirestore } from "../../Hooks/useFirestore";

function TransactionForm({ uid }) {

    const [name, setName] = useState('')
    const [amount, setAmount] = useState('')
    const { addDocument, response } = useFirestore('transaction')


    const handleSumbit = (e) => {
        e.preventDefault()
        addDocument({
            uid,
            name,
            amount
        })
    }

    useEffect(() => {
        if (response.success) {
            setName('')
            setAmount('')
        }
    }, [response.success])

    return (
        <>
            <h3>Rajouter une transaction</h3>

            <form onSubmit={handleSumbit}>
                <label>
                    <span>Nom de la Transaction </span>
                    <input
                        type="text"
                        required
                        onChange={(e) => setName(e.target.value)}
                        value={name} />
                </label>

                <label>
                    <span>Montant (€)</span>
                    <input type="number"
                        required
                        onChange={(e) => setAmount(e.target.value)}
                        value={amount} />
                </label>

                <button>Rajouter la Transaction</button>

            </form>

        </>
    );
}

export default TransactionForm;