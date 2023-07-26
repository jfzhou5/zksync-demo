import { HardhatUserConfig } from "hardhat/config";

import "@matterlabs/hardhat-zksync-deploy";
import "@matterlabs/hardhat-zksync-solc";

import "@matterlabs/hardhat-zksync-verify";

// dynamically changes endpoints for local tests
const zkSyncTestnet =
  process.env.NODE_ENV == "test"
    ? {
        url: "http://localhost:3050",
        ethNetwork: "http://localhost:8545",
        zksync: true,
      }
    : {
        url: "https://zksync2-testnet.zksync.dev",
        ethNetwork: "goerli",
        zksync: true,
        // contract verification endpoint
        verifyURL:
          "https://zksync2-testnet-explorer.zksync.dev/contract_verification",
      };

const config: HardhatUserConfig = {
  zksolc: {
    version: "latest",
    settings: {
      libraries: {
        "contracts/libraries/MiniMath.sol": {
          // MiniMath: "0xD42EE7E83a5EDDd9C562132FBB98A0e13E2Bcf3c",
          MiniMath: "0x2d031A4550F74a33B4846783023f32F354195C11",
        },
      },
      // optimizer: {
      //   enabled: true,
      //   runs: 200
      // }
    },
  },
  defaultNetwork: "zkSyncTestnet",
  networks: {
    hardhat: {
      zksync: false,
    },
    zkSyncTestnet,
    zkSync: {
      url: "https://zksync2-mainnet.zksync.io",
      chainId: 324,
      ethNetwork: "mainnet",
      zksync: true,
      // contract verification endpoint
      verifyURL:
        "https://zksync2-mainnet-explorer.zksync.io/contract_verification",
    },
  },
  solidity: {
    version: "0.8.17",
  },
};

export default config;
