/// <reference types="vite-plugin-svgr/client" />
import HandSVG  from "@/assets/material-theme/icons/singles/front_hand.svg?react"
import StarSVG  from "@/assets/material-theme/icons/singles/star.svg?react"
import ReplySVG from "@/assets/material-theme/icons/singles/reply.svg?react"

import { simulateContract, writeContract } from "@wagmi/core"
import type { ReturnType } from "@/hooks/useEvent"
import { activeChain } from "@/utils/Contracts/activeChain"
import { coreAbi, coreAddress } from "@/utils/Contracts/core"
import { wagmiConfig } from "@/utils/wagmiConfig"
import type { FC } from "react"
import { useAccount, useReadContract, useWatchContractEvent } from "wagmi"

import styles from "./BetEvent.module.scss"
import type { Address } from "viem"
import Skeleton from "react-loading-skeleton"

type WagersProps = {
    betEvent: ReturnType
}

const Wagers 
    : FC<WagersProps> 
    = ({betEvent}) => {

    const { address } = useAccount()

    const {data: wagersLength, status, refetch} 
        = useReadContract({
            config: wagmiConfig,
            address: coreAddress,
            abi: coreAbi,
            functionName: "clientWagersLength",
            args: [
                BigInt(betEvent.data.id),
                address||`0x${0}`
            ],
            chainId: activeChain.id,
            query:{
                refetchOnReconnect: 'always',
                refetchOnMount: 'always',
                // notifyOnChangeProps: 'all'
            },
    })

    useWatchContractEvent({
        address: coreAddress,
        abi: coreAbi,
        eventName: "WagerMade",
        batch: false,
        chainId: activeChain.id,
        args: {
            event_id: BigInt(betEvent.data.id)
        },
        onLogs: (log)=>{
            console.log(log[0])
            refetch()
        },
    })
    
    return <section className={styles.wagers}>
        {
            wagersLength!==0n ? ''
            : <h4>
                You havent bet on this event yet
            </h4>
        }
        <ul>
            {
                status === "success"
                ? Array.from({length: Number(wagersLength)})
                    .map((_v, i)=> <Wager 
                        key={`event_${betEvent.data.id}_wager_${Number(wagersLength)-1-i}`}
                        betEvent={betEvent}
                        address={address||`0x${0}`}
                        wager_id={BigInt(Number(wagersLength)-1-i)}/>)
                : Array.from({length: 2})
                    .map((_v, i)=><WagerSkeleton 
                        key={`wager_s_${i}`}/>)
            }
        </ul>
    </section>
}

type WagerProps = {
    betEvent: ReturnType,
    address: Address,
    wager_id: bigint,
}
const Wager
    : FC<WagerProps>
    = ({betEvent, address, wager_id}) => {
    
    const {data: wager, status, refetch} 
        = useReadContract({
            config: wagmiConfig,
            address: coreAddress,
            abi: coreAbi,
            functionName: "_wagers",
            args: [
                BigInt(betEvent.data.id), 
                address, 
                wager_id
            ],
            chainId: activeChain.id,
            query:{
                refetchOnReconnect: 'always',
                refetchOnMount: 'always',
                // notifyOnChangeProps: 'all'
            },
    })

    if (status !== "success") {
        return <WagerSkeleton />
    }

    const onClick = async () => {
        if (betEvent.data.state < 2 || wager[4]) {
            return
        }
        //resolved
        let fn : "wagerClaim" | "wagerRefund" | undefined = undefined;
        if (
            betEvent.data.state == 2 
            && betEvent.data.winner == Number(wager[1])
        ) {
            fn = "wagerClaim"
        }
        //Disqued
        if (betEvent.data.state == 3) {
            fn = "wagerRefund"
        }
        if (fn !== undefined) {
            const { request } = await simulateContract(wagmiConfig,{
                address: coreAddress,
                abi: coreAbi,
                functionName: fn,
                args: [
                    BigInt(betEvent.data.id),
                    wager_id
                ]
            })
            // console.log("sending")
            const _hash = await writeContract(wagmiConfig, request)
        }
        await refetch()
    }

    const isDiabled = wager[4] 
        || (betEvent.data.state == 2 && (betEvent.data.winner != Number(wager[1])))

    return <li>
        <div className={styles.top}>
            <div className={styles.left}>
                <h4>
                    <span>
                        x
                    </span>
                    {(Number(wager?.[3])/Number(wager?.[2])).toFixed(2)}
                </h4>
                <h5>
                    {
                        betEvent.info.options
                            .filter(v=>v.id===Number(wager[1]||0))[0].title
                    }
                </h5>
            </div>
            <div className={styles.right}>
                <h5>
                    {wager?.[2]}
                    <span>
                        &nbsp;stake
                    </span>
                </h5>
                <h5>
                    {wager?.[3]}
                    <span>
                        &nbsp;reward
                    </span>
                </h5>
            </div>
        </div>
        {
            betEvent.data.state<2?''
            :<div className={styles.bottom}>
                <button disabled={isDiabled} onClick={onClick}>
                    {
                        wager?.[4] 
                        ? <> <HandSVG/> <span>Already collected</span> </>
                        : (betEvent.data.state==2 
                            ? (
                                betEvent.data.winner === Number(wager[1])
                                    ? <> <StarSVG /> <span> Claim reward </span> </>
                                    : <> <HandSVG /> <span> Wrong guess </span> </>
                            )
                            : <> <ReplySVG /> <span> Claim refund </span> </>
                        )
                    }
                </button>
            </div>
        }
    </li>
}

export const WagerSkeleton = () => {
    return <li className={styles.skeleton}>
        <div className={styles.top}>
            <div className={styles.left}>
                <h4>
                    <Skeleton />
                </h4>
                <h5>
                    <Skeleton />
                </h5>
            </div>
            <div className={styles.right}>
                <h5>
                    <Skeleton />
                </h5>
                <h5>
                    <Skeleton />
                </h5>
            </div>
        </div>
    </li>
}

export default Wagers