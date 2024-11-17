require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20", // Match the Solidity version of your contract
  networks: {
    sepolia: {
      url: process.env.ALCHEMY_API_URL, // Alchemy API URL
      accounts: [process.env.PRIVATE_KEY], // Your wallet's private key
    },
  },
};
