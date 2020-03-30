pragma solidity ^0.5.0;

contract Hasher {
    
    //This contract allows an account to hash an input (represented by a string for simplicity) then
    //hash it and store it.
    //The hash can then be verified to exist
    
    mapping(bytes32 => bool) hashTable;
    
    function addHash(string memory input) public returns (bytes32) {
        bytes32 tempHash = keccak256(abi.encodePacked(input));
        hashTable[tempHash] = true;
        return tempHash;
    }
    
    function checkHash(bytes32 input) public view returns (bool) {
        return (hashTable[input]);
    }
}
