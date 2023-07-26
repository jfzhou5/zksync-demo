import { Provider } from "zksync-web3";
import * as ethers from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";

// load env file
import dotenv from "dotenv";
dotenv.config();

// load contract artifact. Make sure to compile first!
import * as ContractArtifact from "../artifacts-zk/contracts/Greeter.sol/Greeter.json";

const PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY || "";

if (!PRIVATE_KEY)
  throw "⛔️ Private key not detected! Add it to the .env file!";

// Address of the contract on zksync testnet
const CONTRACT_ADDRESS = "0x0055895D080AB2Dc6D6Ba659d45EAE04Bb71EDB8";
// const CONTRACT_ADDRESS = "0x4232E898731c81EFCcAf79ba08bf0bd8C473548B"; // true

if (!CONTRACT_ADDRESS) throw "⛔️ Contract address not provided";

// An example of a deploy script that will deploy and call a simple contract.
const useGreeter = async function (hre: HardhatRuntimeEnvironment) {
  console.log(`Running script to interact with contract ${CONTRACT_ADDRESS}`);

  // Initialize the provider.
  // @ts-ignore
  const provider = new Provider(hre.userConfig.networks?.zkSyncTestnet?.url);
  const signer = new ethers.Wallet(PRIVATE_KEY, provider);

  // Initialize contract instance
  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    ContractArtifact.abi,
    signer
  );

  // Read message from contract
  console.log(`The message is ${await contract.greet()}`);

  console.log(`The Number is ${await contract.lastNumber()}`);

  // send transaction to update the message
  const newMessage = "Hello people!";
  const tx = await contract.setGreeting(newMessage);

  console.log(`Transaction to change the message is ${tx.hash}`);
  await tx.wait();
  // Read message after transaction
  console.log(`The message now is ${await contract.greet()}`);

  console.log(`last number: ${await contract.lastNumber()}`);
  const testLibTx = await contract.storeSquare(2);
  await testLibTx.wait();
  console.log(`new last number: ${await contract.lastNumber()}`);

  console.log();
};

export default useGreeter;
