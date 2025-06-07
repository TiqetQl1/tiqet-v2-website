import { useEffect, useState, type FC } from "react"
import { Pool, PoolSkeleton } from "./Pool"
import styles from "./Lottery.module.scss"
import { useReadContract } from "wagmi"
import { wagmiConfig } from "@/utils/wagmiConfig"
import { lotteryAbi, lotteryAddress } from "@/utils/Contracts/lottery"
import { activeChain } from "@/utils/Contracts/activeChain"
import Skeleton from "react-loading-skeleton"

const Lotteries = () => {

    const [onPage, setOnPage] = useState<number>(0)

    const { data : _poolsLength, status } 
        = useReadContract({
            abi: lotteryAbi,
            chainId: activeChain.id,
            config: wagmiConfig,
            address: lotteryAddress,
            functionName: "poolCount",
    })

    const poolsLength = 
        _poolsLength === undefined
            ? undefined : Number(_poolsLength)

    const loadMore = (count: number= 5) => {
        setOnPage(prev=>Math.min(poolsLength||0, prev+count))
    }

    useEffect(()=>{
        if (status == "success" && _poolsLength!==undefined) {
            loadMore()
        }
    },[status])

    return <main className={styles.lotteries}>
        <ul>
        {
            (
                poolsLength == undefined
            )
            ? Array.from({length: 6}).map((_v,i)=><PoolSkeleton key={`pool_skeleton_${i}`}/>)
            : ((poolsLength==0)
                ? <li>
                    There are no lotteries yet
                </li>
                : Array.from({length: onPage})
                    .map((_v:any,i:number)=><Lottery 
                        lottery_id={poolsLength-1-i}
                        key={`event_id_${poolsLength-1-i}`} 
                        />)
            )
        }
        </ul>
        <footer>
            {
                poolsLength == undefined
                ? <Skeleton />
                : <>
                {/* <span>
                    {`Displaying ${onPage}/${eventsLength}`}
                </span> */}
                <button
                    onClick={()=>{loadMore()}}
                    disabled={poolsLength==onPage}
                    >
                    Load more
                </button>
                </>
            }
        </footer>
    </main>
}

type LotteryProps = {
    lottery_id: number
}

const Lottery 
    : FC<LotteryProps>
    = ({lottery_id}) => {

    const {data: laddress, status: laddress_status} 
        = useReadContract({
            config: wagmiConfig,
            address: lotteryAddress,
            abi: lotteryAbi,
            functionName: "pools",
            args: [BigInt(lottery_id)],
            chainId: activeChain.id,
            query:{
                refetchOnReconnect: 'always',
                refetchOnMount: 'always',
                // notifyOnChangeProps: 'all'
            }})

    if (laddress_status !== "success"){
        return <PoolSkeleton />
    }
        
    return <Pool laddress={laddress} />
}

export default Lotteries