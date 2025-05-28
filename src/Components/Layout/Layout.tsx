import { Outlet } from "react-router"
import "@/assets/material-theme/css/dark-hc.css"
import "@/assets/material-theme/css/dark-mc.css"
import "@/assets/material-theme/css/dark.css"
import "@/assets/material-theme/css/light-hc.css"
import "@/assets/material-theme/css/light-mc.css"
import "@/assets/material-theme/css/light.css"
import Dock from "./Dock/Dock"
import { useState } from "react"
import "./Layout.css"

type ThemeClasses =
    "dark-high-contrast"
    | "dark-medium-contrast"
    | "dark"
    | "light-high-contrast"
    | "light-medium-contrast"
    | "light"

const Layout = () => {
    const [activeTheme, setActiveTheme] = useState<ThemeClasses>("light")

    return <div className={"root "+activeTheme}>
        <Outlet />
        ^
        <Dock />
    </div>
}

export default Layout