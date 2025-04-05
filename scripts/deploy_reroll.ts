import { ethers } from "hardhat";

async function main() {
    // Retrieve the first signer, typically the default account in Hardhat, to use as the deployer.
    const [deployer] = await ethers.getSigners();
    console.log("Deploying Reroll Contract...");
    
    const rerollUntilInstance = await ethers.getContractFactory("RerollUntil");
    const rerollUntil = await rerollUntilInstance.deploy("0x5b4B094EB5f97aeD56EEEc98e4F80ec8c28b0E47");
    await rerollUntil.waitForDeployment();
    const rerollUntilAddress = await rerollUntil.getAddress();
    console.log("RerollUntil deployed to:", rerollUntilAddress);
}

// This pattern allows the use of async/await throughout and ensures that errors are caught and handled properly.
main().catch((error) => {
    console.error(error);
    process.exit(1);
});