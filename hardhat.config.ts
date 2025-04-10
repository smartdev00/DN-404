import { HardhatUserConfig } from "hardhat/config";
import "dotenv/config";

import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-chai-matchers";

const infuraKey = process.env.INFURA_API_KEY;
const privateKey = process.env.PRIVATE_KEY?process.env.PRIVATE_KEY:"";
const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 100,
      },
      viaIR: true,
    },
  },
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${infuraKey}`,
      accounts: [privateKey],
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${infuraKey}`,
      accounts: [privateKey],
    },
    bnb_testnet: {
      url: `https://data-seed-prebsc-1-s1.binance.org:8545`,
      accounts: [privateKey],
    },
    bnb_mainnet:{
      url: "https://bsc-dataseed.binance.org/",
      accounts:[privateKey],
    },
    base_sepolia:{
      url: "https://base-sepolia-rpc.publicnode.com",
      accounts: [privateKey],
    },
    base_mainnet:{
      url: "https://mainnet.base.org",
      accounts: [privateKey],
    },
    holesky_testnet:{
      url: "https://ethereum-holesky-rpc.publicnode.com",
      accounts: [privateKey],
    },
    arbitrum_sepolia: {
      url: `https://sepolia.infura.io/v3/${infuraKey}`,
      accounts: [privateKey],
    },
    arbitrum_mainnet: {
      url: `https://arbitrum-mainnet.infura.io/v3/${infuraKey}`,
      accounts: [privateKey],
    },
    hardhat: {
      chainId: 31337,
    },
  },
  etherscan: {
    apiKey: {
      mainnet: process.env.mainnet,
      baseSepolia: process.env.baseSepolia,
      holesky: process.env.holesky,
      base: process.env.base,
      arbitrumOne: process.env.arbitrumOne,
      bscTestnet: process.env.bscTestnet
    },
    // customChains: [
    //   {
    //     network: "base_sepolia",
    //     chainId: 84532,
    //     urls: {
    //       apiURL: "https://api-sepolia.etherscan.io/api/",
    //       browserURL: "https://sepolia.basescan.org/"
    //     }
    //   }
    // ]
  },
  gasReporter: {
    enabled: true,
  },
  sourcify: {
    enabled: true,
  },
};

export default config;

