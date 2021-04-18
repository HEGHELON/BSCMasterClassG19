const { assert } = require('chai');

const StarToken = artifacts.require('StarToken')
const DaiToken = artifacts.require('DaiToken')
const TokenFarm = artifacts.require('TokenFarm')

require('chai').use(require('chai-as-promised')).should()
function tokens(n) {
        return web3.utils.toWei(n, 'ether');
    }

contract('TokenFarm', ([owner, investor]) => {
    

    // Write tests here...
    let daiToken, starToken, tokenFarm
    before(async () => {
        // Load Contracts
         daiToken = await DaiToken.new()
         starToken = await StarToken.new()
         tokenFarm = await TokenFarm.new( starToken.address, daiToken.address)

          // Transfer all tokens to TokenFarm (1 million)
         await starToken.transfer(tokenFarm.address,tokens('1000000'))

         // Transfer 100 Mock DAI tokens to investor
        await daiToken.transfer(investor, tokens('100'), {from: owner})
    })
         
    

    describe('Mock DAI deployment', async () => {
        it('has a name', async () => {
           
            const name = await daiToken.name()
            assert.equal(name, 'Mock DAI Token')
        })
    })

    describe('Star Token deployment', async () => {
        it('has a name', async () => {
            
            const name = await starToken.name()
            assert.equal(name, 'Star Token')
        })
    })
    describe('Token Farm deployment', async () => {
        it('has a name', async () => {
            
            const name = await tokenFarm.name()
            assert.equal(name, 'Star Token Farm')
        })
     
    
    
        it('contract has tokens', async () => {
            let balance = await starToken.balanceOf(tokenFarm.address)
            
            assert.equal(balance.toString(), tokens('1000000'))
        })
    })
    
    describe('Farming tokens', async () => {
        it('rewards investors for staking mDai tokens', async () => {
            let result
            // Check investor balance before staking
            result = await daiToken.balanceOf(investor)
            assert.equal(result.toString(), tokens('100'), 'Investor Mock DAI wallet balance correct before staking')
           
            // Stake Mock DAI tokens
            await daiToken.approve(tokenFarm.address, tokens('100'), {from: investor})
            await tokenFarm.stakeTokens(tokens('100'), {from: investor})

            // Check staking result
            result = await daiToken.balanceOf(investor)
            assert.equal(result.toString(), tokens('0'), 'investor Mock DAI wallet balance correct after staking')

            result = await daiToken.balanceOf(tokenFarm.address)
            assert.equal(result.toString(), tokens('100'), 'investor staking balance correct after staking')

            result = await tokenFarm.stakingBalance(investor)
            assert.equal(result.toString(), tokens('100'), 'investor staking  balance correct after staking')

            result = await tokenFarm.isStaking(investor)
            assert.equal(result.toString(), 'true', 'investor staking status correct after staking')
            // Issue Tokens
            await tokenFarm.issueToken({from: owner})

            // Check balances after issuance
            result = await starToken.balanceOf(investor)
            assert.equal(result.toString(), tokens('100'),'investor Star Token wallet balance correct after issuance')

            // Ensure that only owner can issue tokens
            await tokenFarm.issueToken({from: investor}).should.be.rejected; 

            // Unstake tokens
            await tokenFarm.unstakeTokens({from: investor})

            // Check results ofter unstaking
            result = await daiToken.balanceOf(investor)
            assert.equal(result.toString(), tokens('100'), 'investor Mock DAI wallet balance correct after unstaking')

            result = await daiToken.balanceOf(tokenFarm.address)
            assert.equal(result.toString(), tokens('0'), 'Token Farm Mock DAI wallet balance correct after unstaking')

            result = await tokenFarm.stakingBalance(investor)
            assert.equal(result.toString(), tokens('0'), 'investor staking balance correct after unstaking')

            result = await tokenFarm.isStaking(investor)
            assert.equal(result.toString(), 'false', 'investor staking status correct after unstaking')

        })

        

    })
})