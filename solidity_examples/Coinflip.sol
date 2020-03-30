pragma solidity ^0.5.0;

import "./Ownable.sol";

contract Coinflip is Owner {

    //This contract gives an account a chance of winning a 50/50 bet.
    //It requires an account to send a value of Ether with the transaction
    //It requires the deployer to fund to the contract upfront
    //It inherits from the Ownable.sol contract
    
    constructor () public payable {
        require (msg.value >= 5000, "Contract requires funding");
    }
    
    modifier costs(uint cost) {
        require (msg.value > cost, "Minimum bet required");
        _;
    }
    
    mapping(address => bool) winner;
    
    function placeBet() public payable costs(100)
            msg.sender.transfer(bet*2);
            winner[msg.sender] = true;
        }
        else {
            winner[msg.sender] = false;
        }
    }
    
    function getBalance() public view returns(uint) {
        return(address(this).balance);
    }
    
    function didIWin() public view returns(bool) {
        return winner[msg.sender];
    }
    
    function fundContract() public payable isOwner {
        
    }
}
