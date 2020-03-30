let micropaymentsInstance = null;

App = {
	loading: false,
	contracts: {},

	load: async () => {
		await App.loadWeb3();
		await App.loadAccount();
		await App.loadContract();
	},

	// https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
	loadWeb3: async () => {
		if (typeof web3 !== 'undefined') {
			App.web3Provider = web3.currentProvider;
			web3 = new Web3(web3.currentProvider);
		} else {
			window.alert('Please connect to Metamask.');
		}
		// Modern dapp browsers...
		if (window.ethereum) {
			window.web3 = new Web3(ethereum);
			try {
				// Request account access if needed
				await ethereum.enable();
				// Acccounts now exposed
				web3.eth.sendTransaction({
					/* ... */
				});
			} catch (error) {
				// User denied account access...
				console.log('Failed to enable ethereum: ', error);
			}
		}
		// Legacy dapp browsers...
		else if (window.web3) {
			App.web3Provider = web3.currentProvider;
			window.web3 = new Web3(web3.currentProvider);
			// Acccounts always exposed
			web3.eth.sendTransaction({
				/* ... */
			});
		}
		// Non-dapp browsers...
		else {
			console.log(
				'Non-Ethereum browser detected. You should consider trying MetaMask!'
			);
		}
	},

	loadAccount: async () => {
		// Set the current blockchain account
		App.account = web3.eth.accounts[0];
	},

	loadContract: async () => {
		// Create a JavaScript version of the smart contract
		const Micropayments = await $.getJSON('Micropayments.json');
		App.contracts.Micropayments = TruffleContract(Micropayments);
		App.contracts.Micropayments.setProvider(App.web3Provider);

		// Hydrate the smart contract with values from the blockchain
		micropaymentsInstance = await App.contracts.Micropayments.deployed();
		App.render();
	},

	render: async () => {
		$("#accountAddress").html("Your Account: " + App.account);
	},

	getBalance: () => {
		micropaymentsInstance.getBalance().then((balance) => {
			$("#feedback").html("Contract balance: " + balance.toNumber());
		})
		.catch(error => {
			console.log(error)
		})
	},

	getContractee1: () => {
		micropaymentsInstance.contractee1().then((cb) => {
			$("#feedback").html(cb);
		})
		.catch(error => {
			console.log(error)
		})
	},

	getContractee2: () => {
		micropaymentsInstance.contractee2().then((cb) => {
			$("#feedback").html(cb);
		})
		.catch(error => {
			console.log(error)
		})
	},

	getBalanceContractee1: () => {
		micropaymentsInstance.balance1().then((cb) => {
			$("#feedback").html("Contractee1 balance: " + cb.toNumber());
		})
		.catch(error => {
			console.log(error)
		})
	},

	getBalanceContractee2: () => {
		micropaymentsInstance.balance2().then((cb) => {
			$("#feedback").html("Contractee2 balance: " + cb.toNumber());
		})
		.catch(error => {
			console.log(error)
		})
	},

	addContractees: async () => {
		let contractee1 = $("#Address1").val();
		let contractee2 = $("#Address2").val();

		// let result = await micropaymentsInstance.addContractees(contractee1, contractee2, {gas: 210000});
		micropaymentsInstance.addContractees(contractee1, contractee2, { gas: 210000 })
			.then((result) => {})
			.catch((error) => {
				console.log('Add Contractees failed');
			})

	},

	lockFunds: async () => {
		let funds = $("#Lock").val();

		micropaymentsInstance.lockFunds({ value: funds, gas: 210000 }).then(
			(cb) => {
				$("#feedback").html("Funds locked: " + funds);
			})
			.catch(error => {
				console.log(error);
			})
	},

	pay: async () => {
		let funds = $("#Pay").val();

		micropaymentsInstance.pay(funds, { gas: 210000 }).then(
			(cb) => {
				$("#feedback").html("Transaction recorded, " + funds + " paid");
			})
			.catch(error => {
				console.log(error);
			})
	},

	withdraw: async () => {
		micropaymentsInstance.withdraw({ gas: 210000 }).then(
			(cb) => {
				$("#feedback").html("Funds withdrawn to contractees");
			})
			.catch(error => {
				console.log(error);
			})
	}
};

$(() => {
	$(window).load(() => {
		App.load();
	});
});

