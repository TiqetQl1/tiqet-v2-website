import type { FC } from "react"
import styles from "./Lottery.module.scss"

type LotteryProps = {
    lottery_id: number
}

const Lottery 
    : FC<LotteryProps>
    = ({lottery_id}) => {
    return <li>
        og
    </li>
}

export const LotterySkeleton : FC = () => {
    return <li>
        sk
    </li>
}

export default Lottery