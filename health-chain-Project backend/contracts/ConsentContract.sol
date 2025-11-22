// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./IdentityContract.sol";
import "hardhat/console.sol";

contract ConsentContract {
    IdentityContract identity;

    // patient => (doctor => access granted?)
    mapping(address => mapping(address => bool)) public consents;

    event ConsentGiven(address indexed patient, address indexed doctor);
    event ConsentRevoked(address indexed patient, address indexed doctor);

    constructor(address _identity) {
        identity = IdentityContract(_identity);
    }

    // access control removed: allow callers without checking IdentityContract role

   function giveConsent(address _doctor) external {
    
    consents[msg.sender][_doctor] = true;
    emit ConsentGiven(msg.sender, _doctor);
}

    function revokeConsent(address _doctor) external {
        consents[msg.sender][_doctor] = false;
        emit ConsentRevoked(msg.sender, _doctor);
    }

    function hasConsent(address _patient, address _doctor) external view returns (bool) {
        return consents[_patient][_doctor];
    }
}
