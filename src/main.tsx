import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { wagmiConfig } from './utils/wagmiConfig'
import './index.css'
import "./assets/fonts/quicksand/quicksand.css"
import App from './App.tsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <WagmiProvider config={wagmiConfig}>
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
  </WagmiProvider>
  // </StrictMode>,
)
