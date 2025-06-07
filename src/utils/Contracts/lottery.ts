export const lotteryAddress 
    : `0x${string}` 
    = `0x${"5FbDB2315678afecb367f032d93F642f64180aa3"}`

export const lotteryAbi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "NotAuthorized",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "contract Pool",
				"name": "pool",
				"type": "address"
			}
		],
		"name": "PoolCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "contract Pool",
				"name": "pool",
				"type": "address"
			}
		],
		"name": "PoolRemoved",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "GOD",
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
		"name": "_NFT",
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
		"name": "_NFT_SUPPLY",
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
		"name": "_USDT",
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
				"internalType": "address",
				"name": "old_admin",
				"type": "address"
			}
		],
		"name": "authDemote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "toCheck",
				"type": "address"
			}
		],
		"name": "authIsAdmin",
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
				"name": "new_admin",
				"type": "address"
			}
		],
		"name": "authPromote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "ngod",
				"type": "address"
			}
		],
		"name": "authTransferGod",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "organizer",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "time_end",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "ticket_price_usdt",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "max_tickets_total",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "max_participants",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "winners_count",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "cut_per_nft",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "cut_per_winner",
				"type": "uint256"
			}
		],
		"name": "poolNew",
		"outputs": [
			{
				"internalType": "contract Pool",
				"name": "pool",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "neww",
				"type": "address"
			}
		],
		"name": "setNFT",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "neww",
				"type": "uint256"
			}
		],
		"name": "setNftSupply",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "neww",
				"type": "address"
			}
		],
		"name": "setUSDT",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdraw",
		"outputs": [
			{
				"internalType": "bool",
				"name": "status",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
] as const