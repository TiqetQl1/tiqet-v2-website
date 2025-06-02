/// <reference types="vite-plugin-svgr/client" />
import BetSVG from "@/assets/material-theme/icons/singles/add.svg?react";

import type { FC } from "react"
import type { BetOption } from "../ProposalReview/ProposalReview"
import Skeleton from "react-loading-skeleton";

type OptionProps = {
    option: BetOption,
    chance: number,
    isOpen: boolean,
    onClick: ()=>void
}

export const OptionLi 
    : FC<OptionProps> 
    = ({option, chance, isOpen, onClick}) => {
        
    const real_chance = (chance/100)
    
    return <li>
        {
            option.image.length<2 
                ? ""
                : <div>
                    <img 
                        src={option.image} 
                        alt={`The ${option.title}'s option's image`} />
                </div>
        }
        <div>
            <h6>
                {option.title} - {real_chance<1 ? real_chance : real_chance.toFixed()}%
            </h6>
            {
                option.text.length<2 
                    ? ""
                    : <p>{option.text}</p>
            }
            {
                option.url.length<2 
                    ? ""
                    : <a href={option.url}>
                        ref
                    </a>
            }
            
        </div>
        <div>
            <button disabled={!isOpen} onClick={onClick}>
                <BetSVG />
            </button>
        </div>
    </li>
}

export const OptionLiSkeleton 
    : FC
    = () => {
    return <li>
        <div>
            <h6>
                <Skeleton />
            </h6>
            <p>
                <Skeleton count={2}/>
            </p>
        </div>
        <div>
            <button disabled={true}>
                <BetSVG />
            </button>
        </div>
    </li>
}