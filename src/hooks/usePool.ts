import { activeChain } from "@/utils/Contracts/activeChain";
import { wagmiConfig } from "@/utils/wagmiConfig";
import { type Address } from "viem";
import { useReadContract, useWatchContractEvent } from "wagmi";
import { poolAbi } from "@/utils/Contracts/pool";

export type PoolConfigs = {
    organizer: Address,
    time_end: number,
    time_start: number, 
    ticket_price_usdt: number,
    max_tickets_total: number,
    max_participants: number,
    max_tickets_of_participant: number,
    winners_count: number,
    cut_share: number,
    cut_per_nft: number,
    cut_per_winner: number
}

export type PoolStates = {
    stage: number,
    tickets_sold: number,
    buyers_count: number,
    raised: number
}

export type PoolResults = {
    nft_holders: Address[],
    winners: Address[],
    winners_codes: number[],
    max_raised: number
}

export type ReturnType = {
    configs_status: "error" | "success" | "pending",
    configs: PoolConfigs,
    states_status: "error" | "success" | "pending",
    states: PoolStates,
    states_refetch: ()=>Promise<void>,
    results_status: "error" | "success" | "pending",
    results: PoolResults
}

export type UsePoolSignature = (
    address: Address,
) => ReturnType

export const usePool
    : UsePoolSignature 
    = (address) => {

    const {data: configs, status: configs_status, refetch: _configs_refetch} 
        = useReadContract({
            config: wagmiConfig,
            address: address,
            abi: poolAbi,
            functionName: "configs",
            args: [],
            chainId: activeChain.id,
            query:{
                refetchOnReconnect: 'always',
                refetchOnMount: 'always',
                // notifyOnChangeProps: 'all'
            }})

    const {data: states, status: states_status, refetch: states_refetch} 
        = useReadContract({
            config: wagmiConfig,
            address: address,
            abi: poolAbi,
            functionName: "states",
            args: [],
            chainId: activeChain.id,
            query:{
                refetchOnReconnect: 'always',
                refetchOnMount: 'always',
                // notifyOnChangeProps: 'all'
            }})

    const {data: results, status: results_status, refetch: results_refetch} 
        = useReadContract({
            config: wagmiConfig,
            address: address,
            abi: poolAbi,
            functionName: "results",
            args: [],
            chainId: activeChain.id,
            query:{
                refetchOnReconnect: 'always',
                refetchOnMount: 'always',
                // notifyOnChangeProps: 'all'
            }})

    useWatchContractEvent({
        address: address,
        abi: poolAbi,
        eventName: "Buy",
        batch: false,
        chainId: activeChain.id,
        onLogs: (_log)=>{states_refetch()},
    })
    useWatchContractEvent({
        address: address,
        abi: poolAbi,
        eventName: "StageChanged",
        batch: false,
        chainId: activeChain.id,
        onLogs: (_log)=>{
            states_refetch()
            results_refetch()
        },
    })
    
    return {
        configs_status,
        configs: {
            organizer: configs?.organizer || `0x${"0"}`,
            time_end: Number(configs?.time_end) || 0,
            time_start: Number(configs?.time_start) || 0, 
            ticket_price_usdt: Number(configs?.ticket_price_usdt) || 0,
            max_tickets_total: Number(configs?.max_tickets_total) || 0,
            max_participants: Number(configs?.max_participants) || 0,
            max_tickets_of_participant: Number(configs?.max_tickets_of_participant) || 0,
            winners_count: Number(configs?.winners_count) || 0,
            cut_share: Number(configs?.cut_share) || 0,
            cut_per_nft: Number(configs?.cut_per_nft) || 0,
            cut_per_winner: Number(configs?.cut_per_winner) || 0
        },
        states_status,
        states: {
            stage: Number(states?.stage) || 0,
            tickets_sold: Number(states?.tickets_sold) || 0,
            buyers_count: Number(states?.buyers_count) || 0,
            raised: Number(states?.raised) || 0
        },
        states_refetch: async()=>{await states_refetch()},
        results_status,
        results: {
            nft_holders: results?.[0].map(v=>v) || [],
            winners: results?.[1].map(v=>v) || [],
            winners_codes: results?.[2].map(v=>Number(v)) || [],
            max_raised: Number(results?.[3] || 0n)
        }
    }
}