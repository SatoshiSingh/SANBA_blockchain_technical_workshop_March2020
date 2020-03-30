pragma solidity ^0.5.0;

contract HelloBlockchain {
    string public message;
    
    constructor () public {
        message = "Hello Blockchain";
    }
    
    function changeMessage(string memory newMessage) public {
        message = newMessage;
    }
}
