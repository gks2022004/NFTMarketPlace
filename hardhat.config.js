require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks:{
    sepolia:{
      url: "https://eth-sepolia.public.blastapi.io	",
      accounts: [process.env.PRIVATE_KEY]
    },
  }
};
