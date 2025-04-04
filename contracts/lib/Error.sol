// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
pragma abicoder v2;

library Error {
  error AlreadyRegisteredStage(uint8 stage);

  error StageNotRegistered(uint8 stage);

  error InvalidStage(uint8 expected, uint8 actual);

  error Unauthorized();

  error InvalidProof();

  error TooManyProofs(uint256 length);

  error MorseDN404NotSet();

  error TokenDoesNotExist();
}