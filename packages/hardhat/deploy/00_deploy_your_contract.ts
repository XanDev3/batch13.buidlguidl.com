import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

// Update with your Batch number
// const BATCH_NUMBER = "13";

/**
 * Deploys a contract named "deployYourContract" using the deployer account and
 * constructor arguments set to the deployer address
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployYourContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  /*
    On localhost, the deployer account is the one that comes with Hardhat, which is already funded.

    When deploying to live networks (e.g `yarn deploy --network sepolia`), the deployer account
    should have sufficient balance to pay for the gas fees for contract creation.

    You can generate a random account with `yarn generate` or `yarn account:import` to import your
    existing PK which will fill DEPLOYER_PRIVATE_KEY_ENCRYPTED in the .env file (then used on hardhat.config.ts)
    You can run the `yarn account` command to check your balance in every network.
  */
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  // Don't need to deploy BatchRegistry on Optimisim, already deployed - 0xcF4ac52079F69C93904e2A4a379cAd1F0C8dA0A9
  /* await deploy("BatchRegistry", {
    from: deployer,
    // Contract constructor arguments
    args: [deployer, BATCH_NUMBER],
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
  });

  // Get the deployed contract to interact with it after deploying.
  const batchRegistry = await hre.ethers.getContract<Contract>("BatchRegistry", deployer);
  console.log("\nBatchRegistry deployed to:", await batchRegistry.getAddress());
  console.log("Remember to update the allow list!\n");

  // Transfer ownership to your buidler address
  console.log("\n 🤹  Sending ownership to buidler address...\n");
  const ownerTx = await batchRegistry.transferOwnership("0x5D09525B883020C65A2B5cd017FFbE51B6B6c58F");
  console.log("\n       confirming...\n");
  const ownershipResult = await ownerTx.wait();
  if (ownershipResult) {
    console.log("       ✅ ownership transferred successfully!\n");
  }

  // The GraduationNFT contract is deployed on the BatchRegistry constructor.
  const batchGraduationNFTAddress = await batchRegistry.batchGraduationNFT();
  console.log("BatchGraduation NFT deployed to:", batchGraduationNFTAddress, "\n"); */

  // Deploy my CheckIn contract
  await deploy("CheckIn", {
    from: deployer,
    // Contract constructor arguments
    args: [/* await batchRegistry.getAddress() */ "0xcF4ac52079F69C93904e2A4a379cAd1F0C8dA0A9", deployer],
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
  });

  // Get the deployed CheckIn contract to interact with it after deploying.
  const myCheckIn = await hre.ethers.getContract<Contract>("CheckIn", deployer);
  console.log("\nmyCheckIn deployed to:", await myCheckIn.getAddress());

  // Transfer ownership of CheckIn to your buidler address
  console.log("\n 🤹  Sending CheckIn ownership to buidler address...\n");
  const ownerTxCheckIn = await myCheckIn.transferOwnership("0x5D09525B883020C65A2B5cd017FFbE51B6B6c58F");
  console.log("\n       confirming...\n");
  const ownershipResultCheckIn = await ownerTxCheckIn.wait();
  if (ownershipResultCheckIn) {
    console.log("       ✅ ownership of CheckIn transferred successfully!\n");
  }
};

export default deployYourContract;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags YourContract
deployYourContract.tags = ["BatchRegistry"];
