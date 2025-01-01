import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    // View the networks that are pre-configured.
    // If the network you are looking for is not here you can add new network settings
    hardhat: {
      forking: {
        url: "https://rpc-amoy.polygon.technology/",
        enabled: process.env.MAINNET_FORKING_ENABLED === "true",
      },
    },
  }
};

export default config;
