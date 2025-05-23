import { Link, useParams } from "react-router"

const Lottery = () => {
    
    const { address } = useParams()

    return <div>
        Lottery
        <div>address : {address ? address : 'not set'}</div>
        <Link to="/">{"<-"}</Link>
    </div>
}

export default Lottery