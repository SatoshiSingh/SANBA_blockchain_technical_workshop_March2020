# SANBA blockchain technical workshop 28 March 2020
*Webinar intro to cryptocurrencies/blockchains and smart contracts/dApps*


## Notes

This repo contains topics and code examples covered in the SANBA online technical blockchain workshop on the 28th of March 2020. Shown in the videos are the Solidity smart contract examples created in [Remix IDE](remix.ethereum.org).

At the time of the webinar, a bug emerged in the dApp presentation which could not be solved. This bug involved different behaviour patterns in the dApp depending on which Web3 provider address was selected in Metamask. A possible reason may be the environment setup.

## Required Installations

[Ganache-cli](https://truffleframework.com/ganache)

[Truffle](https://truffleframework.com/truffle)

[Metamask](https://metamask.io/)

[Chrome](https://www.google.com/chrome/)

## Suggested installations

[VS Code](https://code.visualstudio.com/) with the Solidity extension by Juan Blanco


## Deployment process

- Clone either the **Micropayments_webinar_example** (presented during webinar) or **Micropayments_with_trycatch** (syntax corrections) project.

- Run ```npm install``` in the project folder terminal to install dependencies

- Start Ganache

- In Metamask, add custom rpc -> Localhost 7545, http://localhost:7545/

- Import seed phrase (or mnemonic) from Ganache into Metamask

- In project terminal, run ```truffle migrate --reset``` to deploy to local blockchain (Ganache)

- In project terminal, run ```npm run dev``` to start a local server
