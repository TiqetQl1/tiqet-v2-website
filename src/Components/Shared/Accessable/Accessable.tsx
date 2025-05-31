import { AccessLevelContext } from "@/utils/Contexts/accessLevelContext"
import { useContext, type FC, type ReactNode } from "react"
import { Navigate } from "react-router"
import { useDisconnect } from "wagmi"

type AccessableProps = {
    children?: ReactNode,
    required?: number, 
    redirect?: boolean,
    logout?: boolean,
}

const Accessable : FC<AccessableProps> = ({
    children,
    required = 4, 
    redirect = false,
    logout = false,
}) => {
    const accessLevel = useContext(AccessLevelContext)
    const { disconnect } = useDisconnect()

    if (accessLevel?.level && accessLevel.level>=required) {
        return <>{children}</>
    }

    if (logout) {
        disconnect()
    }

    if (redirect) {
        return <Navigate to="/wallet" />;
    }
    
    return null
}

export default Accessable