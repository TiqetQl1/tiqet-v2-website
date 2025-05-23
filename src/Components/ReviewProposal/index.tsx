import { Link, useParams } from "react-router"

const Bet = () => {
    
    const { proposal_id } = useParams()
    
    return <div>
        Event
        <div>event_id : {proposal_id}</div>
        <Link to="/">{"<-"}</Link>
    </div>
}

export default Bet