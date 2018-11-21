var owlABI = [
	[
		{
			"constant": true,
			"inputs": [],
			"name": "name",
			"outputs": [
				{
					"name": "",
					"type": "string"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "toAddress",
					"type": "address"
				},
				{
					"name": "tokenId",
					"type": "uint256"
				}
			],
			"name": "approve",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "totalSupply",
			"outputs": [
				{
					"name": "",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"name": "",
					"type": "uint256"
				}
			],
			"name": "tokenToWinnerMap",
			"outputs": [
				{
					"name": "",
					"type": "bool"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "fromAddress",
					"type": "address"
				},
				{
					"name": "toAddress",
					"type": "address"
				},
				{
					"name": "tokenId",
					"type": "uint256"
				}
			],
			"name": "transferFrom",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"name": "",
					"type": "uint256"
				}
			],
			"name": "stage1Winners",
			"outputs": [
				{
					"name": "WinningTeam",
					"type": "uint256"
				},
				{
					"name": "RunnerUp",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"name": "",
					"type": "uint256"
				}
			],
			"name": "ownerOfTokenMap",
			"outputs": [
				{
					"name": "",
					"type": "address"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "Stage",
					"type": "uint256"
				}
			],
			"name": "_withdrawPrize",
			"outputs": [],
			"payable": true,
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"name": "",
					"type": "uint256"
				}
			],
			"name": "tokens",
			"outputs": [
				{
					"name": "WinningTeam",
					"type": "uint256"
				},
				{
					"name": "RunnerUp",
					"type": "uint256"
				},
				{
					"name": "timeStamp",
					"type": "uint64"
				},
				{
					"name": "Stage",
					"type": "uint8"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"name": "tokenId",
					"type": "uint256"
				}
			],
			"name": "ownerOf",
			"outputs": [
				{
					"name": "ownerAddress",
					"type": "address"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "_newAdmin",
					"type": "address"
				}
			],
			"name": "setAdmin",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"name": "userAddress",
					"type": "address"
				}
			],
			"name": "balanceOf",
			"outputs": [
				{
					"name": "count",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"name": "ownerAddress",
					"type": "address"
				}
			],
			"name": "tokensOfOwner",
			"outputs": [
				{
					"name": "tokenIds",
					"type": "uint256[]"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "symbol",
			"outputs": [
				{
					"name": "",
					"type": "string"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"name": "",
					"type": "address"
				},
				{
					"name": "",
					"type": "uint256"
				}
			],
			"name": "tokensOfOwnerMap",
			"outputs": [
				{
					"name": "",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "Stage",
					"type": "uint256"
				},
				{
					"name": "winner",
					"type": "uint256"
				},
				{
					"name": "runner",
					"type": "uint256"
				}
			],
			"name": "StageResults",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "toAddress",
					"type": "address"
				},
				{
					"name": "tokenId",
					"type": "uint256"
				}
			],
			"name": "transfer",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [],
			"name": "finishedGameWithdraw",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"name": "tokenId",
					"type": "uint256"
				}
			],
			"name": "getToken",
			"outputs": [
				{
					"name": "Stage",
					"type": "uint8"
				},
				{
					"name": "WinningTeam",
					"type": "uint256"
				},
				{
					"name": "RunnerUp",
					"type": "uint256"
				},
				{
					"name": "timeStamp",
					"type": "uint64"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "deploymentTime",
			"outputs": [
				{
					"name": "",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "Stage",
					"type": "uint8"
				},
				{
					"name": "WinningTeam",
					"type": "uint256"
				},
				{
					"name": "RunnerUp",
					"type": "uint256"
				}
			],
			"name": "buildToken",
			"outputs": [],
			"payable": true,
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"name": "",
					"type": "uint256"
				}
			],
			"name": "tokensApprovedMap",
			"outputs": [
				{
					"name": "",
					"type": "address"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "adminAddress",
			"outputs": [
				{
					"name": "",
					"type": "address"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [],
			"name": "adminWithdrawBalance",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"payable": true,
			"stateMutability": "payable",
			"type": "fallback"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"name": "from",
					"type": "address"
				},
				{
					"indexed": false,
					"name": "to",
					"type": "address"
				},
				{
					"indexed": false,
					"name": "tokenId",
					"type": "uint256"
				}
			],
			"name": "LogTransfer",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"name": "owner",
					"type": "address"
				},
				{
					"indexed": false,
					"name": "approved",
					"type": "address"
				},
				{
					"indexed": false,
					"name": "tokenId",
					"type": "uint256"
				}
			],
			"name": "LogApproval",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"name": "creatorAddress",
					"type": "address"
				},
				{
					"indexed": false,
					"name": "tokenId",
					"type": "uint256"
				},
				{
					"indexed": false,
					"name": "stage",
					"type": "uint8"
				},
				{
					"indexed": false,
					"name": "Winner",
					"type": "uint256"
				},
				{
					"indexed": false,
					"name": "Runnerup",
					"type": "uint256"
				},
				{
					"indexed": false,
					"name": "timeStamp",
					"type": "uint64"
				}
			],
			"name": "LogTokenBuilt",
			"type": "event"
		}
	]