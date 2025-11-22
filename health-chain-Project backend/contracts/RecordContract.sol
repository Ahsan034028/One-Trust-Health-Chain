// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./IdentityContract.sol";
import "./ConsentContract.sol";

contract RecordContract {
    IdentityContract identity;
    ConsentContract consent;

    struct Record {
        string ipfsHash;   // or any file hash
        uint256 timestamp;
        address uploadedBy;
    }

    // patient => list of records
    mapping(address => Record[]) public patientRecords;

    event RecordUploaded(address indexed patient, address indexed doctor, string ipfsHash);

    constructor(address _identity, address _consent) {
        identity = IdentityContract(_identity);
        consent = ConsentContract(_consent);
    }

    modifier onlyDoctor() {
        require(identity.getRole(msg.sender) == IdentityContract.Role.Doctor, "Not doctor");
        _;
    }

    function uploadRecord(address _patient, string calldata _ipfsHash) external onlyDoctor {
        require(consent.hasConsent(_patient, msg.sender), "No consent from patient");

        patientRecords[_patient].push(
            Record(_ipfsHash, block.timestamp, msg.sender)
        );

        emit RecordUploaded(_patient, msg.sender, _ipfsHash);
    }

    function getRecords(address _patient) external view returns (Record[] memory) {
        return patientRecords[_patient];
    }
}
