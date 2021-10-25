// Runtime Environment's members available in the global scope.
const hre = require('hardhat');

const main = async () => {
  // Compile Contract
  const nftContractFactory = await hre.ethers.getContractFactory('AstroNFT');
  // Deploy Contract
  const nftContract = await nftContractFactory.deploy();
  // Wait until mined
  await nftContract.deployed();
  console.log(`Contract deployed to ${nftContract.address}`);

  let txn = await nftContract.mintAnAstro();
  // Wait for Mint
  await txn.wait();
  console.log(`Minted an Astro to ${nftContract.address}`);

  // Mint another Astro
  txn = await nftContract.mintAnAstro();
  await txn.wait();
  console.log(`Minted another Astro to ${nftContract.address}`);
};

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
