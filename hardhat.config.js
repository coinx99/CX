require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
require('@openzeppelin/hardhat-upgrades');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",

  networks: {
    // etherscan: {
    //   url: "https://mainnet.infura.io/v3/7b758e41cdea45c1a32f547d039b66ed",
    //   apiKey: {
    //     arbitrumgoerli: "SAIDRPKVPJ92YX975EY8YDEMHURE4RMVWU"
    //   },
    // },
    arbitrumgoerli: {
      url: "https://goerli-rollup.arbitrum.io/rpc",
      chainId: 421613,
      accounts: ["3bfb48caf8a67dae378c546acec3d7034e7e79985e153be9c45290f5c119592b"],
      apiKey: "SAIDRPKVPJ92YX975EY8YDEMHURE4RMVWU",
    },
    // fuji: {
    //   url: "https://api.avax-test.network/ext/bc/C/rpc",
    //   gasPrice: 225000000000,
    //   chainId: 43113,
    //   accounts: [],
    // },
    // avax: {
    //   url: "https://api.avax.network/ext/bc/C/rpc",
    //   gasPrice: 225000000000,
    //   chainId: 43114,
    //   accounts: [],
    // },
  }
};
