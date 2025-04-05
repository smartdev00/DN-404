import { ethers } from "hardhat";

async function main() {
    // Retrieve the first signer, typically the default account in Hardhat, to use as the deployer.
    const [deployer] = await ethers.getSigners();
    console.log("Deploying all contracts...");

    const morseDN404Instance = await ethers.getContractFactory('MorseDN404');
    const morseDN404 = await morseDN404Instance.deploy();
    await morseDN404.waitForDeployment();
    const implementation = await morseDN404.getAddress();
    
    console.log("MorseDN404 deployed to:", implementation);

    const proxyInstance = await ethers.getContractFactory('TransparentUpgradeableProxy');
    const proxy = await proxyInstance.deploy(implementation, "0xb52d613eE6D9eF3D04940544f5b6E21833682E9E", "0x");
    await proxy.waitForDeployment();
    const proxyAddress = await proxy.getAddress();
    console.log("TransparentUpgradeableProxy deployed to:", proxyAddress);
}

// This pattern allows the use of async/await throughout and ensures that errors are caught and handled properly.
main().catch((error) => {
    console.error(error);
    process.exit(1);
});