// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract SimpleStorage{

   uint public a;

   function setter(uint _a) public {
    a = _a;
   }

   function getter() public view returns(uint){
    return a;
   }

}