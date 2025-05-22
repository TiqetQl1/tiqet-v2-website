import { http, createConfig } from 'wagmi'
import { ql1 } from 'wagmi/chains'
import { injected, metaMask, safe/*, walletConnect */} from 'wagmi/connectors'

// const projectId = '<WALLETCONNECT_PROJECT_ID>'

export const wagmiConfig = createConfig({
  chains: [ql1],
  multiInjectedProviderDiscovery: true, 
  connectors: [
    injected(),
    // walletConnect({ projectId }),
    metaMask(),
    safe(),
  ],
  transports: {
    [ql1.id]: http(),
  },
})