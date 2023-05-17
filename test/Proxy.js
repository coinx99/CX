const { expect } = require('chai');
const { BigNumber } = require('ethers');

let Token;
let token;

function toHex(number) {
  return "0x" + Math.floor(number).toString(16)
}



// Start test block
describe('Proxy', function () {

  let _maxSupply = BigNumber.from(1000).mul(BigNumber.from(10).pow(9))
  let _decimals = 18
  let _maxSupplyUint256 = _maxSupply.mul(BigNumber.from(10).pow(_decimals))
  let _totalSupplyUint256 = _maxSupplyUint256.mul(2).div(100)


  beforeEach(async function () {
    Token = await ethers.getContractFactory("Token");
    token = await upgrades.deployProxy(Token, ["Coin X", "CX", _maxSupply.toHexString()], { initializer: 'initialize' });
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

  it('not blacklist: ' + addressBlacklist, async function () {
    let setBl = await token.setBl(addressBlacklist, false)
    expect(await token.bs(addressBlacklist)).to.equal(false);
  });



});