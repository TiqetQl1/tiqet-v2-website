import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Layout from './Components/Layout/Layout'
import Landing from './Components/Landing/Landing'
import Auth from './Components/Auth/Auth'
import Proposals from './Components/Proposals/Proposals'
import ProposalNew from './Components/ProposalNew/ProposalNew'
import ProposalReview from './Components/ProposalReview/ProposalReview'
import Lotteries from './Components/Lotteries/Lotteries'
import BetEvent from './Components/BetEvent/BetEvent'
import { AccessLevelContext } from './utils/Contexts/accessLevelContext'
import { useAuthorization } from './hooks/useAuthorization'
import Accessable from './Components/Shared/Accessable/Accessable'


function App() {

  const accessLevel = useAuthorization()

  return (
    <AccessLevelContext.Provider value={accessLevel}>
    <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path='wallet' element={<Auth />}/>
        <Route path='lottery' element={<Lotteries />}/>
        <Route path='event/:event_id' element={<BetEvent />}/>
        <Route path='proposal'>
          <Route index element={<Proposals />}/>
            <Route path='new' element={
              <Accessable required={1} redirect>
                  <ProposalNew />
              </Accessable>
            }/>
            <Route path=':proposal_id/review' element={
              <Accessable required={3} redirect>
                  <ProposalReview />
              </Accessable>
            }/>
        </Route>
        <Route path="*" element={<div>404</div>}/>
      </Route>
    </Routes>
    </BrowserRouter>
    </AccessLevelContext.Provider>
  )
}

export default App
