//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";


interface iBatchRegistry {
    function checkIn() external ;
}

contract CheckIn is Ownable {
    address iBatchRegistryAddress;

    constructor(address _iBatchRegistry, address initialOwner) Ownable(initialOwner){
        iBatchRegistryAddress = _iBatchRegistry;
    }

    function checkMeIn() public onlyOwner{
        iBatchRegistry(iBatchRegistryAddress).checkIn();
    }
    receive() external payable {}
}