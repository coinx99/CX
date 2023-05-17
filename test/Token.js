const { expect } = require('chai');
 
let Token;
let token;
 
// Start test block
describe('Token', function () {
  beforeEach(async function () {
    Token = await ethers.getContractFactory("Token");
    token = await Token.deploy();
    await token.deployed();
  });
 
  // Test case
  it('retrieve returns a value previously stored', async function () {
    // Store a value
    await token.store(42);
 
    // Test if the returned value is the same one
    // Note that we need to use strings to compare the 256 bit integers
    expect((await token.retrieve()).toString()).to.equal('42');
  });
});