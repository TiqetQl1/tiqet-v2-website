/// <reference types="vite-plugin-svgr/client" />
import AddSVG from "@/assets/material-theme/icons/singles/add.svg?react"
import RemSVG from "@/assets/material-theme/icons/singles/close.svg?react"
import SendSvg from "@/assets/material-theme/icons/singles/send.svg?react";

import { useProposal } from "@/hooks/useProposal"
import { useParams } from "react-router"
import styles from "./ProposalReview.module.scss"
import { useEffect, useState, type FC } from "react"
import { wagmiConfig } from "@/utils/wagmiConfig";
import { simulateContract, writeContract } from "@wagmi/core";
import { coreAbi, coreAddress } from "@/utils/Contracts/core";

export type BetOption = {
    id   : number,
    title: string,
    image: string,
    text : string,
    url  : string,
}

export type BetEvent = {
    title: string,
    image: string,
    text : string,
    options: BetOption[],
}

const ProposalReview = () => {
    const {proposal_id} = useParams()
    const pid = Number(proposal_id)

    const propose = useProposal(pid)

    const [optionsCount, setOptionsCount] = useState<number>(2)
    
    const changeOptionsCount = (diff: number) => 
        setOptionsCount(prev=>Math.max(2, prev+diff))

    const [title, setTitle] = useState<string>("")
    const [image, setImage] = useState<string>("")
    const [text, setText] = useState<string>("")

    const [maxPerBet, setMaxPerBet] = useState<number>(0)
    const [fakeLiqPerOption, setFakeLiqPerOption] = useState<number>(0)
    const [vig, setVig] = useState<number>(0)

    const [options, setOptions] = useState<BetOption[]>([])

    useEffect(()=>{
        setOptions(prev=>
            prev
                .sort((a, b)=> b.id-a.id)
                .filter((v)=>v.id<optionsCount)
        )
    },[optionsCount])

    const updateHandle = (option: BetOption) => {
        setOptions(prev=>{
            let neww = prev
                .filter((v)=>v.id<optionsCount)
                .filter((v)=>v.id!=option.id)
            neww.push(option)
            return neww.sort((a, b)=> b.id-a.id)
        })
    }

    // useEffect(()=>{
    //     console.log(options)
    // },[options])

    const send = async () => {
        const metas = {
                    title,
                    image,
                    text,
                    options,
                }
        const { request } = await simulateContract(wagmiConfig,{
            address: coreAddress,
            abi: coreAbi,
            functionName: "eventAccept",
            args: [
                BigInt(pid),
                BigInt(maxPerBet),
                BigInt(fakeLiqPerOption),
                BigInt(optionsCount),
                BigInt(vig),
                JSON.stringify(metas),
            ]
        })
        console.log(metas)
        await writeContract(wagmiConfig, request)
    }

    return <main className={styles.proposalReview}>
        <h2>
            <span>
                Publish event id:{proposal_id}
            </span>
            <button onClick={send}>
                <SendSvg/> Send
            </button>
        </h2>
        <section className={styles.info}>
            <p>
                <h3>
                    Original proposal
                </h3>
                {propose.info.title}
                <br />
                {propose.info.text}
            </p>
        </section>
        <section className={styles.input}>
            <div>
                <label htmlFor="event-title">
                    Title
                </label>
                <input 
                    onChange={(e)=>setTitle(e.currentTarget.value)}
                    type="text" 
                    name="event-title" 
                    id="event-title" />
            </div>
            <div>
                <label htmlFor="event-image">
                    Image
                </label>
                <input 
                    onChange={(e)=>setImage(e.currentTarget.value)}
                    type="text" 
                    name="event-image" 
                    id="event-image" />
            </div>
            <div>
                <label htmlFor="event-text">
                    Description
                </label>
                <textarea 
                    onChange={(e)=>setText(e.currentTarget.value)}
                    name="event-text" 
                    id="event-text" />
            </div>

            <div>&nbsp;</div>
            <div>
                <label htmlFor="event-maxPerBet">
                    maxPerBet - current : {maxPerBet}
                </label>
                <input 
                    type="number"
                    onChange={(e)=>setMaxPerBet(Number(e.currentTarget.value))}
                    name="event-maxPerBet" 
                    id="event-maxPerBet" />
            </div>
            <div>
                <label htmlFor="event-fakeLiqPerOption">
                    fakeLiqPerOption - current : {fakeLiqPerOption}
                </label>
                <input 
                    type="number"
                    onChange={(e)=>setFakeLiqPerOption(Number(e.currentTarget.value))}
                    name="event-fakeLiqPerOption" 
                    id="event-fakeLiqPerOption" />
            </div>
            <div>
                <label htmlFor="event-vig">
                    vig - current : {vig/100}%
                </label>
                <input 
                    type="number"
                    onChange={(e)=>setVig(Number(e.currentTarget.value))}
                    name="event-vig" 
                    id="event-vig" />
            </div>
            <div>&nbsp;</div>
            
            <h3>
                <span>
                    Options - total {optionsCount}
                </span>
                <button onClick={()=>{changeOptionsCount(-1)}}>
                    <RemSVG />
                </button>
                <button onClick={()=>{changeOptionsCount(+1)}}>
                    <AddSVG />
                </button>
            </h3>
            <div className={styles.options}>
                {
                    Array.from({length:optionsCount})
                        .map((_v, i)=><Option 
                            key={`event-option-${i}`}
                            id={i}
                            updateFn={updateHandle}
                        />)
                }
            </div>
        </section>
    </main>
}

type OptionProps = {
    id: number,
    updateFn: (option: BetOption)=>void
}

const Option
    : FC<OptionProps>
    = ({id, updateFn}) => {    
        const [title, setTitle] = useState<string>("")
        const [image, setImage] = useState<string>("")
        const [text, setText] = useState<string>("")
        const [url, setUrl] = useState<string>("")
    
    useEffect(()=>{
        updateFn({
            id, title, image, text, url
        })
    },[title, image, text, url])

    return <div className={styles.input}>
        <div>
            <label htmlFor={`event-option-${id}-title`}>
                Title - {id+1}
            </label>
            <input 
                type="text" 
                onChange={e=>setTitle(e.currentTarget.value)}
                name={`event-option-${id}-title`}
                id={`event-option-${id}-title`} />
        </div>
        <div>
            <label htmlFor={`event-option-${id}-image`}>
                Image
            </label>
            <input 
                type="text" 
                onChange={e=>setImage(e.currentTarget.value)}
                name={`event-option-${id}-image`}
                id={`event-option-${id}-image`} />
        </div>
        <div>
            <label htmlFor={`event-option-${id}-text`}>
                Text
            </label>
            <input 
                type="text" 
                onChange={e=>setText(e.currentTarget.value)}
                name={`event-option-${id}-text`}
                id={`event-option-${id}-text`} />
        </div>
        <div>
            <label htmlFor={`event-option-${id}-url`}>
                Url
            </label>
            <input 
                type="text" 
                onChange={e=>setUrl(e.currentTarget.value)}
                name={`event-option-${id}-url`}
                id={`event-option-${id}-url`} />
        </div>
    </div>
}

export default ProposalReview