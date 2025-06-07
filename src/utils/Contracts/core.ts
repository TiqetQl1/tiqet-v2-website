export const coreAddress 
    : `0x${string}` 
    = `0x${"809d550fca64d94Bd9F66E60752A544199cfAC3D"}`

export const coreAbi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "token",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "qusdt",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "event_id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "enum BetUtils.EventState",
				"name": "state",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "state_text",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "description",
				"type": "string"
			}
		],
		"name": "EventChanged",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "proposal_id",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "creator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "metas",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "fee_paid",
				"type": "uint256"
			}
		],
		"name": "EventProposed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "proposal_id",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "event_id",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "bool",
				"name": "accepted",
				"type": "bool"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "metas",
				"type": "string"
			}
		],
		"name": "EventReviewed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "from",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "to",
				"type": "uint256"
			}
		],
		"name": "FeeChanged",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "event_id",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "wager_id",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "wallet",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "option",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "stake",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "prize",
				"type": "uint256"
			}
		],
		"name": "WagerMade",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "_admins",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "_events",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "proposal_id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "creator",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "options_count",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "max_per_one_bet",
				"type": "uint256"
			},
			{
				"internalType": "int128",
				"name": "k",
				"type": "int128"
			},
			{
				"internalType": "uint256",
				"name": "handle",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "winner",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "vig",
				"type": "uint256"
			},
			{
				"internalType": "enum BetUtils.EventState",
				"name": "state",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "_events_metas",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "metas",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "_nftList",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "_owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "_proposal_fee",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "_proposals",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "creator",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "fee_paid",
				"type": "uint256"
			},
			{
				"internalType": "enum BetUtils.ProposalState",
				"name": "state",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "_proposers",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "_treasury_qusdt",
		"outputs": [
			{
				"internalType": "contract ERC20",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "_treasury_token",
		"outputs": [
			{
				"internalType": "contract ERC20",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "_treasury_withdraw_threshold",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "_wagers",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "event_id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "option",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "stake",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "prize",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "is_paid",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operand",
				"type": "address"
			}
		],
		"name": "authAdminAdd",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operand",
				"type": "address"
			}
		],
		"name": "authAdminRem",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operand",
				"type": "address"
			}
		],
		"name": "authNftAdd",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operand",
				"type": "address"
			}
		],
		"name": "authNftRem",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			}
		],
		"name": "authOwnershipTransfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operand",
				"type": "address"
			}
		],
		"name": "authProposerAdd",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operand",
				"type": "address"
			}
		],
		"name": "authProposerRem",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "check",
				"type": "address"
			}
		],
		"name": "authWhoami",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "check",
				"type": "address"
			}
		],
		"name": "auth_is_admin",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "check",
				"type": "address"
			}
		],
		"name": "auth_is_nftholder",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "check",
				"type": "address"
			}
		],
		"name": "auth_is_owner",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "check",
				"type": "address"
			}
		],
		"name": "auth_is_proposer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "event_id",
				"type": "uint256"
			}
		],
		"name": "clientEventGet",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "proposal_id",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "creator",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "options_count",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "max_per_one_bet",
						"type": "uint256"
					},
					{
						"internalType": "uint256[]",
						"name": "chance",
						"type": "uint256[]"
					},
					{
						"internalType": "uint256[]",
						"name": "odd",
						"type": "uint256[]"
					},
					{
						"internalType": "uint256",
						"name": "handle",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "winner",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "vig",
						"type": "uint256"
					},
					{
						"internalType": "enum BetUtils.EventState",
						"name": "state",
						"type": "uint8"
					}
				],
				"internalType": "struct Core.ClientEvent",
				"name": "details",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "clientEventsLength",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "clientProposalsLength",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "event_id",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "addr",
				"type": "address"
			}
		],
		"name": "clientWagersLength",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount_in_qusdt",
				"type": "uint256"
			}
		],
		"name": "configProposalFee",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "proposal_id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "max_per_one_bet",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "fake_liq_per_option",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "options_count",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "vig",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "metas",
				"type": "string"
			}
		],
		"name": "eventAccept",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "event_id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			}
		],
		"name": "eventDisq",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "metas",
				"type": "string"
			}
		],
		"name": "eventPropose",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "proposal_id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			}
		],
		"name": "eventReject",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "event_id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "winner",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			}
		],
		"name": "eventResolve",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "event_id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			}
		],
		"name": "eventTogglePause",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "treasuryFund",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "treasuryQUSDTWithdraw",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "treasuryTokenWithdraw",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "event_id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "wager_id",
				"type": "uint256"
			}
		],
		"name": "wagerClaim",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "event_id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "option",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "stake",
				"type": "uint256"
			}
		],
		"name": "wagerPlace",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "event_id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "wager_id",
				"type": "uint256"
			}
		],
		"name": "wagerRefund",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
] as const