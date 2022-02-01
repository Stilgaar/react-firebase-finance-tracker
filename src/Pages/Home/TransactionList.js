import styles from './Home.module.css'
import { useFirestore } from '../../Hooks/useFirestore';

function TransactionList({ transactions }) {

    const { deleteDocument } = useFirestore('transaction')

    return (

        <ul className={styles.transactions}>
            <h2>Liste des Transactions</h2>
            {transactions.map(transaction => (
                <li key={transaction.id} >
                    <p className={styles.name}>{transaction.name}</p>
                    <p className={styles.amount}>{transaction.amount}</p>
                    <button onClick={() => deleteDocument(transaction.id)}>x</button>
                </li>
            ))}

        </ul>
    );
}

export default TransactionList;