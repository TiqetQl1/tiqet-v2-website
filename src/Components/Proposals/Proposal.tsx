/// <reference types="vite-plugin-svgr/client" />
import SearchSVG from "@/assets/material-theme/icons/singles/search.svg?react";
import CheckSVG from "@/assets/material-theme/icons/singles/check.svg?react";
import CloseSVg from "@/assets/material-theme/icons/singles/close.svg?react";

import { createElement, type FC } from "react"
import Skeleton from "react-loading-skeleton"
import { useProposal } from "@/hooks/useProposal";

type ProposalProps = {
    proposal_id: number
}

const Proposal : FC<ProposalProps> = ({proposal_id}) => {

    const propose = useProposal(proposal_id)

    const States = [
        {
            id: 0,
            title: "Review",
            icon: SearchSVG,
            onClick: () => {}
        },
        {
            id: 1,
            title: "Rejected",
            icon: CloseSVg,
            onClick: () => {}
        },
        {
            id: 2,
            title: "Accepted",
            icon: CheckSVG,
            onClick: () => {}
        },
    ]

    return <li>
        <div>
            <button>
                {
                    propose.status == "pending"
                    ? <Skeleton />
                    : createElement(States[propose.data.state].icon)
                }
            </button>
            <dl>
                <dt>
                    {
                        propose.isLoading ? <Skeleton/>
                        : <div>{propose.info?.title}</div>
                    }
                </dt>
                <dd>
                    {
                        propose.isLoading ? <Skeleton count={2}/>
                        : <div>{propose.info?.text.slice(0, 80)}{(propose.info?.text.length||0)>30?"...":""}</div>
                    }
                </dd>
            </dl>
        </div>
    </li>
}

export default Proposal