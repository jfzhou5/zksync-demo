//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./libraries/MiniMath.sol";

contract Greeter {
    string private greeting;
    uint256 public lastNumber;

    constructor(string memory _greeting) {
        greeting = _greeting;
    }

    function greet() public view returns (string memory) {
        return greeting;
    }

    function setGreeting(string memory _greeting) public {
        greeting = _greeting;
    }

    function storeSquare(uint256 x) public {
        uint256 square = MiniMath.square(x);
        lastNumber = square;
    }
}
