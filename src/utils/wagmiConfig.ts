import { http, createConfig } from 'wagmi'
import { hardhat, ql1 } from 'wagmi/chains'
import { injected, metaMask, safe/*, walletConnect */} from 'wagmi/connectors'
import { activeChain } from './Contracts/activeChain'

// const projectId = '<WALLETCONNECT_PROJECT_ID>'

export const wagmiConfig = createConfig({
  multiInjectedProviderDiscovery: true, 
  connectors: [
    injected(),
    // walletConnect({ projectId }),
    metaMask(),
    safe(),
  ],
  chains: [activeChain],
  transports: {
    [activeChain.id]: http()
  },
})