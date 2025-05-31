import { activeChain } from "@/utils/Contracts/activeChain"
import { wagmiConfig } from "@/utils/wagmiConfig"
import { erc20Abi, type Address } from "viem"
import { readContract, simulateContract, writeContract } from "@wagmi/core"
import { useReadContract } from "wagmi"
import { useState } from "react"

type ReturnType = {
    name: string|undefined,
    symbol: string|undefined,
    decimals: number|undefined,
    refresh: ()=>void,
    approve: (to: Address, amount: bigint)=>Promise<boolean>
    balanceOf: (toseek: Address)=>Promise<number>,
}

type UseERC20 = (
    address: Address
) => ReturnType

const useERC20 : UseERC20 = (address) => {
    const [_dep, setDep] = useState<boolean>(true)
    const refresh = ()=>{setDep(prev=>!prev)}

    const { data: name } = useReadContract({
        abi: erc20Abi,
        chainId: activeChain.id,
        config: wagmiConfig,
        address: address,
        functionName: "name"
    })
    const { data: symbol } = useReadContract({
        abi: erc20Abi,
        chainId: activeChain.id,
        config: wagmiConfig,
        address: address,
        functionName: "symbol"
    })
    const { data: decimals } = useReadContract({
        abi: erc20Abi,
        chainId: activeChain.id,
        config: wagmiConfig,
        address: address,
        functionName: "decimals"
    })

    const balanceOf = async (toseek: Address) => {
        if (decimals == undefined) {
            return -1
        }
        try{
            const res = await readContract(wagmiConfig,{
                abi: erc20Abi,
                chainId: activeChain.id,
                address: address,
                functionName: "balanceOf",
                args:[
                    toseek
                ]
            })
            return Number(res/BigInt(decimals))
        }catch (_err) {
            return -1
        }
    }

    const approve = async (to: Address, amount: number|bigint) => {
        try{
            // console.log("simulating approval")
            const { request } = await simulateContract(wagmiConfig,{
                abi: erc20Abi,
                chainId: activeChain.id,
                address: address,
                functionName: "approve",
                args:[
                    to,
                    BigInt(amount)
                ]
            })
            // console.log("sending approval")
            const _hash = await writeContract(wagmiConfig, request)
            return true
        }catch (_err) {
            return false
        }
    }

    return {
        name,
        symbol,
        decimals,
        refresh,
        approve,
        balanceOf,
    }
}

export default useERC20