import { useEvent } from "@/hooks/useEvent"
import { useParams } from "react-router"

const BetEvent = () => {
    const { event_id } = useParams()
    const e_id = Number(event_id) 
    
    const betEvent = useEvent(e_id)

    return <main>
        BetEvent {e_id}
    </main>
}

export default BetEvent