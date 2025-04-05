import { ethers } from "hardhat";
import ABI from "./abi.json";

async function main() {
  // Retrieve the first signer, typically the default account in Hardhat, to use as the deployer.
  const [deployer] = await ethers.getSigners();
  console.log("Run Reroll funciton...");
  console.log("My address", deployer.address);
  const rerollUntilContract = new ethers.Contract("0x4613CBB11F4533b497c7e83f9992A0e2b65Af88E", ABI, deployer);
  console.log("morse: ", await rerollUntilContract.morse());

  const tx = await rerollUntilContract.rerollUntil(251, {
    gasPrice: ethers.parseUnits("1", "gwei"),
  });

  await tx.wait();
  // await rerollUntilContract.reroll();
  // await rerollUntilContract.rerollUntil(251);
}

// This pattern allows the use of async/await throughout and ensures that errors are caught and handled properly.
main().catch((error) => {
  console.error(error);
  process.exit(1);
});
