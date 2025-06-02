import { useEvent } from "@/hooks/useEvent"
import { useState, type FC } from "react"
import Skeleton from "react-loading-skeleton"

import styles from "./Landing.module.scss"
import Progress from "../Shared/Progress/Progress"
import { useNavigate } from "react-router"

export type BetEventLiProps = {
    event_id:number
}
export const BetEventLi 
    :FC<BetEventLiProps> 
    = ({event_id}) => {

    const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false)

    const navigate = useNavigate()
    const betEvent = useEvent(event_id)


    if (betEvent.isLoadingInfo) {
        return <BetEventLiSkeleton />
    }
    return <li onClick={()=>{navigate(`/event/${event_id}`)}}>
        <h4>
            {betEvent.info.title}
        </h4>
        <img 
            src={betEvent.info.image} 
            alt={`The "${betEvent.info.title}"'s image`}
            onLoad={()=>{setIsImageLoaded(true)}} />
        
        {
            isImageLoaded ? ''
            :<div className={styles.imagePlaceHolder}>
                <Progress />
            </div>
        }
    </li>
}

export const BetEventLiSkeleton = () => {
    return <li>
        <h4>
            <Skeleton count={2}/>
        </h4>
        <div className={styles.imagePlaceHolder}>
            <Progress />
        </div>
    </li>
}