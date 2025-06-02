import type { BetEvent } from "@/Components/ProposalReview/ProposalReview";
import { activeChain } from "@/utils/Contracts/activeChain";
import { coreAbi, coreAddress } from "@/utils/Contracts/core";
import { wagmiConfig } from "@/utils/wagmiConfig";
import { useEffect, useState } from "react";
import { type Address } from "viem";
import { readContract } from "@wagmi/core";
import { useReadContract, useWatchContractEvent } from "wagmi";

export type BetData ={
    proposal_id: number,
    id: number,
    creator: Address,
    options_count: number,
    max_per_one_bet: number,
    chance: number[],
    handle: number,
    winner: number,
    vig: number,
    state: number,
}

export type BetInfo = BetEvent

export type ReturnType = {
    data_status: "error" | "success" | "pending",
    data: BetData,
    isLoadingInfo: boolean,
    info: BetInfo,
}

type UseProposalSignature = (
    event_id: number,
) => ReturnType

export const useEvent 
    : UseProposalSignature 
    = (event_id) => {

    const [isLoading, setIsLoading] 
        = useState<boolean>(true)
    const [info, setInfo] 
        = useState<BetInfo>({title: "",text: "",image: "",options: []})

    const {data, status, refetch} 
        = useReadContract({
            config: wagmiConfig,
            address: coreAddress,
            abi: coreAbi,
            functionName: "clientEventGet",
            args: [BigInt(event_id)],
            chainId: activeChain.id,
            query:{
                refetchOnReconnect: 'always',
                refetchOnMount: 'always',
                // notifyOnChangeProps: 'all'
            }
    })

    useWatchContractEvent({
        address: coreAddress,
        abi: coreAbi,
        eventName: "EventChanged",
        batch: false,
        chainId: activeChain.id,
        args: {
            event_id: BigInt(event_id)
        },
        onLogs: (log)=>{
            console.log(log[0])
            refetch()
        },
    })

    useWatchContractEvent({
        address: coreAddress,
        abi: coreAbi,
        eventName: "WagerMade",
        batch: false,
        chainId: activeChain.id,
        args: {
            event_id: BigInt(event_id)
        },
        onLogs: (log)=>{
            console.log(log[0])
            refetch()
        },
    })

    const loadInfo = async () => {
        const key = `event_${event_id}_desc`
        if (localStorage.getItem(key) !== null) {
            try {
                // console.log(`getting ${key}`)
                const str = localStorage.getItem(key);
                const json : BetInfo = JSON.parse(str || '')
                await setInfo(json)
                await setIsLoading(false)

            } catch (error) {
                // console.log(`removing ${key}`)
                localStorage.removeItem(key);
            }
        }else{
            // console.log(`not found ${key}`)
            const res = await readContract(wagmiConfig,{
                address: coreAddress,
                abi: coreAbi,
                functionName: "_events_metas",
                args: [BigInt(event_id)],
                chainId: activeChain.id
            })
            try {
                const str = res?.[1]||""
                await setInfo(JSON.parse(str))
                localStorage.setItem(key, str);
                // console.log(info)
            } catch (error) {
                await setInfo({
                    title: "Error during loading event",
                    text: "Try again",
                    image: "",
                    options: []
                })
            }
            await setInfo(prev=>{
                prev.options.sort((a, b)=> b.id-a.id)
                return {...prev}
            })
            setIsLoading(false)
        }
        filterOptions()
    }

    const filterOptions = () => {
        if (status === "success" && !isLoading) {
            setInfo(prev=>{
                const filtered = prev.options.filter((v)=>v.id<data.options_count)
                return {
                    ...prev,
                    options: filtered
                }
            })
        }
    }

    useEffect(filterOptions,[status, isLoading])

    useEffect(()=>{
        loadInfo()
    },[])

    return {
        data_status: status,
        data: {
            proposal_id: Number(data?.proposal_id||0),
            id: Number(data?.id||0),
            creator: data?.creator||`0x${"0"}`,
            options_count: Number(data?.options_count||0),
            max_per_one_bet: Number(data?.max_per_one_bet||0),
            chance: data?.chance.map(item=>Number(item))||[],
            handle: Number(data?.handle||0),
            winner: Number(data?.winner||0),
            vig: Number(data?.vig||0),
            state: Number(data?.state||0),
        },
        isLoadingInfo: isLoading,
        info: info,
    }
}
