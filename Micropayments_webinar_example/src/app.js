var micropaymentsInstance = null;
var selectedShop = null;

App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',

  load: async() => {
    await App.loadWeb3()
    await App.initContract()
  },

  // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
  loadWeb3: async() => {
    if (typeof web3 !== 'undefined') {
        App.web3Provider = web3.currentProvider
        web3 = new Web3(web3.currentProvider)
    } else {
        window.alert("Please connect to Metamask.")
    }
    // Modern dapp browsers...
    if (window.ethereum) {
        window.web3 = new Web3(ethereum)
        try {
            // Request account access if needed
            await ethereum.enable()
                // Acccounts now exposed
            web3.eth.sendTransaction({ /* ... */ })
        } catch (error) {
            // User denied account access...
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        App.web3Provider = web3.currentProvider
        window.web3 = new Web3(web3.currentProvider)
            // Acccounts always exposed
        web3.eth.sendTransaction({ /* ... */ })
    }
    // Non-dapp browsers...
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  },

  initContract: async () => {
    $.getJSON("Micropayments.json", function(data) {
      // Instantiate a new truffle contract from the artifact
      var MicropaymentsArtifact = data;
      App.contracts.Micropayments = TruffleContract(MicropaymentsArtifact);
      // Connect provider to interact with contract
      App.contracts.Micropayments.setProvider(App.web3Provider);

      App.render();
    });
  },

  getBalance: () => {
    micropaymentsInstance.getBalance.call().then((balance) => {
      $("#feedback").html("Contract balance: " + balance.toNumber());
    })
  },

  getContractee1: () => {
    micropaymentsInstance.contractee1().then((cb) => {
      $("#feedback").html(cb);
    })
  },

  getContractee2: () => {
    micropaymentsInstance.contractee2().then((cb) => {
      $("#feedback").html(cb);
    })
  },

  getBalanceContractee1: () => {
    micropaymentsInstance.balance1().then((cb) => {
      $("#feedback").html("Contractee1 balance: " + cb.toNumber());
    })
  },

  getBalanceContractee2: () => {
    micropaymentsInstance.balance2().then((cb) => {
      $("#feedback").html("Contractee2 balance: " + cb.toNumber());
    })
  },

  addContractees: async() => {
    let contractee1 = $("#Address1").val();
    let contractee2 = $("#Address2").val();

    let result = await micropaymentsInstance.addContractees(contractee1, contractee2, {gas: 210000});
  },

  lockFunds: async() => {
    let funds = $("#Lock").val();
    micropaymentsInstance.lockFunds({value: funds, gas: 210000}).then((cb, err) => {
      if(err) {
        alert(err)
      }
      else {
        $("#feedback").html("Funds locked: " + funds)
      }
    });
  },

  pay: async() => {
    let funds = $("#Pay").val();
    micropaymentsInstance.pay(funds, {gas: 210000}).then((cb, err) => {
      if(err) {
        alert(err)
      }
      else {
        $("#feedback").html("Transaction recorded, " + funds + " paid")
      }
    });
  },

  withdraw: async() => {
    micropaymentsInstance.withdraw({gas: 210000}).then((cb, err) => {
      if(err) {
        alert(err)
      }
      else {
        $("#feedback").html("Funds withdrawn to contractees")
      }
    });
  },

  render: async () => {
    var loader = $("#welcomeView");
    loader.show();

    // Load account data
    web3.eth.getCoinbase(async function(err, account) {
      if (err === null) {
        App.account = account;
        if (account == null) {
          account = "No account found. Please log into Metamask or use test wallet";
        }
        $("#accountAddress").html("Your Account: " + account);
      }
    });
    micropaymentsInstance = await App.contracts.Micropayments.deployed();
  },
};

$(function() {
  $(window).load(function() {
    App.load();
  });
});