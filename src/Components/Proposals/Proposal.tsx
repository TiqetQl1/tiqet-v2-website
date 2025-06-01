/// <reference types="vite-plugin-svgr/client" />
import SearchSVG from "@/assets/material-theme/icons/singles/search.svg?react";
import CheckSVG from "@/assets/material-theme/icons/singles/check.svg?react";
import CloseSVg from "@/assets/material-theme/icons/singles/close.svg?react";

import { createElement, useState, type FC, type ReactNode } from "react"
import Skeleton from "react-loading-skeleton"
import { useProposal } from "@/hooks/useProposal";
import Modal from "../Shared/Modal/Modal";
import { useNavigate } from "react-router";
import { simulateContract, writeContract } from "@wagmi/core";
import { wagmiConfig } from "@/utils/wagmiConfig";
import { coreAbi, coreAddress } from "@/utils/Contracts/core";

type ProposalProps = {
    proposal_id: number
}

const Proposal : FC<ProposalProps> = ({proposal_id}) => {

    const propose = useProposal(proposal_id)
    const navigate = useNavigate()

    const [currentModal, setCurrentModal]
        = useState<ReactNode>(null)

    const reject = async () => {
        const { request } = await simulateContract(wagmiConfig,{
            address: coreAddress,
            abi: coreAbi,
            functionName: "eventReject",
            args: [
                BigInt(proposal_id),
                "No reason string provided",
            ]
        })
        // console.log("sending")
        const _hash = await writeContract(wagmiConfig, request)
    }

    const accept = () => {
        navigate(`/proposal/${proposal_id}/review`)
    }

    const States = [
        {
            id: 0,
            title: "Review",
            icon: SearchSVG,
            onClick: () => {
                setCurrentModal(<footer style={{justifyContent:"space-between"}}>
                    <button onClick={()=>{setCurrentModal(null)}}>
                        Close
                    </button>
                    <div style={{
                        display: "flex",
                        flex: "0 0 auto"
                    }}>
                        <button onClick={()=>{reject()}}>
                            Reject
                        </button>
                        <button onClick={()=>{accept()}}>
                            Accept
                        </button>
                    </div>
                </footer>)
            }
        },
        {
            id: 1,
            title: "Rejected",
            icon: CloseSVg,
            onClick: () => {
                setCurrentModal(<footer>
                    <button onClick={()=>{setCurrentModal(null)}}>
                        Close
                    </button>
                </footer>)
            }
        },
        {
            id: 2,
            title: "Accepted",
            icon: CheckSVG,
            onClick: () => {
                setCurrentModal(<footer>
                    <button onClick={()=>{setCurrentModal(null)}}>
                        Close
                    </button>
                </footer>)
            }
        },
    ]

    return <li>
        <button onClick={States[propose.data.state].onClick}>
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
        {
            currentModal === null ? ''
            : <Modal closeModal={()=>{setCurrentModal(null)}}>
                <h2>
                    {propose.info.title}
                </h2>
                <section>
                    <p>
                        {propose.info.text}
                    </p>
                </section>
                {currentModal}
            </Modal> 
        }
    </li>
}

export default Proposal