// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract IdentityContract {
    address public owner;

    enum Role { None, Hospital, Doctor, Patient }

    struct User {
        Role role;
        address hospital; // If Doctor, which hospital registered him
        address doctor;   // If Patient, which doctor registered him
    }

    mapping(address => User) public users;

    event HospitalRegistered(address indexed hospital);
    event DoctorRegistered(address indexed doctor, address indexed hospital);
    event PatientRegistered(address indexed patient, address indexed doctor);
    event OwnershipTransferred(address indexed oldOwner, address indexed newOwner);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not contract owner");
        _;
    }

    modifier onlyHospital() {
        require(users[msg.sender].role == Role.Hospital, "Not hospital");
        _;
    }

    modifier onlyDoctor() {
        require(users[msg.sender].role == Role.Doctor, "Not doctor");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    // --- 🔹 Ownership Management ---
    function transferOwnership(address _newOwner) external onlyOwner {
        require(_newOwner != address(0), "Invalid address");
        address oldOwner = owner;
        owner = _newOwner;
        emit OwnershipTransferred(oldOwner, _newOwner);
    }

    // --- 🔹 Hospital Self-Registration ---
    function registerHospital() external {
        require(users[msg.sender].role == Role.None, "Already registered");
        users[msg.sender] = User(Role.Hospital, address(0), address(0));
        emit HospitalRegistered(msg.sender);
    }

    // --- 🔹 Doctor Registration (onlyHospital) ---
    function registerDoctor(address _doctor) external onlyHospital {
        require(users[_doctor].role == Role.None, "Already registered");
        users[_doctor] = User(Role.Doctor, msg.sender, address(0));
        emit DoctorRegistered(_doctor, msg.sender);
    }

    // --- 🔹 Patient Registration (onlyDoctor) ---
    function registerPatient(address _patient) external onlyDoctor {
        require(users[_patient].role == Role.None, "Already registered");
        users[_patient] = User(Role.Patient, users[msg.sender].hospital, msg.sender);
        emit PatientRegistered(_patient, msg.sender);
    }

    // --- 🔹 Role Check Helper ---
    function getRole(address _user) external view returns (Role) {
        return users[_user].role;
    }
}
