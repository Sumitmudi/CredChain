// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CredChain{
    
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
    }
    //mapping a hash to each certificate
    mapping(bytes32=>certificate) public certificates; 
    //creating a certificate from given inputs
    function createCertificate(string memory _name,
        string memory _certifiedFor,
        uint256 _date,
        address _studentAddress) public returns (bytes32){
        bytes32 certificateHash = keccak256(abi.encodePacked(_name,_certifiedFor,_date,_studentAddress));
        storedHash.push(certificateHash);
        certificates[certificateHash]=certificate(_name,_certifiedFor,_date,_studentAddress);
        certificateExists[certificateHash]=true;
        return certificateHash;
        }
    //fetching the certificates
    function getCertificates(bytes32 _certificateHash) public view returns (certificate memory) {
        require(certificateExists[_certificateHash],"Certificate Hash not Found.");
        return certificates[_certificateHash];
    }
}