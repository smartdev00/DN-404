import { ethers } from "hardhat";
import { time } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";

import ABI from  "./abi.json";
import NFT_ABI from "./NFT_abi.json";


let owner: any;
let proxy_owner: any;
let user1: any;
let user2: any;
let user3: any;
let Morse: any;
let MorseAddress: any;
let dn404_owner: any;
let Proxy: any;
let ProxyAddress: any;
let ProxyContract: any;
let NFTContract: any;
let RerollUntilContract: any;
let RerollUntilContractAddress: any;
let RerollUntilContractV2: any;
let RerollUntilV2Address: any;

describe("Create Initial Contracts of all types", function () {
  it("get accounts", async function () {
    [owner, proxy_owner, user1, user2, user3, dn404_owner] =
      await ethers.getSigners();
    console.log("\tAccount address\t", await owner.getAddress());
  });
  it("should deploy MorseDN404 Contract", async function () {
    const instanceMorse = await ethers.getContractFactory("MorseDN404");
    Morse = await instanceMorse.deploy();
    MorseAddress = await Morse.getAddress();
    console.log("\ Morse Contract deployed at:", MorseAddress);
  });
  it("should deploy proxy contract", async function(){
    const instanceProxy = await ethers.getContractFactory("TransparentUpgradeableProxy");
    Proxy = await instanceProxy.deploy(MorseAddress, proxy_owner, "0x");
    ProxyAddress = await Proxy.getAddress();
    console.log("\ Proxy Contract deployed at:", ProxyAddress);
    ProxyContract = new ethers.Contract(ProxyAddress, ABI, owner);
  })
  it("set initial values of Morse", async function(){
    const initialSupply: number = 1e19;
    await ProxyContract.connect(owner).initialize(dn404_owner, "MorseDN404", "MORSE", BigInt(initialSupply), owner);
    console.log("passed here");
    expect(await ProxyContract.name()).to.equal("MorseDN404");
    expect(await ProxyContract.symbol()).to.equal("MORSE");
    expect(await ProxyContract.totalSupply()).to.equal(BigInt(initialSupply));
    expect(await ProxyContract.balanceOf(owner)).to.equal(BigInt(initialSupply));
  })
  it("set NFT contract", async function(){
    const NFTAddress = await ProxyContract.mirrorERC721();
    NFTContract = new ethers.Contract(NFTAddress, NFT_ABI, owner);
  })
});

describe("test on MorseDN404 contract", async function() {
  it("set setBaseURI", async function(){
    await ProxyContract.connect(dn404_owner).setBaseURI("https://morse.org/");
    expect(await ProxyContract.baseURI()).to.equal("https://morse.org/");
  })
  it("firstly transfer MorseDN404 contract", async function(){
    const amount = 1e18;
    await ProxyContract.connect(owner).transfer(user1, BigInt(amount));
    expect(await ProxyContract.balanceOf(user1)).to.equal(BigInt(amount));
    console.log(await NFTContract.balanceOf(user1));
    console.log(await NFTContract.ownerOf(1));
  })
})

// describe("deploy RerollUntil", async function() {
//   it("deploy", async function(){
//     const instanceReroll = await ethers.getContractFactory("RerollUntil");
//     RerollUntilContract = await instanceReroll.deploy(ProxyAddress);
//     RerollUntilContractAddress = await RerollUntilContract.getAddress();
//     console.log("RerollUntilContractAddress: " + RerollUntilContractAddress);
//   })
//   it("test this", async function(){
//     const amount = 1e17;
//     await ProxyContract.connect(user1).approve(RerollUntilContractAddress, BigInt(amount));
//     await RerollUntilContract.connect(user1).getTargetNFT(5);
//     expect(await NFTContract.ownerOf(5)).to.be.equal(user1);
//   })
// })


describe("deploy RerollerV2", async function(){
  it("deploy", async function(){
    const instanceRerollV2 = await ethers.getContractFactory("RerollerV2");
    RerollUntilContractV2 = await instanceRerollV2.deploy(ProxyAddress);
    RerollUntilV2Address = await RerollUntilContractV2.getAddress();
    console.log("RerollUntilV2ContractAddress: " + RerollUntilV2Address);
  })
  it("test this", async function(){
    const amount = 1e17;
    await ProxyContract.connect(user1).approve(RerollUntilV2Address, BigInt(amount));
    await RerollUntilContractV2.connect(user1).rerollUntil(3);
    expect(await NFTContract.ownerOf(3)).to.be.equal(user1);
  })
})