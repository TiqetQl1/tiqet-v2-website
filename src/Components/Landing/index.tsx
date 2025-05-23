import { Link } from "react-router"

const Landing = () => {
    return <div>
        Landing
        <div></div>
        <Link to="/event/1">event</Link>
        <div></div>
        <Link to="/proposal">proposal</Link>
        <div></div>
        <Link to="/lottery">lottery</Link>
    </div>
}

export default Landing