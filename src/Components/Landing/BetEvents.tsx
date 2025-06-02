import { useEffect, useState } from "react";
import { BetEventLi, BetEventLiSkeleton } from "./BetEventLi";
import { useReadContract } from "wagmi";
import { coreAbi, coreAddress } from "@/utils/Contracts/core";
import { activeChain } from "@/utils/Contracts/activeChain";
import { wagmiConfig } from "@/utils/wagmiConfig";
import Skeleton from "react-loading-skeleton";

const BetEvents = () => {

    const [onPage, setOnPage] = useState<number>(0)

    const { data : _eventsLength, status } 
        = useReadContract({
            abi: coreAbi,
            chainId: activeChain.id,
            config: wagmiConfig,
            address: coreAddress,
            functionName: "clientEventsLength",
    })

    const eventsLength = 
        _eventsLength === undefined
            ? undefined : Number(_eventsLength)

    const loadMore = (count: number= 5) => {
        setOnPage(prev=>Math.min(eventsLength||0, prev+count))
    }

    useEffect(()=>{
        if (status == "success" && _eventsLength!==undefined) {
            loadMore()
        }
    },[status])

    return <section>
        <ul>
            {
                (
                    eventsLength == undefined
                )
                ? Array.from({length: 6}).map((_v,i)=><BetEventLiSkeleton key={`proposal_skeleton_${i}`}/>)
                : ((eventsLength==0)
                    ? <li>
                        There are no events yet
                    </li>
                    : Array.from({length: onPage})
                        .map((_v:any,i:number)=><BetEventLi 
                            event_id={eventsLength-1-i}
                            key={`event_id_${eventsLength-1-i}`} 
                            />)
                )
            }
        </ul>
        <footer>
            {
                eventsLength == undefined
                ? <Skeleton />
                : <>
                {/* <span>
                    {`Displaying ${onPage}/${eventsLength}`}
                </span> */}
                <button
                    onClick={()=>{loadMore()}}
                    disabled={eventsLength==onPage}
                    >
                    Load more
                </button>
                </>
            }
            
        </footer>
    </section>
}

export default BetEvents