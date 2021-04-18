const StarToken = artifacts.require('StarToken')
const DaiToken = artifacts.require('DaiToken')
const TokenFarm = artifacts.require('TokenFarm')

module.exports = async function(deployer, network, accounts) {
  // Deploy Mock DAI Token
  await deployer.deploy(DaiToken)
  const daiToken = await DaiToken.deployed()

   // Deploy Star Token
   await deployer.deploy(StarToken)
   const starToken = await StarToken.deployed()

  // deployer.deploy(TokenFarm);
   // Deploy TokenFarm
   await deployer.deploy(TokenFarm, starToken.address, daiToken.address)
   const tokenFarm = await TokenFarm.deployed()
   // Transfer all tokens to TokenFarm (1 million)
   await starToken.transfer(tokenFarm.address, '1000000000000000000000000' )
    
   // Transfer 100 Mock DAI tokens to investor
   await daiToken.transfer(accounts[1], '100000000000000000000')

}

  