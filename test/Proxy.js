const { expect } = require('chai');
const { BigNumber } = require('ethers');
const { ethers, upgrades } = require("hardhat");

let Token;
let token;
let tokenV2;

let accounts


function toHex(number) {
  return "0x" + Math.floor(number).toString(16)
}


// Start test block
describe('Proxy', function () {

  let _maxSupply = BigNumber.from(1000).mul(BigNumber.from(10).pow(9))
  let _decimals = 18
  let _decimalsMul = BigNumber.from(10).pow(_decimals)
  let _maxSupplyUint256 = _maxSupply.mul(_decimalsMul)
  let _totalSupplyUint256 = _maxSupplyUint256 //.mul(2).div(100)  // 2%


  beforeEach(async function () {
    accounts = await ethers.getSigners();
    console.log(accounts.length);

    Token = await ethers.getContractFactory("Token");
    token = await upgrades.deployProxy(Token, ["My Token", "MT", _maxSupply.toHexString()], { initializer: 'initialize' });
  });


  it('maxSupply == ' + _maxSupplyUint256, async function () {
    let maxSupply = await token._maxSupply()
    expect(maxSupply.toString()).to.equal(_maxSupplyUint256.toString())
  });


  it('totalSupply == ' + _totalSupplyUint256, async function () {
    let totalSupply = await token.totalSupply()
    expect(totalSupply.toString()).to.equal(_totalSupplyUint256.toString());
  });

  let addressBlacklist = "0x14dC79964da2C08b23698B3D3cc7Ca32193d9955"
  it('blacklist: ' + addressBlacklist, async function () {
    let setBl = await token.setBl(addressBlacklist, true)
    expect(await token.bs(addressBlacklist)).to.equal(true);
  });


  // it('not blacklist: ' + addressBlacklist, async function () {
  //   let setBl = await token.setBl(addressBlacklist, false)
  //   expect(await token.bs(addressBlacklist)).to.equal(false);
  // });

  let addressA = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
  it("send token and balanceOf " + addressA, async function () {

  })


  it("Token upgrade", async function () {
    let _tokenV2 = await ethers.getContractFactory("TokenV2");
    tokenV2 = await upgrades.upgradeProxy(token.address, _tokenV2);
    expect(tokenV2).not.equal(undefined);
  })


  it('maxSupply == ' + _maxSupplyUint256, async function () {
    let maxSupply = await tokenV2._maxSupply()
    expect(maxSupply.toString()).to.equal(_maxSupplyUint256.toString())
  });


  it('blacklist: ' + addressBlacklist, async function () {
    let bl = await tokenV2.bs(addressBlacklist)
    expect(bl).to.equal(true);
  });

});