// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.

const hre = require("hardhat");

async function main() {

  const chatApp = await hre.ethers.deployContract("ChatApp");

  await chatApp.deployed();

  console.log(
    `Contract Address: ${chatApp.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

