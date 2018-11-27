import React, { Component } from 'react';
import {Grid,Row,Col} from 'react-bootstrap';
import getWeb3 from './utils/getWeb3.js';
import BettingContract from './contracts/CoreLayer.json';
import './App.css';

class Withdrawal extends Component {
    constructor(){
        super();
        this.state={
          web3: '',
        }
        this.withdrawal = this.withdrawal.bind(this);
      }

      componentDidMount(){
        getWeb3.then(results => {
          /*After getting web3, we save the informations of the web3 user by
          editing the state variables of the component */
          results.web3.eth.getAccounts( (error,acc) => {
            //this.setState is used to edit the state variables
            this.setState({
              web3: results.web3
            })
          });
          //At the end of the first promise, we return the loaded web3
          return results.web3
        }).then(results => {
          //In the next promise, we pass web3 (in results) to the getAmount function
          this.withdrawal(results)
        }).catch( () => {
          //If no web3 provider was found, log it in the console
          console.log('Error finding web3.')
        })
      }

      withdrawal(web3){
        //Get the contract
        const contract = require('truffle-contract');
        const Betting = contract(BettingContract);
        Betting.setProvider(web3.currentProvider);
        var BettingInstance;
        web3.eth.getAccounts((error, accounts) => {
          Betting.deployed().then((instance) => {
          //Instantiate the contract in a promise
            BettingInstance = instance
          }).then((result) => {
            console.log("deployed");
            BettingInstance._withdrawPrize(1)
            .then((result) => {
                console.log("withdrawal prize");
            })
        });
      })
      }


      render(){
        return(
          <div>
            <hr/>
            <button className="btn btn-primary btn-block" onClick={this.withdrawal}>Collect Winnings</button>
          </div>
        )
}
}
export default Withdrawal;