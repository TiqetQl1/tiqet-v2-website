/// <reference types="vite-plugin-svgr/client" />
import EditSvg from "@/assets/material-theme/icons/singles/edit.svg?react";

import { Link } from "react-router"
import styles from "./Proposals.module.scss"
import Accessable from "../Shared/Accessable/Accessable";
import { useReadContract } from "wagmi";
import { coreAbi, coreAddress } from "@/utils/Contracts/core";
import { activeChain } from "@/utils/Contracts/activeChain";
import { wagmiConfig } from "@/utils/wagmiConfig";
import { useEffect, useState } from "react";
import Proposal from "./Proposal";
import Skeleton from "react-loading-skeleton";

const Proposals = () => {

    const [onPage, setOnPage] = useState<number>(0)

    const { data : _proposalsLength, status } 
        = useReadContract({
            abi: coreAbi,
            chainId: activeChain.id,
            config: wagmiConfig,
            address: coreAddress,
            functionName: "clientGetLastProposalIndex",
            query:{
                staleTime: 15_000
            }
    })

    const proposalsLength = 
        _proposalsLength === undefined
            ? undefined : Number(_proposalsLength)

    const loadMore = (count: number= 5) => {
        setOnPage(prev=>Math.min(proposalsLength||0, prev+count))
    }

    useEffect(()=>{
        if (status == "success" && _proposalsLength!==undefined) {
            loadMore()
        }
    },[status])

    return <main className={styles.proposals}>
        <section>
            <h2>
                Event proposals
            </h2>
            <ul>
                {
                    (
                        proposalsLength == undefined
                    )
                    ? Array.from({length: 10}).map(_i=><ProposalSkeleton/>)
                    : ((proposalsLength==0)
                        ? <li><dl><dt>
                            There are no events proposed yet
                        </dt></dl></li>
                        : Array.from({length: onPage})
                            .map((_v:any,i:number)=><Proposal 
                                proposal_id={proposalsLength-1-i}
                                key={`proposal_id_${proposalsLength-1-i}`} 
                                />)
                    )
                }
            </ul>
            <footer>
                {
                    proposalsLength == undefined
                    ? <Skeleton />
                    : <>
                    {/* <span>
                        {`Displaying ${onPage}/${proposalsLength}`}
                    </span> */}
                    <button
                        onClick={()=>{loadMore()}}
                        disabled={proposalsLength==onPage}
                        >
                        Load more
                    </button>
                    </>
                }
                
            </footer>
        </section>
        <Accessable required={1}>
            <button className={styles.FAB}>
                <Link to="./new">
                    <EditSvg/>
                </Link>
            </button>
        </Accessable>
    </main>
}

const ProposalSkeleton = () => {
    return <li>
        <div>
            <button>
                <Skeleton />
            </button>
            <dl>
                <dt>
                    <Skeleton />
                </dt>
                <dd>
                    <Skeleton count={2}/>
                </dd>
            </dl>
        </div>
    </li>
}

export default Proposals