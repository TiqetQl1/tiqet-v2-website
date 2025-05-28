import { Outlet } from "react-router"
import Dock from "./Dock/Dock"

const Layout = () => {
    return <div>
        <Outlet />
        ^
        <Dock />
    </div>
}

export default Layout