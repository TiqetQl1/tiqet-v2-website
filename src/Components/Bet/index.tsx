import { Link, useParams } from "react-router"

const Bet = () => {
    
    const { event_id } = useParams()

    return <div>
        Event
        <div>event_id : {event_id?event_id:"not set"}</div>
        <Link to="/">{"<-"}</Link>
    </div>
}

export default Bet