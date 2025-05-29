/// <reference types="vite-plugin-svgr/client" />
import DisconnectSVG from "@/assets/material-theme/icons/singles/account_circle_off.svg?react"
import NotOk from "@/assets/material-theme/icons/singles/close.svg?react"
import Ok from "@/assets/material-theme/icons/singles/check.svg?react"
import Person from "@/assets/material-theme/icons/singles/person.svg?react"

import { useContext, useEffect, useState, type FC } from "react"
import styles from "./Auth.module.scss"
import { useAccount, useConnect, useDisconnect, type Connector } from "wagmi"
import { truncateAddress } from "@/utils"
import { roles, type AccessLevel, type AccessLevels, type AccessLevelState } from "@/hooks/useAuthorization"
import { AccessLevelContext } from "@/utils/Contexts/accessLevelContext"
import Progress from "../Shared/Progress/Progress"

const rolesDescriptions
    : Record<AccessLevels, string>
    = {
        "owner": "Change contract configs",
        "admin": "Review proposals",
        "proposer": "Suggest new events",
        "nftholder": "Suggest new events",
        "user": "Contribute in events and lotteries"
    }

const Auth = () => {
    const { connectors, connect } = useConnect()
    const { isConnected, address, connector } = useAccount()
    const { disconnect } = useDisconnect()

    const className = styles.auth+" "+(isConnected?styles.connected_1:styles.connected_0)

    if (isConnected) return <main className={className}>
        <div className={styles.head}>
            <h2 className={styles.connect}>
                <span>
                    You are connected
                </span>
            </h2>
            <h4>
                <span>
                    with&nbsp;
                </span>
                <span>
                    {connector?.name ? connector.name : "an unknown wallet"}
                </span>
            </h4>
            <h4>
                <span>
                    as&nbsp;
                </span>
                <span>
                    {truncateAddress(address||"")}
                </span>
            </h4>
            <button onClick={()=>{disconnect()}}>
                <DisconnectSVG/>
                <span>
                    Disconnect
                </span>
            </button>
        </div>
        <section className={styles.rights}>
            <h2>
                You have access to
            </h2>
            <ul>
                {
                    roles.map(role=><Right key={`single-right-${role}`} ship={role} />)
                }
            </ul>
        </section>
    </main>

    return <main className={className}>
        <h2 className={styles.connect}>
            <span>
                Join the world of
            </span>
            <br />
            <span>
                possibilities !
            </span>
        </h2>
        <ul>
        {
            connectors.map((connector) => (
                <WalletOption
                    key={"connect-to-"+connector.uid}
                    connector={connector}
                    onClick={() => connect({ connector })}
                    />
            ))
        }
        </ul>
    </main>
}

const Right : FC<{ship: AccessLevels}> = ({ship}) => {

    const accessLevel : AccessLevel = useContext(AccessLevelContext)
    const state : AccessLevelState = accessLevel.roles[ship]

    return <li>
        <i>
            <Person />
        </i>
        <dl>
            <dt>
                {`${ship}`}
            </dt>
            <dd>
                {`${rolesDescriptions[ship]}`}
            </dd>
        </dl>
        <i>
            {
                state == "loading" ?  <Progress/> :
                (state == true ? <Ok/> : <NotOk/>)
            }
        </i>
    </li>
}

function WalletOption({
  connector,
  onClick,
}: {
  connector: Connector
  onClick: () => void
}) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    ;(async () => {
      const provider = await connector.getProvider()
      setReady(!!provider)
    })()
  }, [connector])

  return (
    <li>
        <button disabled={!ready} onClick={onClick}>
            {
                connector?.icon
                ? <img 
                    src={connector?.icon} 
                    alt={connector.name+" icon"} />
                :""
            }
            <span>
                {connector.name}
            </span>
        </button>
    </li>
  )
}

export default Auth