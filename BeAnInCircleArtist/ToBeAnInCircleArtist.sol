// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract ToBeAnInCircleArtist {

    string public name;
    // string public addr;
    string public autoname = "Anonymous artist"; 
    string public remind = "Please enter your address"; 

    mapping (address=>bool) public statusB;
    
    string[] public nameList; 

    function nameInput(string memory _name)public {
      
        require(statusB[msg.sender]==false,"You have already become an in-circle artist");

        if(bytes(_name).length == 0) {
            name = autoname;
        } else {
            name = _name;
        }

        // if(bytes(_addr).length == 0) {
        
        // }else{
        //     addr = _addr;
        // }

        statusB[msg.sender] = true;
        nameList.push(_name);

        }

     function getName() public view returns(string memory){
     return name;
     }
    
}