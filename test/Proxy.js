const { expect } = require('chai');
const { BigNumber } = require('ethers');
const { ethers, upgrades } = require("hardhat");

let Token;
let token;
let tokenV2;

let accounts
const provider = ethers.provider;

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
    console.log("accounts[0]", accounts[0].address, (await provider.getBalance(accounts[0].address)).div(BigNumber.from(10).pow(18)).toString() + " 💎");

    Token = await ethers.getContractFactory("Token");
    token = await upgrades.deployProxy(Token, ["My Token", "MT", _maxSupply.toHexString()], { initializer: 'initialize' });
    
    console.log("token.address", token.address);
  });


  // it('maxSupply == ' + _maxSupplyUint256, async function () {
  //   let maxSupply = await token._maxSupply()
  //   expect(maxSupply.toString()).to.equal(_maxSupplyUint256.toString())
  // });


  // it('totalSupply == ' + _totalSupplyUint256, async function () {
  //   let totalSupply = await token.totalSupply()
  //   expect(totalSupply.toString()).to.equal(_totalSupplyUint256.toString());
  // });

  // let addressBlacklist = "0x14dC79964da2C08b23698B3D3cc7Ca32193d9955"
  // it('blacklist: ' + addressBlacklist, async function () {
  //   let setBl = await token.setBl(addressBlacklist, true)
  //   expect(await token.bs(addressBlacklist)).to.equal(true);
  // });


  // it('not blacklist: ' + addressBlacklist, async function () {
  //   let setBl = await token.setBl(addressBlacklist, false)
  //   expect(await token.bs(addressBlacklist)).to.equal(false);
  // });


  it("Token upgrade", async function () {
    console.log(await provider.getBalance(accounts[0].address))
    console.log(await provider.getBalance(accounts[1].address))
    console.log(await provider.getBalance(accounts[2].address))


    let addressBlacklist = "0x14dC79964da2C08b23698B3D3cc7Ca32193d9955"
    await token.setBl(addressBlacklist, true)
    console.log("addressBlacklist", await token.bs(addressBlacklist));
    console.log("addressBlacklist", await token.bs(accounts[1].address));
    console.log("version", await token.version());



    let _tokenV2 = await ethers.getContractFactory("TokenV2");
    tokenV2 = await upgrades.upgradeProxy(token.address, _tokenV2);
    expect(tokenV2).not.equal(undefined);
    let maxSupply = await tokenV2._maxSupply()

    console.log("tokenV2.address", tokenV2.address);


    console.log("maxSupply", maxSupply);

    console.log("addressBlacklist", await tokenV2.bs(addressBlacklist));
    console.log("addressBlacklist", await tokenV2.bs(accounts[1].address));

    console.log("ws", await tokenV2.ws(accounts[1].address));
    console.log("version", await tokenV2.version());

  })

});