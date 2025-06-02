/// <reference types="vite-plugin-svgr/client" />
import LogoSVG from "@/assets/brand/TiQet.svg?react"

import styles from "./Landing.module.scss"
import BetEvents from "./BetEvents"

const Landing = () => {
    return <main className={styles.landing}>
        <div className={styles.logo}>
            <LogoSVG />
        </div>
        <BetEvents />
    </main>
}

export default Landing