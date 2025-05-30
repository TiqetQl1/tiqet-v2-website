/// <reference types="vite-plugin-svgr/client" />
import EditSvg from "@/assets/material-theme/icons/singles/edit.svg?react";

import { Link } from "react-router"
import styles from "./Proposals.module.scss"

const Proposals = () => {
    return <main className={styles.proposals}>
        <section>
            <h2>
                Event proposals
            </h2>
            <ul>
                <li>
                    hi
                </li>
            </ul>
        </section>
        <button className={styles.FAB}>
            <Link to="./new">
                <EditSvg/>
            </Link>
        </button>
    </main>
}

export default Proposals