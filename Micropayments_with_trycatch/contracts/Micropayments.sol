pragma solidity ^0.5.0;


contract Micropayments {
    address payable public contractee1;
    address payable public contractee2;
    uint256 public balance1;
    uint256 public balance2;

    constructor() public payable {
        //owner = msg.sender
    }

    modifier onlyContracted() {
        require(
            msg.sender == contractee1 || msg.sender == contractee2,
            "You are not a contractee in this payment channel"
        );
        _;
    }

    modifier fundsAvailable(uint256 _payment) {
        if (msg.sender == contractee1) {
            require(balance1 >= _payment, "Insufficient funds");
            _;
        } else {
            require(balance2 >= _payment, "Insufficient funds");
            _;
        }
    }

    function addContractees(address payable address1, address payable address2)
        public
    {
        if (
            contractee1 == 0x0000000000000000000000000000000000000000 &&
            contractee2 == 0x0000000000000000000000000000000000000000
        ) {
            contractee1 = address1;
            contractee2 = address2;
        }
    }

    function lockFunds() public payable onlyContracted {
        if (msg.sender == contractee1) {
            balance1 += msg.value;
        } else {
            balance2 += msg.value;
        }
    }

    function pay(uint256 payment)
        public
        onlyContracted
        fundsAvailable(payment)
    {
        if (msg.sender == contractee1) {
            balance2 += payment;
            balance1 -= payment;
        } else {
            balance1 += payment;
            balance2 -= payment;
        }
    }

    function withdraw() public onlyContracted {
        uint256 toTransfer = balance1;
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
