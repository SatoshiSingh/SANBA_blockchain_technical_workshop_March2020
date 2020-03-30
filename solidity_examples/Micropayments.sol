pragma solidity ^0.5.0;

contract Micropayments {

    //This contract assigns 2 accounts as contractees in a payment channel
    //Contractees can then lock funds into the contract, and make infinite payments between one another at a minimal fee
    //Once either contractee withdraws the funds, the contract is reset to the 0x0 account so that it can be reopened with different contractees
    //Note that this contract is just an example and has not been audited for security concerns

    address payable public contractee1;
    address payable public contractee2;
    uint public balance1;
    uint public balance2;
    
    constructor () payable public {
        //owner = msg.sender
    }
    
    modifier onlyContracted() {
        require (msg.sender == contractee1 || msg.sender == contractee2, "You are not a contractee in this payment channel");
        _;
    }
    
    modifier fundsAvailable(uint _payment) {
        if (msg.sender == contractee1) {
            require (balance1 >= _payment, "Insufficient funds");
            _;
        }
        else {
            require (balance2 >= _payment, "Insufficient funds");
            _;
        }
    }
    
    function addContractees (address payable address1, address payable address2) public {
        if (contractee1 == 0x0000000000000000000000000000000000000000 && contractee2 == 0x0000000000000000000000000000000000000000) {
            contractee1 = address1;
            contractee2 = address2;
        }
    }
    
    function lockFunds () public payable onlyContracted {
        if (msg.sender == contractee1) {
            balance1 += msg.value;
        }
        else {
            balance2 += msg.value;
        }
    }
    
    function pay(uint payment) public onlyContracted fundsAvailable(payment) {
        if (msg.sender == contractee1) {
            balance2 += payment;
            balance1 -= payment;
        }
        else {
            balance1 += payment;
            balance2 -= payment;
        }
    }
    
    function withdraw() public onlyContracted {
        uint toTransfer = balance1;
        balance1 = 0;
        contractee1.transfer(toTransfer);
        toTransfer = balance2;
        balance2 = 0;
        contractee2.transfer(toTransfer);
        contractee1 = 0x0000000000000000000000000000000000000000;
        contractee2 = 0x0000000000000000000000000000000000000000;
    }
    
    function getBalance() public view returns (uint) {
        return (address(this).balance);
    }
}
