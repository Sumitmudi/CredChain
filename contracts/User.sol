// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract User {
    struct UserProfile{
        string userName;
        string userRole;
    }
    mapping (address=>UserProfile) public profiles;
    function setProfile (string memory _userName,string memory _userRole) external  {
        require(bytes(_userName).length > 0, "User name cannot be empty");
        require(bytes(_userRole).length > 0, "User role cannot be empty");
        profiles[msg.sender]=UserProfile(_userName,_userRole);
    }
    function getProfile(address _user) public view returns(UserProfile memory){
        return profiles[_user];
    }
}