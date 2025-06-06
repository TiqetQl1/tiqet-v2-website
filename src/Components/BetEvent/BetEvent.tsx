import { useEvent } from "@/hooks/useEvent"
import { useState } from "react"
import { useParams } from "react-router"

import styles from "./BetEvent.module.scss"
import Progress from "../Shared/Progress/Progress"
import Skeleton from "react-loading-skeleton"
import { OptionLi, OptionLiSkeleton } from "./Option"
import PlaceWagerModal from "./PlaceWagerModal"
import Accessable from "../Shared/Accessable/Accessable"
import StageControl from "./StageControl"
import Wagers from "./Wagers"

const statesTexts = [
    "Open to bet",
    "Event is paused",
    "Winner is decided",
    "Event is disqualified",
]

const BetEvent = () => {
    const { event_id } = useParams()
    const e_id = Number(event_id) 
    
    const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false)
    const [toBet, setToBet] = useState<number>(-1)

    const betEvent = useEvent(e_id)

    return <main className={styles.betEvent}>
        <header>
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
            <div className={styles.details}>
                <h2>
                    {
                        betEvent.isLoadingInfo 
                            ? <Skeleton count={2} />
                            : betEvent.info.title
                    }
                </h2>
                <h4>
                    {
                        betEvent.data_status !== "success" 
                            ? <Skeleton />
                            : <>{betEvent.data.handle}<span>&nbsp;VoL</span></>
                    }
                </h4>
            </div>
        </header>
        {/* State */}
        <Accessable required={3}>
            <StageControl betEvent={betEvent} />
        </Accessable>
        {/* State */}
        <section className={styles.state}>
            <h4>
                {
                    betEvent.data_status !== "success" 
                        ? <Skeleton/>
                        : statesTexts[betEvent.data.state]
                }
            </h4>
            <h6>
                &nbsp;
            </h6>
        </section>
        {/* Options */}
        <section className={styles.options}>
            <h4>
                <span>
                    Outcome - Chance
                </span>
                <span>
                    Place bet
                </span>
            </h4>
            <ul>
                {
                    (betEvent.isLoadingInfo 
                    || betEvent.data_status!=="success")
                    ? Array.from({length: 
                        betEvent.data_status!=="success"
                            ?betEvent.data.options_count 
                            : 2
                    }).map((_v, i)=><OptionLiSkeleton key={`oskele_${i}`}/>)
                    : betEvent.info.options
                        .map((option, _i)=>
                            <OptionLi
                                chance={betEvent.data.chance[option.id]}
                                onClick={()=>{setToBet(option.id)}}
                                isOpen={betEvent.data.state===0}
                                option={option}
                                key={`event_${e_id}_option_${option.id}`}/>)
                }
            </ul>
        </section>
        {/* Wagers */}
        <Accessable required={0}>
            <Wagers betEvent={betEvent} />
        </Accessable>
        {/* text */}
        <section className={styles.text}>
            <p>
                {
                    betEvent.isLoadingInfo ? "" :
                    betEvent.info.text
                }
            </p>
        </section>
        {
            toBet < 0 ? ''
            : <PlaceWagerModal 
                betEvent={betEvent}
                toBet={toBet}
                toClose={()=>{setToBet(-1)}}
                />
        }
    </main>
}

export default BetEvent