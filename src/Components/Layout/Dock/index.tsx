/// <reference types="vite-plugin-svgr/client" />
import SvgTiqet from "@/assets/brand/TiQet.svg?react"
import styles from "./Dock.module.css"

const Dock = () => {
    return <aside className={styles.dock+" glass"}>
        <div>
            <div>
                {/* Logo (Home button) */}
                <SvgTiqet className={styles.item}/>
            </div>
            <div>
                {/* Proposal */}
                {/* Lottery */}
                {/* Soft divider */}
                {/* Wallet */}
            </div>
        </div>
    </aside>
}

export default Dock