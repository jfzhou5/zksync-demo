// Sources flattened with hardhat v2.14.0 https://hardhat.org

// File contracts/libraries/MiniMath.sol

//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

library MiniMath {
    function square(uint256 x) public pure returns (uint256) {
         return x*x;
    }
}


// File contracts/Greeter.sol

pragma solidity ^0.8.0;

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
