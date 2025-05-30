/// <reference types="vite-plugin-svgr/client" />
import SendSvg from "@/assets/material-theme/icons/singles/send.svg?react";

import { useEffect, useRef, useState } from "react"
import styles from "./ProposalNew.module.scss"

import * as placeHolders from "@/utils/defaultsToCreateProposal.json";
import Progress from "../Shared/Progress/Progress";

const ProposalNew = () => {
    const [isSending, setIsSending] = useState<boolean>(false)
    const titleRef = useRef<HTMLInputElement>(document.createElement("input"))
    const textRef = useRef<HTMLTextAreaElement>(document.createElement("textarea"))

    const resetInputs = () => {
        titleRef.current.value  = ""
        textRef.current.value   = ""
    }

    const sendProposal = async () => {
        await setIsSending(prev=>!prev)

    }

    useEffect(resetInputs,[titleRef, textRef])

    return <main className={styles.p_new}>
        <header>
            <h2>
                Propose
            </h2>
            <button disabled={isSending} onClick={sendProposal}>
                {isSending ? <Progress /> : <SendSvg />}
                <span>
                    {isSending ? "Please wait" : "Send"}
                </span>
            </button>
        </header>
        <section>
            <input 
                type="text" 
                name="title" 
                id="new-proposal-title" 
                ref={titleRef} 
                placeholder={placeHolders.title}/>
            <textarea 
                name="text" 
                id="new-proposal-text" 
                ref={textRef}
                placeholder={placeHolders.text}
                onInput={(e)=>{
                    const ele = e.currentTarget;
                    ele.style.height 
                        = ele.scrollHeight + "px";
                }}
                >
            </textarea>
        </section>
    </main>
}

export default ProposalNew