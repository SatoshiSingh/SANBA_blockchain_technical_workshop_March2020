# SANBA blockchain technical workshop 28 March 2020
*Webinar intro to cryptocurrencies/blockchains and smart contracts/dApps*


## Description

Code examples covered in the [SANBA](sanba.co.za) online technical blockchain workshop on 28-March-2020, presented by [@SatoshiSingh](https://twitter.com/satoshisingh) of [CoinEd](https://coined.co.za). Shown in the videos are the Solidity smart contract examples created in [Remix IDE](remix.ethereum.org).

## Required

[Ganache](https://truffleframework.com/ganache)

[Truffle](https://truffleframework.com/truffle)

[Metamask](https://metamask.io/)

[Chrome](https://www.google.com/chrome/)

## Suggested installations

[VS Code](https://code.visualstudio.com/) with the Solidity extension by Juan Blanco


## Build process

- Clone either the **Micropayments_webinar_example** (presented during webinar) or **Micropayments_with_trycatch** (syntax corrections) project.

- Run ```npm install``` in the project folder terminal to install dependencies

- Start Ganache

- In Metamask, add custom rpc -> Localhost 7545, http://localhost:7545/

- Import seed phrase (or mnemonic) from Ganache into Metamask

- In project terminal, run ```truffle migrate --reset``` to deploy to local blockchain (Ganache)

- In project terminal, run ```npm run dev``` to start a local server

## Current bugs
Different behavioural patterns in the *dApp* depending on which Web3 provider address is selected in Metamask. Suspected reason - environment setup (smart contracts work fine when tested independently in Remix IDE).
