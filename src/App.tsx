import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Layout from './Components/Layout/Layout'
import Landing from './Components/Landing/Landing'
import Auth from './Components/Auth/Auth'
import Proposals from './Components/Proposals/Proposals'
import ProposalNew from './Components/ProposalNew/ProposalNew'
import ProposalReview from './Components/ProposalReview/ProposalReview'
import Lottery from './Components/Lottery/Lottery'
import BetEvent from './Components/BetEvent/BetEvent'


function App() {

  return (
        <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path='wallet' element={<Auth />}/>
        <Route path='lottery' element={<Lottery />}/>
        <Route path='event/:event_id' element={<BetEvent />}/>
        <Route path='proposal'>
          <Route index         element={<Proposals />}/>
          <Route path='new'    element={<ProposalNew />}/>
          <Route path=':proposal_id/review' element={<ProposalReview />} />
        </Route>
        <Route path="*" element={<div>404</div>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
