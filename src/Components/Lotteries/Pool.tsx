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
import { truncateAddress } from "@/utils"
import Accessable from "../Shared/Accessable/Accessable"
import { lotteryAbi, lotteryAddress } from "@/utils/Contracts/lottery"
import { qusdtAddress } from "@/utils/Contracts/qusdt"
import useERC20 from "@/hooks/useERC20"
import Modal from "../Shared/Modal/Modal"

type PoolProps = {
    laddress: Address
}

export const Pool
    : FC<PoolProps>
    = ({laddress}) => {

    const pool = usePool(laddress)
    const [isModalUp, setIsModalUp] = useState<boolean>(false)
    const [myCount, setMyCount] = useState<number>(0)

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
    useEffect(()=>{refetchMyCount()},[])
    
    const qusdt = useERC20(qusdtAddress)
    const buy = async (amount: number =1) => {
        const real_amount = pool.configs.ticket_price_usdt * amount
        try {
            await qusdt.approve(laddress, BigInt(real_amount))
            const { request } = await simulateContract(wagmiConfig,{
                address: laddress,
                abi: poolAbi,
                functionName: "buyTicket",
                args: [BigInt(amount)]
            })
            const _hash = await writeContract(wagmiConfig, request)
        } catch (error) {
            console.error(error)
            // alert(error)
        }
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
                                            ? pool.results.max_raised : <Skeleton />
                                    )
                                    : pool.states.raised
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
                            [1, 2, 5, 10].map((v, i)=><button onClick={()=>{buy(v)}}>
                                {i==0?"Buy ":"+"}
                                {v} <LocalSVG />
                            </button>)
                        }
                    </div>
                    :<div className={styles.footer}>
                        {pool.results.winners.map((v, i)=><p>
                            {truncateAddress(v)} has won {Math.floor(pool.results.max_raised/pool.configs.cut_share*pool.configs.cut_per_winner)}
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
                {isLoading ? "Waiting for wallet" : fns[pool.states.stage]}
            </button>
        </div>
}

export const PoolSkeleton : FC = () => {
    return <li>
        sk
    </li>
}