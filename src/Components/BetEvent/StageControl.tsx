import type { ReturnType } from "@/hooks/useEvent"
import { useRef, useState, type FC } from "react"
import styles from "./BetEvent.module.scss"
import { simulateContract, writeContract } from "@wagmi/core"
import { wagmiConfig } from "@/utils/wagmiConfig"
import { coreAbi, coreAddress } from "@/utils/Contracts/core"

type StageControlProps = {
    betEvent: ReturnType
}

type Actions = "eventResolve"|"eventDisq"|"eventTogglePause"

const StageControl 
    : FC<StageControlProps>
    = ({betEvent}) =>{

    const [isBusy, setIsBusy] 
        = useState<boolean>(false)
    const [busyText, setBusyText] 
        = useState<string>("")
    const [fn, setFn] =  
        useState<Actions>("eventTogglePause")
    const updateFn = (val: string) => {
        let func : Actions ;
        switch (val) {
            case "eventResolve":
                func = "eventResolve"
                break;
            case "eventDisq":
                func = "eventDisq"
                break;
            default:
                func = "eventTogglePause"
                break;
        }
        setFn(func)
    }
    const [winner, setWinner] =  
        useState<number>(0)
    const descRef = useRef<HTMLInputElement>
        (document.createElement("input"))

    const handle = async () => {
        await setBusyText("Please wait")
        await setIsBusy(true)
        try {
            await setBusyText(`Running ${fn}`)
            const { request } = await simulateContract(wagmiConfig,{
                address: coreAddress,
                abi: coreAbi,
                functionName: fn,
                args: fn==="eventResolve"
                    ? [
                        BigInt(betEvent.data.id),
                        BigInt(winner),
                        descRef.current.value
                    ]
                    : [
                        BigInt(betEvent.data.id),
                        descRef.current.value
                    ]
            })
            // console.log("sending")
            const _hash = await writeContract(wagmiConfig, request)
            
        } catch  (_err) {
            console.error(_err)
            await setBusyText("Failed")
            setTimeout(()=>setIsBusy(false), 5000)
            return
        }
        await setBusyText("Done !")
        setTimeout(()=>{setIsBusy(false)}, 5000)
    }

    return <section className={styles.stageControl}>
        <div>
            <select onChange={e=>updateFn(e.target.value)}>
                <option selected value="eventTogglePause">(Un)Pause</option>
                <option value="eventDisq">Disqualify</option>
                <option value="eventResolve">Resolve</option>
            </select>
            <button disabled={isBusy} onClick={handle}>
                {isBusy?busyText:fn}
            </button>
        </div>
        <div>
            <div className={styles.input}>
                <label 
                    htmlFor="stage-control-desc">
                    Reason/Description
                </label>
                <input 
                    type="text" 
                    name="stage-control-desc" 
                    id="stage-control-desc"
                    ref={descRef} />
            </div>
            <div 
                style={{display:fn==="eventResolve"?"":"none"}}
                className={styles.input}>
                <label 
                    htmlFor="stage-control-winner">
                    Winner outcome
                </label>
                <select 
                    id="stage-control-winner"
                    onChange={e=>setWinner(Number(e.currentTarget.value))}>
                    {
                        betEvent.info.options.map((option,i)=><option
                            selected={i===0}
                            value={option.id}>
                                {option.title}
                        </option>)
                    }
                </select>
            </div>
        </div>
    </section>
}

export default StageControl