import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import { WagmiProvider } from 'wagmi'
import { wagmiConfig } from './utils/wagmiConfig'
// Components
import Layout   from './Components/Layout'
import Proposal from './Components/Proposal'
import Landing  from './Components/Landing'
import Lottery  from './Components/Lottery'
import Bet      from './Components/Bet'

const queryClient = new QueryClient()

function App() {

  return (
    <WagmiProvider config={wagmiConfig}>
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Landing />}></Route>
        <Route path='proposal'>
          <Route index                element={<Proposal />}></Route>
          <Route path=':proposal_id'  element={<Proposal />}></Route>
        </Route>
        <Route path='lottery/:address?' element={<Lottery />}></Route>
        <Route path='event/:event_id'  element={<Bet />}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
    </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App
