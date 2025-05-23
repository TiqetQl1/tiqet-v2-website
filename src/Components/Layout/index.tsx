import { Outlet } from "react-router"
import Dock from "./Dock"
import Background from "./Background"

const Layout = () => {
    return <>
        <Background />
        Layout
        <Outlet/>
        <Dock />
    </>
}

export default Layout