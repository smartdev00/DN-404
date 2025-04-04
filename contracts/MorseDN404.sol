// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import './DN404.sol';
import './DN404Mirror.sol';
import 'solady/src/utils/LibString.sol';
import '@openzeppelin/contracts-upgradeable/access/Ownable2StepUpgradeable.sol';
import './lib/Error.sol';
import "hardhat/console.sol";

contract MorseDN404 is DN404, Ownable2StepUpgradeable {
  string private _name;
  string private _symbol;
  string private _baseURI;

  //===========

  function initialize(
    address owner,
    string memory name_,
    string memory symbol_,
    uint96 initialTokenSupply,
    address initialSupplyOwner
  ) public initializer {
    __Ownable2Step_init();
    _transferOwnership(owner);
    _name = name_;
    _symbol = symbol_;
    address mirror = address(new DN404Mirror(msg.sender));
    _initializeDN404(initialTokenSupply, initialSupplyOwner, mirror);
  }

  constructor() initializer {
  }

  function name() public view override returns (string memory) {
    return _name;
  }

  function symbol() public view override returns (string memory) {
    return _symbol;
  }

  function baseURI() public view returns (string memory) {
    return _baseURI;
  }

  function _tokenURI(
    uint256 tokenId
  ) internal view override returns (string memory result) {
    if (!_exists(tokenId)) {
      revert Error.TokenDoesNotExist();
    }

    if (bytes(_baseURI).length != 0) {
      result = LibString.replace(_baseURI, '{id}', LibString.toString(tokenId));
    }
  }

  function setBaseURI(string calldata baseURI_) external onlyOwner {
    _baseURI = baseURI_;
  }
}