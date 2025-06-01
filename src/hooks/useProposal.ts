import { activeChain } from "@/utils/Contracts/activeChain";
import { coreAbi, coreAddress } from "@/utils/Contracts/core";
import { wagmiConfig } from "@/utils/wagmiConfig";
import { useEffect, useState } from "react";
import { parseAbiItem, type Address } from "viem";
import { useReadContract } from "wagmi";
import { getPublicClient } from "wagmi/actions";

export type ProposalData ={
    proposal_id: number,
    creator: Address,
    fee_paid: number,
    state: number 
}

export type ProposalInfo = {
    title: string,
    text: string,
}

export type ReturnType = {
    status: "error" | "success" | "pending",
    data: ProposalData,
    isLoading: boolean,
    info: ProposalInfo
}

type UseProposalSignature = (
    proposal_id: number,
) => ReturnType

export const useProposal 
    : UseProposalSignature 
    = (proposal_id) => {

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [info, setInfo] = useState<ProposalInfo>()

    const {data, status} 
        = useReadContract({
            config: wagmiConfig,
            address: coreAddress,
            abi: coreAbi,
            functionName: "_proposals",
            args: [BigInt(proposal_id)],
            chainId: activeChain.id
    })

    const state = status=="success" ? data[3] : 0;

    const load = async () => {
        const key = `proposal_${proposal_id}_desc`
        if (localStorage.getItem(key) !== null) {
            try {
                // console.log(`getting ${key}`)
                const str = localStorage.getItem(key);
                const json : ProposalInfo = JSON.parse(str || '')
                await setInfo(json)
                await setIsLoading(false)

            } catch (error) {
                // console.log(`removing ${key}`)
                localStorage.removeItem(key);
            }
        }else{
            // console.log(`not found ${key}`)
            const eventStr = "event EventProposed(uint256 indexed proposal_id,address indexed creator,string metas,uint256 fee_paid)"as const
            const logs = await getPublicClient(wagmiConfig)
                .getLogs({
                    address: coreAddress,
                    event: parseAbiItem(eventStr),
                    fromBlock: BigInt(0),
                    toBlock: 'latest',
                    args:{
                        proposal_id: BigInt(proposal_id)
                    }
            })
            try {
                const log = logs[0]
                const str = log.args["metas"]
                await setInfo(JSON.parse(str||""))
                localStorage.setItem(key, str||"");
                // console.log(info)
            } catch (error) {
                await setInfo({
                    "title": "Failed",
                    "text" : ""
                })
            }
            setIsLoading(false)
        }
    }

    useEffect(()=>{
        load()
    },[])

    return {
        status,
        data:{
            proposal_id: proposal_id,
            creator: data?.[1] || `0x0`,
            fee_paid: Number(data?.[2]) || 0,
            state: state
        },
        isLoading,
        info:info||{
            title:"",
            text:""
        }
    }
}
