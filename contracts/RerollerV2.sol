// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {IERC721} from '@openzeppelin/contracts/token/ERC721/IERC721.sol';
import {IERC20} from '@openzeppelin/contracts/token/ERC20/IERC20.sol';

interface IMirror is IERC721 {
  function ownerAt(uint256 id) external returns(address);
}
interface IRerollerV2DN404 is IERC20 {
  function setSkipNFT(bool skipNFT) external returns (bool);
  function mirrorERC721() external returns (IMirror);
}

contract RerollerV2 {

  IRerollerV2DN404 public morse;
  IMirror public mirror;
  constructor(address payable _morse) {
    morse = IRerollerV2DN404(_morse);
    IRerollerV2DN404(_morse).setSkipNFT(true);
    mirror = morse.mirrorERC721();
  }

  function reroll() external {
    morse.transferFrom(msg.sender, address(this), 1);
    morse.transfer(msg.sender, 1);
  }

  function rerollUntil(uint256 tokenId) external {
    require(mirror.ownerAt(tokenId) == address(0), "already exist tokenId");
    while (true) {
      morse.transferFrom(msg.sender, address(this), 1);
      morse.transfer(msg.sender, 1);
      if(mirror.ownerAt(tokenId) == msg.sender) break ;
    }
  }
}