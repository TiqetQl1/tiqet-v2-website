import { useParams } from "react-router"

const ProposalReview = () => {
    const {proposal_id} = useParams()

    return <div>
        ProposalReview {proposal_id}
    </div>
}

export default ProposalReview