import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import { BrowserRouter, Routes } from 'react-router'
import { WagmiProvider } from 'wagmi'
import { wagmiConfig } from './utils/wagmiConfig'

const queryClient = new QueryClient()

function App() {

  return (
    <WagmiProvider config={wagmiConfig}>
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <Routes>

    </Routes>
    </BrowserRouter>
    </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App
