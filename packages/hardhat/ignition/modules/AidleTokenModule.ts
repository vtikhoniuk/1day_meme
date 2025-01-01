// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
const { ethers } = require("hardhat");

const AidleTokenModule =  buildModule("AidleTokenModule", (m) => {
  const deployer = m.getAccount(0);
  const AidleTokenContract = m.contract("AidleToken", [deployer], {
    from: deployer
  });

  return { AidleTokenContract };
});

export default AidleTokenModule;
