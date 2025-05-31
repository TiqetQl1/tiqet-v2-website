import { wagmiConfig } from "@/utils/wagmiConfig";
import { useEffect, useState } from "react";
import { readContract } from "@wagmi/core";
import { hardhat } from "viem/chains";

import type { Abi } from 'viem';
import { coreAbi, coreAddress } from '@/utils/Contracts/core'
import { useAccount } from "wagmi";

// owner, admin, proposer, holder, user
export type AccessLevelState = "loading"|boolean
export const roles = ["owner", "admin", "proposer", "nftholder", "user"] as const;
export type AccessLevels = typeof roles[number];
export type AccessLevel = {
    roles: Record<AccessLevels, AccessLevelState>,
    level: number,
}

export const defaultAccessLevel : AccessLevel ={
    roles: {
        "owner": "loading",
        "admin": "loading",
        "proposer": "loading",
        "nftholder": "loading",
        "user": true
    },
    level: -1
}

export function useAuthorization(){
    const {isConnected, address} = useAccount()
    const [accessLevel, setAccessLevel] = useState<AccessLevel>(defaultAccessLevel)

    const check = async (ship: AccessLevels, level: number)=>{
        const res = await readContract(wagmiConfig,{
            address: coreAddress,
            abi: coreAbi as Abi,
            functionName: `auth_is_${ship}`,
            args: [address],
            chainId: hardhat.id
        })
        await setAccessLevel(prev=>{
            // console.log(ship, res)
            prev.roles[ship] = (res === true)
            if(prev.roles[ship]===true){
                // console.log(prev.roles[ship], ship, prev.level, level)
                prev.level = Math.max(level, prev.level)
            }
            // console.log(prev)
            return {
                roles: {...prev.roles},
                level: prev.level
            }
        })
    }

    const refresh = async () => {
        if (!isConnected || !address) {
            await setAccessLevel({
                roles: {...defaultAccessLevel.roles},
                level: defaultAccessLevel.level
            });
        }else{
            await setAccessLevel({
                roles: {...defaultAccessLevel.roles},
                level: 0
            });
            check("owner", 4)
            check("admin", 3)
            check("proposer", 2)
            check("nftholder", 1)
        }
    }

    useEffect(()=>{
        refresh()
    },[isConnected, address])


    return accessLevel
}