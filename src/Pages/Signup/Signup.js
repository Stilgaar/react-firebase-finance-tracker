import styles from './Signup.module.css'
import { useState } from 'react';
import { useSignup } from '../../Hooks/useSignup';


function Signup() {

    const [email, setEmail] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [password, setPassword] = useState('')

    const { signup, isPending, error } = useSignup()

    const handleSumbit = (e) => {
        e.preventDefault()
        signup(email, password, displayName)
    }

    return (
        <form
            className={styles['signup-form']}
            onSubmit={handleSumbit}>
            <h2>Signup</h2>

            <label>
                <span>Email</span>
                <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email} />
            </label>

            <label>
                <span>UserName</span>
                <input type="text"
                    onChange={(e) => setDisplayName(e.target.value)}
                    value={displayName} />
            </label>

            <label>
                <span>Password</span>
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password} />
            </label>

            {isPending ? <button className='btn' disabled>Loading ... </button> : <button className='btn'>Signup</button>}
            {error && <p>{error}</p>}

        </form>
    );
}

export default Signup;