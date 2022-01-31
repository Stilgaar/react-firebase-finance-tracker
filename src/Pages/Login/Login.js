import styles from './Login.module.css'
import { useState } from 'react';
import { useLogin } from '../../Hooks/useLogin';

function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, error, isPending } = useLogin()

    const handleSumbit = (e) => {
        e.preventDefault()
        login(email, password)
    }

    return (

        <form onSubmit={handleSumbit}
            className={styles['login-form']}>
            <h2>Login</h2>

            <label>
                <span>Email</span>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </label>

            <label>
                <span>Password</span>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>


            {isPending ? <button className='btn' disabled> Loading ... </button> :
                <button className='btn'>Login</button>
            }

            {error && <p>{error}</p>}

        </form>
    );
}

export default Login;