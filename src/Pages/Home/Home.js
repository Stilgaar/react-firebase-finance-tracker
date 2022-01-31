import styles from './Home.module.css'

function Home() {
    return (
        <div className={styles.container}>
            <div className={styles.content}>Transaction List</div>
            <div className={styles.sidebar}></div>

        </div>
    );
}

export default Home;