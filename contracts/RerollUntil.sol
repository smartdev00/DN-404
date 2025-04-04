// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import "./DN404.sol";
import "./DN404Mirror.sol";
import "hardhat/console.sol";
contract RerollUntil {
    DN404 private morseDN404;
    DN404Mirror private morseDN404Mirror;
    constructor(address payable _dn404){
        morseDN404 = DN404(_dn404);
        morseDN404Mirror = DN404Mirror(payable(morseDN404.mirrorERC721()));
    }
    function getTargetNFT(uint256 _targetId) external {
        require(morseDN404Mirror.ownerAt(_targetId) == address(0), "already existing id");
        require(morseDN404.balanceOf(msg.sender) >= 1e18, "You are not having enough balance");
        for(uint256 i = 0 ; ; ++ i){
            morseDN404.transferFrom(msg.sender, address(this), 1);
            morseDN404.transfer(msg.sender, 1);
            console.log(i);
            if(morseDN404Mirror.ownerAt(_targetId) == msg.sender){
                break ;
            }
        }
    }
}


