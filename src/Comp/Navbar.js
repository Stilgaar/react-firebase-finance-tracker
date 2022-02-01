import styles from './Navbar.module.css'
import { Link } from "react-router-dom"
import useLogout from '../Hooks/useLogout';
import useAuthContext from '../Hooks/useAuthContext';

function Navbar() {

    const { logout } = useLogout()
    const { user } = useAuthContext()

    return (
        <nav className={styles.navbar}>
            <ul>
                <li className={styles.title}> L'Oseille</li>

                {!user && (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/signup">Signup</Link></li>
                    </>
                )}

                {user && (
                    <>
                        <li>Salut, {user.displayName}</li>
                        <li>
                            <button className="btn" onClick={logout}>Logout</button>
                        </li>
                    </>
                )}

            </ul>

        </nav>
    );
}

export default Navbar;