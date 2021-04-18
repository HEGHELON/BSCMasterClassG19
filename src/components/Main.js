import React, { Component } from 'react'
import dai from '../dai.png'


class Main extends Component {

 

  render() {
    return (
      <div id="content" className="mt-3 bg-muted">
        <table className="table table-borderless text-muted text-center">
          <thead>
             <tr>
                 <th scope= "col" className=" font-weight-bold bg-success text-white">Staking Balance</th>
                 <th scope="col" className=" font-weight-bold bg-success text-white">Reward Balance</th>
             </tr>
          </thead>
          <tbody>
              <tr >
                  <td className="font-weight-bold text-success">{window.web3.utils.fromWei(this.props.stakingBalance, 'Ether' )} mDAI</td>
                  <td className="font-weight-bold text-success">{window.web3.utils.fromWei(this.props.starTokenBalance, 'Ether' )} STAR</td>

              </tr>
          </tbody>
          </table>

          <div className ="card mb-4">
              <div className="card-body">
                  <form className="mb-3" onSubmit={(event) =>{
                      event.preventDefault()
                      let amount
                      amount = this.input.value.toString()
                      amount = window.web3.utils.toWei(amount, 'Ether')
                      this.props.stakeTokens(amount)
                  }}>
                  <div > 
                      <label className="float-left text-success font-weight-bold"><b>Stake Tokens</b></label>
                      <span className="float-right text-success font-weight-bold">
                          Balance: {window.web3.utils.fromWei(this.props.daiTokenBalance, 'Ether')}
                      </span>
                      </div>
                    <div className="input-group mb-b4">
                    < input
                    type = "text"
                    ref={(input)=>{this.input = input}}
                    className="form-control form-control-lg"
                    placeholder="0"
                    required />
                    <div className="input-group-append">
                        <div className="input-group-text">
                            <img src={dai} height='32' alt=""/>
                            &nbsp;&nbsp;&nbsp; <span className=" font-weight-bold text-dark">mDAI</span>
                        </div>
                    </div>
                     </div>
                     <br/>
                     <button type="submit" className="float-left btn btn-success btn-sm font-weight-bold w-25 p-3" >  STAKE </button>

                    <button 
                    type = "submit"
                    className =" float-right btn btn-success btn-sm text-white font-weight-bold w-25 p-3"
                    onClick={(event) =>{
                    event.preventDefault()
                    this.props.unstakeTokens()
                    }}>
                    UN-STAKE
                    </button>
                    </form>
                    <div>
                   
                    </div>
                   
              </div>
              
          </div>
       
      </div>
    );
  }
}

export default Main;
