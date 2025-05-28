/// <reference types="vite-plugin-svgr/client" />
import TiqetF1 from "@/assets/material-theme/icons/local_activity_filled.svg?react"
import TiqetF0 from "@/assets/material-theme/icons/local_activity_nofill.svg?react"
import CasinoF1 from "@/assets/material-theme/icons/casino_filled.svg?react"
import CasinoF0 from "@/assets/material-theme/icons/casino_nofill.svg?react"
import WalletF1 from "@/assets/material-theme/icons/account_balance_wallet_filled.svg?react"
import WalletF0 from "@/assets/material-theme/icons/account_balance_wallet_nofill.svg?react"
import MailF1 from "@/assets/material-theme/icons/mail_filled.svg?react"
import MailF0 from "@/assets/material-theme/icons/mail_nofilled.svg?react"

import { Link, useLocation } from "react-router"
import styles from "./Dock.module.scss"

const checkPath 
    : (path: string, pattern: string, exact?: boolean) => boolean
    = (path, pattern, exact = false) => {
        if (exact) {
            return path.toLowerCase() === pattern.toLowerCase()
        }
        return path.indexOf(pattern) == 1
    }

const Dock = () => {
    const location = useLocation().pathname
    console.log(location)

    return <aside className={styles.dock}>
        <nav>
            <ul>
                {[
                    {
                        title: "Betting",
                        icon0: CasinoF0,
                        icon1: CasinoF1,
                        path : "/",
                        isActive: 
                            checkPath(location, "/", true) 
                            || checkPath(location, "event")
                    },
                    {
                        title: "Lottery",
                        icon0: TiqetF0,
                        icon1: TiqetF1,
                        path : "/lottery",
                        isActive: checkPath(location, "lottery")
                    },
                    {
                        title: "Proposal",
                        icon0: MailF0,
                        icon1: MailF1,
                        path : "/proposal",
                        isActive: checkPath(location, "proposal")
                    },
                    {
                        title: "Wallet",
                        icon0: WalletF0,
                        icon1: WalletF1,
                        path : "/wallet",
                        isActive: checkPath(location, "wallet")
                    }
                ].map((item)=><li key={"nav-item-"+item.title}>
                    <Link to={item.path}>
                    <div className={item.isActive ? styles.active : ""}>
                        {
                            item.isActive
                            ? <item.icon1/>
                            : <item.icon0/>
                        }
                        <div>&nbsp;</div>
                    </div>
                    <span>
                        {item.title}
                    </span>
                    </Link>
                </li>)}
            </ul>
        </nav>
    </aside>
}

export default Dock