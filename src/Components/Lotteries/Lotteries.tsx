import Lottery from "./Lottery"
import styles from "./Lottery.module.scss"

const Lotteries = () => {
    return <main className={styles.lotteries}>
        <h2>
            Lottery
        </h2>
        <ul>
            <Lottery lottery_id={2} />
        </ul>
    </main>
}

export default Lotteries