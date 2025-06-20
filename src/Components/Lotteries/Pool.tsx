/// <reference types="vite-plugin-svgr/client" />
import LocalSVG from "@/assets/material-theme/icons/local_activity_nofill.svg?react"

import { useEffect, useState, type FC } from "react"
import styles from "./Lottery.module.scss"
import type { Address } from "viem"
import { useAccount } from "wagmi"
import { wagmiConfig } from "@/utils/wagmiConfig"
import { activeChain } from "@/utils/Contracts/activeChain"
import { usePool, type ReturnType } from "@/hooks/usePool"
import Skeleton from "react-loading-skeleton"
import { readContract, simulateContract, writeContract } from "@wagmi/core"
import { poolAbi } from "@/utils/Contracts/pool"
import { bigIntToFixed, truncateAddress } from "@/utils"
import Accessable from "../Shared/Accessable/Accessable"
import { qusdtAddress } from "@/utils/Contracts/qusdt"
import useERC20 from "@/hooks/useERC20"
import Modal from "../Shared/Modal/Modal"
import Progress from "../Shared/Progress/Progress"

type PoolProps = {
    laddress: Address
}

export const Pool
    : FC<PoolProps>
    = ({laddress}) => {

    const pool = usePool(laddress)
    const [isModalUp, setIsModalUp] = useState<boolean>(false)
    const [myCount, setMyCount] = useState<number>(0)
    const [buyingText, setBuyingText] = useState<string|undefined>(undefined)

    const { address: wallet } = useAccount()

    const refetchMyCount = () => {
        readContract(wagmiConfig,{
            address: laddress,
            abi: poolAbi,
            functionName: "tickets_of_participant",
            args:[
                wallet || `0x${0}`
            ],
            chainId: activeChain.id
        }).then(
            (res)=>{
                setMyCount(Number(res))
            },
            (_err)=>{
                setTimeout(refetchMyCount, 5000)
            }
        )
    }
    useEffect(()=>{refetchMyCount()},[wallet])
    
    const qusdt = useERC20(qusdtAddress)
    const buy = async (amount: number =1) => {
        await setBuyingText("Please waint")
        const real_amount = pool.configs.ticket_price_usdt * amount
        try {
            await setBuyingText("Waiting for approve")
            await qusdt.approve(laddress, BigInt(real_amount))
            await setBuyingText("Calling contract")
            const { request } = await simulateContract(wagmiConfig,{
                address: laddress,
                abi: poolAbi,
                functionName: "buyTicket",
                args: [BigInt(amount)]
            })
            const _hash = await writeContract(wagmiConfig, request)
            await setBuyingText("Done !")
        } catch (error) {
            await setBuyingText("Failed")
            console.error(error)
            // alert(error)
        }
        refetchMyCount()
        setTimeout(()=>{setBuyingText(undefined)}, 5000)
        await pool.states_refetch()
    }

    const stage : number = 
        pool.states_status !== "success" 
            ? 0
            :(
                pool.states.stage < 2 
                ? pool.states.stage+1
                : 3
            )

    const stageTexts = [
        "Loading",
        "Not started",
        "Open to join",
        "Closed"
    ]

    const per_winner_cut = Math.floor(
        pool.results.max_raised
        /pool.configs.cut_share
        *pool.configs.cut_per_winner
    )

    if (stage == 0){
        return <PoolSkeleton />
    }

    return <li>
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h5>
                        {truncateAddress(laddress)}
                    </h5>
                    <h4>
                        {stage != 0 ? stageTexts[stage] : <Skeleton/>}
                    </h4>
                </div>
                <h4>
                    {
                        stage == 0 
                            ? <Skeleton /> 
                            : (
                                stage == 3
                                    ? (
                                        pool.results_status === "success"
                                            ? bigIntToFixed(pool.results.max_raised, 6) : <Skeleton />
                                    )
                                    : bigIntToFixed(pool.states.raised, 6)
                            )
                    }$
                    <span>
                        &nbsp;in pool
                    </span>
                </h4>
            </div>
            {
            stage < 2 ? '' : <>
                <div className={styles.states}>
                    <span>
                        {pool.states.buyers_count}
                        &nbsp;Diffrent wallets
                    </span>
                    <span>
                        {myCount}
                        &nbsp;Tickets are yours
                    </span>
                </div>
                {
                    stage == 2 
                    ?<div className={styles.footer_buy}>
                        {
                            buyingText?.length
                            ? <button disabled>
                                <Progress /> {buyingText}
                            </button>
                            : [1, 2, 5, 10].map((v, i)=><button onClick={()=>{buy(v)}}>
                                {i==0?"Buy ":"+"}
                                {v} <LocalSVG />
                            </button>)
                        }
                    </div>
                    :<div className={styles.footer}>
                        {pool.results.winners.map((v, i)=><p>
                            {truncateAddress(v)} has won {bigIntToFixed(per_winner_cut, 6)}$
                        </p>)}
                        <div>
                            <button onClick={()=>{setIsModalUp(true)}}>
                                See more
                            </button>
                            {
                                !isModalUp ? ''
                                : <Modal closeModal={()=>{setIsModalUp(false)}}>
                                    <p>
                                        <p>
                                            {pool.states.buyers_count} wallets participated
                                        </p>
                                        <p>
                                            {myCount} tiqets were yours
                                        </p>
                                    </p>
                                    <section>
                                        <ul>
                                            {pool.results.nft_holders.map(v=><li>
                                                {truncateAddress(v, 6)}
                                            </li>)}
                                        </ul>
                                    </section>
                                </Modal>
                            }
                        </div>
                    </div>
                }
            </>}
            <Accessable required={4}>
                <PoolControls pool={pool} laddress={laddress} />
            </Accessable>
        </div>
    </li>
}

type PoolControlsProps = {
    pool: ReturnType,
    laddress: Address
}
const PoolControls
    : FC<PoolControlsProps> 
    = ({pool, laddress}) => {
        const fns = [
            "start", // 0
            "close", // 1
            "drawLots", // 2
            "retriveHolders", // 3
            "givePrizes", // 4
            "withdrawAllLeft", // 5
            "close", // 6
        ] as const
        type names = typeof fns[number]

        const [isLoading, setIsLoading] = useState<boolean>(false)

        const next = async () => {
            await setIsLoading(true)
            try {
                const fn : names = fns[pool.states.stage];
                const { request } = await simulateContract(wagmiConfig,{
                    address: laddress,
                    abi: poolAbi,
                    functionName: fn,
                })
                // console.log("sending")
                const _hash = await writeContract(wagmiConfig, request)
            } catch (error) {
                console.log(error)
                alert(error)
            }
            await setIsLoading(false)
        }
        
        const drop = async () => {
            return
        }

        return <div className={styles.controls}>
            {/* <button onClick={drop}>
                remove
            </button> */}
            <button disabled={isLoading} onClick={next}>
                {
                isLoading 
                    ? <>
                        <Progress/> 
                        Waiting for wallet
                    </> 
                    : <>
                        {pool.states.stage==5?"Finished - ":''}
                        {fns[pool.states.stage]}
                    </>
                }
            </button>
        </div>
}

export const PoolSkeleton : FC = () => {
    return <li>
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h5 style={{width:"100px"}}>
                        <Skeleton />
                    </h5>
                    <h4 style={{width:"160px"}}>
                        <Skeleton />
                    </h4>
                </div>
                <h4 style={{width:"100px"}}>
                    <Skeleton width={100} style={{marginBottom:4}}/>
                    <Skeleton width={40} />
                </h4>
            </div>
            <div >
                <Skeleton width={80} count={1}/>
            </div>
        </div>
    </li>
}