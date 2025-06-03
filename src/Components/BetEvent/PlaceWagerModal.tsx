/// <reference types="vite-plugin-svgr/client" />
import AddSVG from "@/assets/material-theme/icons/singles/add.svg?react"
import MinSVG from "@/assets/material-theme/icons/singles/minus.svg?react"

import styles from "./BetEvent.module.scss"
import Modal from "../Shared/Modal/Modal"
import { preventContextMenu } from "@/utils"
import useERC20 from "@/hooks/useERC20"
import { tokenAddress } from "@/utils/Contracts/token"
import { coreAbi, coreAddress } from "@/utils/Contracts/core"
import { simulateContract, writeContract } from "@wagmi/core"
import { wagmiConfig } from "@/utils/wagmiConfig"
import { useAccount } from "wagmi"
import type { ReturnType } from "@/hooks/useEvent"
import { useEffect, useRef, useState, type FC } from "react"
import { useNavigate } from "react-router"

const DEFAULT_VALUE = 20;

type PlaceWagerModalProps = {
    betEvent: ReturnType,
    toBet: number,
    toClose: ()=>void
}
const PlaceWagerModal
    : FC<PlaceWagerModalProps>
    = ({betEvent, toBet, toClose}) => {

    const { isConnected }
        = useAccount()
    const navigate 
        = useNavigate()
    const token 
        = useERC20(tokenAddress)
    const inputRef 
        = useRef<HTMLInputElement>(
            document.createElement("input")) 
    const [intervalId, setIntervalId]
        = useState<NodeJS.Timeout>()
    const [isBusy, setIsBusy] 
        = useState<boolean>(false)
    const [busyText, setBusyText] 
        = useState<string>("")
    const [prize, setPrize]
        = useState<number>(0)


    const updatePrize = () => setPrize(
        _prev=>Number((
            Number(inputRef.current.value)*
            betEvent.data.odd[toBet]/10000
        ).toFixed())
    )
    useEffect(updatePrize,[])

    const clearIntervalId = async ()=>{
        if (intervalId){
            clearInterval(intervalId)
            await setIntervalId(undefined)
        }
    }
    const updateValue = (diff: number) =>{
        inputRef.current.value = 
            `${Math.max(
                1,
                Math.min(
                    betEvent.data.max_per_one_bet,
                    Number(inputRef.current.value)+diff
                )
            )}`
        updatePrize()
    }
    const rollValue = async (diff: number) => {
        await clearIntervalId()
        await setIntervalId(
            setInterval(
                ()=>{updateValue(diff)}
                ,65)
            )
    }

    const place = async()=>{
        if (!isConnected){
            navigate("/wallet")
        }
        await setIsBusy(true)
        const stake = Number(inputRef.current.value)
        await setBusyText("Please wait")
        try {
            await setBusyText("Requesting allowance")
            await token.approve(coreAddress, BigInt(stake))

            await setBusyText("Placing wager")
            const { request } = await simulateContract(wagmiConfig,{
                address: coreAddress,
                abi: coreAbi,
                functionName: "wagerPlace",
                args: [
                    BigInt(betEvent.data.id),
                    BigInt(toBet),
                    BigInt(stake),
                ]
            })
            // console.log("sending")
            const _hash = await writeContract(wagmiConfig, request)
            
        } catch  (_err) {
            console.error(_err)
            await setBusyText("Failed")
            setTimeout(()=>setIsBusy(false), 3000)
            return
        }
        await setBusyText("Placed !")
        setTimeout(toClose, 3000)
    }

    return <Modal closeModal={toClose}>
        <div className={styles.placeWagerModal}>
            <h4>
                {betEvent.info.options.filter(v=>v.id===toBet)[0].title}
            </h4>
            <div className={styles.iiinput}>
                <div>
                    <button
                        onMouseDown={()=>rollValue(-1)}
                        onMouseUp={clearIntervalId}
                        onMouseLeave={clearIntervalId}
                        onContextMenu={preventContextMenu}>
                        <MinSVG />
                    </button>
                    <input 
                        type="number" 
                        defaultValue={DEFAULT_VALUE}
                        ref={inputRef}
                        onChange={updatePrize}/>
                    <button 
                        onMouseDown={()=>rollValue(+1)}
                        onMouseUp={clearIntervalId}
                        onMouseLeave={clearIntervalId}
                        onContextMenu={preventContextMenu}>
                        <AddSVG />
                    </button>
                </div>
                <div>
                    <span>
                        To win
                    </span>
                    <h5>
                        {prize}
                    </h5>
                </div>
                <div>
                    <button 
                        onClick={()=>updateValue(+10)}>
                        +10
                    </button>
                    <button 
                        onClick={()=>updateValue(+100)}>
                        +100
                    </button>
                    <button 
                        onClick={()=>updateValue(+500)}>
                        +500
                    </button>
                </div>
            </div>
            <div className={styles.footer}>
                <button 
                    disabled={isBusy} 
                    onClick={place}>
                    {
                        isBusy
                            ? busyText
                            : "Bet"
                    }
                </button>
                <button onClick={toClose}>
                    Close
                </button>
            </div>
        </div>
    </Modal>
}

export default PlaceWagerModal