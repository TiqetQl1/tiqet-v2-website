import { BetEventLi } from "./BetEventLi";

const BetEvents = () => {

    return <section>
        <ul>
            <BetEventLi event_id={1}/>
            <BetEventLi event_id={0}/>
        </ul>
    </section>
}

export default BetEvents