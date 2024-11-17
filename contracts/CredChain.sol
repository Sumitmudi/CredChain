// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IUser {
    struct UserProfile {
        string userName;
        string userRole;
    }
    function getProfile (address _user) external view returns (UserProfile memory);
}

contract CredChain {

    IUser userContract;
    
    //array of certificate hash being stored here
    bytes32[] public storedHash;
    //mapping hashes to bool,only hashes having certificate have value true
    mapping(bytes32 => bool) public certificateExists;
    //structure of certificate
    struct certificate {
        string  name;
        string  certifiedFor;
        uint256 date;
        address studentAddress;
        uint256 timestamp;
    }
    //mapping a hash to each certificate
    mapping(bytes32=>certificate) public certificates;
    //mapping address to array of certificate 
    mapping(address=>certificate[]) public studentCertificates; 
    //events here
    event certificateCreated(string  name,
        string  certifiedFor,
        uint256 date,
        address studentAddress,
        uint256 timestamp);
    //modifiers here
     modifier onlyRegistered(){
        IUser.UserProfile memory userProfileTemp = userContract.getProfile(msg.sender);
        require(bytes(userProfileTemp.userName).length > 0, "USER NOT REGISTERED");
        _;
    }
    modifier onlyStudent(){
        IUser.UserProfile memory userProfileTemp = userContract.getProfile(msg.sender);
        require(keccak256(bytes(userProfileTemp.userRole)) == keccak256(bytes("student")), "CHOOSE YOUR ROLE FIRST");
        _;
    }
    modifier onlyInstitute(){
        IUser.UserProfile memory userProfileTemp = userContract.getProfile(msg.sender);
        require(keccak256(bytes(userProfileTemp.userRole)) == keccak256(bytes("institute")), "CHOOSE YOUR ROLE FIRST");
        _;
    }
    modifier onlyEmployee(){
        IUser.UserProfile memory userProfileTemp = userContract.getProfile(msg.sender);
        require(keccak256(bytes(userProfileTemp.userRole)) == keccak256(bytes("employee")), "CHOOSE YOUR ROLE FIRST");
        _;
    }
    
    constructor(address _userContract) {
        userContract = IUser(_userContract);
    }

    //creating a certificate from given inputs
    function createCertificate(string memory _name,
        string memory _certifiedFor,
        uint256 _date,
        address _studentAddress,uint256 _timestamp) public onlyRegistered onlyInstitute returns (bytes32){
        certificate memory newCertificate = certificate({
            name: _name,
            certifiedFor: _certifiedFor,
            date: _date,
            studentAddress: _studentAddress,
            timestamp: block.timestamp
        });
        studentCertificates[_studentAddress].push(newCertificate);
        bytes32 certificateHash = keccak256(abi.encodePacked(_name,_certifiedFor,_date,_studentAddress,_timestamp));
        storedHash.push(certificateHash);
        certificates[certificateHash]=certificate(_name,_certifiedFor,_date,_studentAddress,_timestamp);
        certificateExists[certificateHash]=true;
        emit certificateCreated(_name,_certifiedFor,_date,_studentAddress,block.timestamp);
        return certificateHash;
        }
    //fetching the certificates
    //by certificate hash
    function getCertificates(bytes32 _certificateHash) onlyRegistered onlyEmployee public view returns (certificate memory) {
        require(certificateExists[_certificateHash],"Certificate Hash not Found.");
        return certificates[_certificateHash];
    }
    //by student wallet address
    function getCertificatesByAddress(address _studentAddress) onlyRegistered onlyStudent public view returns(certificate[] memory,bytes32[] memory){  
    certificate[] memory certs = studentCertificates[_studentAddress];
    bytes32[] memory hashes = new bytes32[](certs.length);
    for (uint256 i = 0; i < certs.length; i++) {
        hashes[i] = keccak256(
            abi.encodePacked(
                certs[i].name,
                certs[i].certifiedFor,
                certs[i].date,
                certs[i].studentAddress,
                certs[i].timestamp
            )
        );
    }
    return (certs, hashes);
    }
}