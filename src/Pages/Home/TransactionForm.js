import { useState } from "react";

function TransactionForm() {

    const [name, setName] = useState('')
    const [amount, setAmount] = useState('')


    const handleSumbit = (e) => {
        e.preventDefault()
    }

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