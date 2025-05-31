import { hardhat, ql1 } from "viem/chains";

function getChain() {
    return hardhat
}

export const activeChain = getChain()