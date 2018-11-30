import React, { Component } from 'react';
//import {Grid,Row,Col} from 'react-bootstrap';
import getWeb3 from './utils/getWeb3.js';
import CoreLayer from './contracts/CoreLayer.json';
import './App.css';
import $ from 'jquery';

class Withdrawal extends Component {
    constructor(){
        super();
        this.state={
          web3: '',
          //finalResults: false,
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
          //this.withdrawal(results)
        }).catch( () => {
          //If no web3 provider was found, log it in the console
          console.log('Error finding web3.')
        })
      }

      withdrawal(){
        //Get the contract
        console.log("withdrawal function ")
        const contract = require('truffle-contract');
        const Betting = contract(CoreLayer);
        Betting.setProvider(this.state.web3.currentProvider);
        var BettingInstance;
        this.state.web3.eth.getAccounts((error, accounts) => {
          Betting.deployed().then((instance) => {
          //Instantiate the contract in a promise
            BettingInstance = instance
          }).then((result) => {
            console.log("deployed" , accounts[0]);

            BettingInstance._withdrawPrize(1, {from: accounts[0]})
            .then((result) => {
              console.log("passed blockchain withdrawal")
              $("#message").empty();
              $("#message").append( 'Waiting for Blockchain Transaction ')
                console.log("withdrawal prize");
            })
        });
      })
      }


      render(){
        console.log(this.state.finalResults)
        if(this.state.finalResults === undefined){
        return(
          <div>
            <hr/>
            <button className="btn btn-primary btn-block" onClick={this.withdrawal}>Collect Winnings</button>
            <div id="message"></div>
          </div>
        )}
        else{
          return(
            <div>
              <p>Finals Results have not been determined yet. 
                When results come in you will be able to withdrawal your ether</p>
            </div>
          )
        }
}
}
export default Withdrawal;