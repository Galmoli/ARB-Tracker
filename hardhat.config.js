require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.16",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  defaultNetwork: "hardhat",
    networks: {
      hardhat: {
        forking: {
          url: process.env.ARB,
        }
      },
      arbitrum: {
        chainId: 42161,
        url: process.env.ARB,
      }
    },
};
