/// <reference types="vite-plugin-svgr/client" />
import ProgressIcon from "@/assets/material-theme/progress.svg?react"

import styles from "./Progress.module.scss"

const Progress = () => {
    return <ProgressIcon className={styles.loading} />
}

export default Progress