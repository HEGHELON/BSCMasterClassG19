pragma solidity ^0.5.0;
import "./StarToken.sol";
import "./DaiToken.sol";

contract TokenFarm {
    //All code goes here...
    string public name = "Star Token Farm";
    StarToken public starToken;
    DaiToken public daiToken;
    address owner;

    address[] public stakers;
    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;
      

    constructor(StarToken _starToken, DaiToken _daiToken) public {
        starToken = _starToken;
        daiToken = _daiToken;
        owner = msg.sender;
    }
    // 1. Stake Tokens (Deposits)

    function stakeTokens(uint _amount) public {
        // Require amount greater than 0
        require(_amount >0, "amount cannot be 0");
         
        // Transfer Mock Dai tokens to this contract for staking
        daiToken.transferFrom(msg.sender, address(this), _amount);

        // Update staking balance
        stakingBalance[msg.sender] += _amount;

        // Add user to stakers array *only* if they haven't staked already
        if(!hasStaked[msg.sender]){
            stakers.push(msg.sender);
        }
        // Update staking status
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

    // 2. Unstaking Tokens (Withdraw)
      function unstakeTokens() public{
        // Fetch staking balance
        uint balance = stakingBalance[msg.sender];

        // Require amoount greater than 0 
        require(balance > 0, "staking balance cannot be 0");

        // Transfer Mock Dai tokens to this contract for staking
        daiToken.transfer(msg.sender, balance);
        // Reset staking balance
        stakingBalance[msg.sender] = 0;
        // Update Staking Status
        isStaking[msg.sender] = false;

      }
      // 3. Issuing Tokens
      function issueToken() public {
        //   Only owner can call this function
          require(msg.sender ==owner, "caller must be owner");

        //   Issue tokens to all stakers
          for(uint i=0; i <stakers.length; i++){
              address recipient = stakers[i];
              uint balance = stakingBalance[recipient];
              if(balance >0){
              starToken.transfer(recipient, balance);
              }

          }
      }


    
}  
