import { type FC, type ReactNode } from "react"
import styles from "./Modal.module.scss"

type ModalProps = {
    children?: ReactNode,
    closeModal?: ()=>void
}

const Modal : FC<ModalProps> = ({children, closeModal=()=>{}}) => {
    return <div
        className={styles.modal}
        id="modal">
        <div onClick={closeModal} className={styles.backdrop}></div>
        {children}
    </div>
}

export default Modal