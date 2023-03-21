const hre = require("hardhat");
const { time } = require("@openzeppelin/test-helpers");
const NumAbbr = require('number-abbreviate');
const ARB_PROXY = "0x912CE59144191C1204E64559FE8253a0e49E6548";
const ARB_ERC20 = "0xc4ed0a9ea70d5bcc69f748547650d32cc219d882";
const DISTRIBUTOR = "0x67a24CE4321aB3aF51c2D0a4801c3E111D88C9d9";
const INITIAL_BALANCE = 1162166000;
const CLAIM_BLOCK = 16890400;

var numAbbr = new NumAbbr();

async function main() {

  var arbERC20 = await ethers.getContractAt("L2ArbitrumToken", ARB_ERC20);
  var arbProxy = await ethers.getContractAt("TransparentUpgradeableProxy", ARB_PROXY);
  var arb = arbERC20.attach(arbProxy.address);

  setInterval(async() => {
    var currentBalance = await arb.balanceOf(DISTRIBUTOR);
    currentBalance = hre.ethers.utils.formatEther(currentBalance);

    const latestBlock = await hre.ethers.provider.getBlock("latest")

    var balanceDiff = INITIAL_BALANCE - currentBalance;
    var perDiff = balanceDiff / INITIAL_BALANCE * 100;

    console.clear();
    console.log(`BLOCK: ${latestBlock.number}`)
    console.log(`ARB CLAIMED: ${numAbbr.abbreviate(balanceDiff, 2)} | ${perDiff}%`);

  }, 1000);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});