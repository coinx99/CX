require("@nomicfoundation/hardhat-verify");
const hre = require("hardhat");

const { BigNumber } = require('ethers');
const { ethers, upgrades } = require("hardhat");

console.log(hre);

async function main() {
  let Token;
  let token;
  let tokenV2;

  let accounts
  const provider = ethers.provider;

  let _maxSupply = BigNumber.from(1000).mul(BigNumber.from(10).pow(9))
  let _decimals = 18
  let _decimalsMul = BigNumber.from(10).pow(_decimals)
  let _maxSupplyUint256 = _maxSupply.mul(_decimalsMul)
  let _totalSupplyUint256 = _maxSupplyUint256 //.mul(2).div(100)  // 2%
  accounts = await ethers.getSigners();
  console.log("accounts[0]", accounts[0].address);
  console.log((await provider.getBalance(accounts[0].address)) / 1e18)
  console.log((await provider.getBalance(accounts[1].address)) / 1e18)
  console.log((await provider.getBalance(accounts[2].address)) / 1e18)


  Token = await ethers.getContractFactory("Token");
  token = await upgrades.deployProxy(Token, ["My Token", "MT", _maxSupply.toHexString()], { initializer: 'initialize' });


  await token.deployed();
  console.log("token deployed to:", token.address);


}

// main();