import { useState, type FC } from "react"
import styles from "./Lottery.module.scss"
import { bigIntToFixed, formatTime } from "@/utils"
import { simulateContract, writeContract } from "@wagmi/core"
import { wagmiConfig } from "@/utils/wagmiConfig"
import { lotteryAbi, lotteryAddress } from "@/utils/Contracts/lottery"
import Progress from "../Shared/Progress/Progress"
import { zeroAddress } from "viem"

const PoolNew : FC = () => {
    
    const [busyText, setBusyText] 
        = useState<string|undefined>(undefined)
    const [args, setArgs] = useState<number[]>([
        259200,     // "end time",
        1_000_000,  // "price per ticket",
        0,          // "total tickets limit",
        0,          // "total wallets limit",
        1,          // "winners count",
        100,        // "prize per nft holder",
        6500,       // "prize per winner",
    ])

    const update = (v:number, i:number)=>{
        setArgs(prev=>{
            prev[i] = v;
            return [...prev]
        })
    }

    const create = async () => {
        await setBusyText("Please wait")
        try {
            args[0] += Math.floor(Date.now()/1000)
            const args_bigint = args.map(v=>BigInt(v))
            await setBusyText("Calling contract")
            const { request } = await simulateContract(wagmiConfig,{
                address: lotteryAddress,
                abi: lotteryAbi,
                functionName: "poolNew",
                args: [
                    zeroAddress,
                    args_bigint[0],
                    args_bigint[1],
                    args_bigint[2],
                    args_bigint[3],
                    args_bigint[4],
                    args_bigint[5],
                    args_bigint[6],
                ]
            })
            const _hash = await writeContract(wagmiConfig, request)
            await setBusyText("Done !")
        } catch (error) {
            await setBusyText("Failed")
            console.error(error)
            // alert(error)
        }
        setTimeout(()=>{setBusyText(undefined)},5000)
    }

    const timee = formatTime(args[0])

    return <><details className={styles.newPool}>
        <summary>
            Create New Pool
        </summary>
        <div key={`pool-input-0`}>
            <label htmlFor={`pool-new-0`}>
                Ends in {`${timee.days} Days, ${timee.hours} Hours, ${timee.minutes} Minutes`}
            </label>
            <input 
                disabled={busyText != undefined}
                onChange={(e)=>update(Number(e.currentTarget.value)||0, 0)}
                type="number"
                min={0} 
                step={1800}
                name={`pool-new-0`}
                defaultValue={args[0]} 
                id={`pool-new-0`} />
        </div>
        <div key={`pool-input-1`}>
            <label htmlFor={`pool-new-1`}>
                {bigIntToFixed(args[1], 6)} $ Per ticket
            </label>
            <input 
                disabled={busyText != undefined}
                onChange={(e)=>update(Number(e.currentTarget.value)||0, 1)}
                type="number"
                min={1} 
                name={`pool-new-1`}
                defaultValue={args[1]} 
                id={`pool-new-1`} />
        </div>
        <div key={`pool-input-2`}>
            <label htmlFor={`pool-new-2`}>
                Total tickets limit : {args[2]>0 ? args[2] : "Unlimited" }
            </label>
            <input 
                disabled={busyText != undefined}
                onChange={(e)=>update(Number(e.currentTarget.value)||0, 2)}
                type="number"
                min={0} 
                name={`pool-new-2`}
                defaultValue={args[2]} 
                id={`pool-new-2`} />
        </div>
        <div key={`pool-input-3`}>
            <label htmlFor={`pool-new-3`}>
                Total tickets limit : {args[3]>0 ? args[3] : "Unlimited" }
            </label>
            <input 
                disabled={busyText != undefined}
                onChange={(e)=>update(Number(e.currentTarget.value)||0, 3)}
                type="number"
                min={0} 
                name={`pool-new-3`}
                defaultValue={args[3]} 
                id={`pool-new-3`} />
        </div>
        <div key={`pool-input-4`}>
            <label htmlFor={`pool-new-4`}>
                Winners count : {args[4]}
            </label>
            <input 
                disabled={busyText != undefined}
                onChange={(e)=>update(Number(e.currentTarget.value)||1, 4)}
                type="number"
                min={1} 
                name={`pool-new-4`}
                defaultValue={args[4]} 
                id={`pool-new-4`} />
        </div>
        <div key={`pool-input-5`}>
            <label htmlFor={`pool-new-5`}>
                Prize per nft holder : {args[5]/100}%
            </label>
            <input 
                disabled={busyText != undefined}
                onChange={(e)=>update(Number(e.currentTarget.value)||1, 5)}
                type="number"
                min={1} 
                max={10_000}
                name={`pool-new-5`}
                defaultValue={args[5]} 
                id={`pool-new-5`} />
        </div>
        <div key={`pool-input-6`}>
            <label htmlFor={`pool-new-6`}>
                Prize per winner : {args[6]/100}%
            </label>
            <input 
                disabled={busyText != undefined}
                onChange={(e)=>update(Number(e.currentTarget.value)||1, 6)}
                type="number"
                min={1} 
                max={10_000}
                name={`pool-new-6`}
                defaultValue={args[6]} 
                id={`pool-new-6`} />
        </div>
        <button onClick={create} disabled={!!busyText}>
            {!!busyText ? <><Progress/> {busyText}</> : "Create"}
        </button>
    </details>
    <h2>&nbsp;</h2>
    <h2>
        Active Pools
    </h2>
    </>
}

export default PoolNew