import { ethers } from "hardhat";

async function main() {
    // Retrieve the first signer, typically the default account in Hardhat, to use as the deployer.
    const [deployer] = await ethers.getSigners();
    console.log("Deploying Reroll Contract...");
    
    const rerollUntilInstance = await ethers.getContractFactory("RerollerV2");
    const rerollUntil = await rerollUntilInstance.deploy("0xe591293151fFDadD5E06487087D9b0E2743de92E");
    await rerollUntil.waitForDeployment();
    const rerollUntilAddress = await rerollUntil.getAddress();
    console.log("RerollUntil deployed to:", rerollUntilAddress);
}

// This pattern allows the use of async/await throughout and ensures that errors are caught and handled properly.
main().catch((error) => {
    console.error(error);
    process.exit(1);
});