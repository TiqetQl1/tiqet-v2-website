import { http, createConfig } from 'wagmi'
import { hardhat, ql1 } from 'wagmi/chains'
import { injected, metaMask, safe/*, walletConnect */} from 'wagmi/connectors'

// const projectId = '<WALLETCONNECT_PROJECT_ID>'

export const wagmiConfig = createConfig({
  multiInjectedProviderDiscovery: true, 
  connectors: [
    injected(),
    // walletConnect({ projectId }),
    metaMask(),
    safe(),
  ],
  chains: [hardhat],
  transports: {
    [hardhat.id]: http()
  },
})