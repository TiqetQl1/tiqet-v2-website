/// <reference types="vite-plugin-svgr/client" />
import SendSvg from "@/assets/material-theme/icons/singles/send.svg?react";

import { useEffect, useRef, useState } from "react"
import styles from "./ProposalNew.module.scss"

import * as placeHolders from "@/utils/defaultsToCreateProposal.json";
import Progress from "../Shared/Progress/Progress";
import { simulateContract, writeContract } from "@wagmi/core";
import { wagmiConfig } from "@/utils/wagmiConfig";
import { coreAbi, coreAddress } from "@/utils/Contracts/core";
import useERC20 from "@/hooks/useERC20";
import { qusdtAddress } from "@/utils/Contracts/qusdt";
import { useAccount, useReadContract } from "wagmi";
import { activeChain } from "@/utils/Contracts/activeChain";
import { bigIntToFixed } from "@/utils";

const ProposalNew = () => {
    const { address: user } = useAccount()
    const [isSending, setIsSending] = useState<boolean>(true)
    const titleRef = useRef<HTMLInputElement>(document.createElement("input"))
    const textRef = useRef<HTMLTextAreaElement>(document.createElement("textarea"))
    const [loadingText, setLoadingText] = useState<string>("Getting fee")

    const { data: fee } = useReadContract({
        abi: coreAbi,
        chainId: activeChain.id,
        config: wagmiConfig,
        address: coreAddress,
        functionName: "_proposal_fee"
    })
    const qusdt = useERC20(qusdtAddress)

    const realFee = () => {
        if (fee == undefined || qusdt.decimals==undefined) {
            return undefined
        }
        return bigIntToFixed(fee, qusdt.decimals)
    }

    useEffect(()=>{
        if (fee == undefined && qusdt.decimals==undefined) {
            setIsSending(false)
        }
    },[fee, qusdt.decimals])

    const resetInputs = () => {
        titleRef.current.value  = ""
        textRef.current.value   = ""
    }

    const sendProposal = async () => {
        await setIsSending(true)
        await setLoadingText("Please wait")
        try {
            await setLoadingText("Requesting allowance")
            if(fee==undefined){
                await setLoadingText("fee is not fetched")
                setTimeout(()=>setIsSending(false), 3000)
                return
            }
            await qusdt.approve(coreAddress, BigInt(fee))
            await setLoadingText("Sending Proposal")
            // console.log("simulating")
            const { request } = await simulateContract(wagmiConfig,{
                address: coreAddress,
                abi: coreAbi,
                functionName: "eventPropose",
                args: [
                    JSON.stringify({
                        title: titleRef.current.value,
                        text : textRef.current.value
                    })
                ]
            })
            // console.log("sending")
            const _hash = await writeContract(wagmiConfig, request)
        } catch (_err) {
            await setLoadingText("Failed")
            setTimeout(()=>setIsSending(false), 3000)
            return
        }
        await setLoadingText("Sent")
        setTimeout(()=>setIsSending(false), 3000)
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
                    {
                        isSending 
                            ? loadingText 
                            : `Send (${realFee()==undefined?'':realFee()} ${qusdt.symbol} fee )`
                    }
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