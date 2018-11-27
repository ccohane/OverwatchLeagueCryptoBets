import React, { Component } from 'react';
import {Grid,Row,Col} from 'react-bootstrap';
import getWeb3 from './utils/getWeb3.js';
import BettingContract from './contracts/CoreLayer.json';
import './App.css';

class Profile extends Component {
    constructor(){
        super();
        this.state={
          web3: '',
          Tokens: '',
        }
        this.getTokens = this.getTokens.bind(this);

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
          this.getTokens(results)
        }).catch( () => {
          //If no web3 provider was found, log it in the console
          console.log('Error finding web3.')
        })
      }

      getTokens(web3){
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
            console.log("this work");
            BettingInstance.tokensOfOwner(accounts[0])
            .then((tokenIds) => {
              console.log('made it past tokens of owner')
              console.log(tokenIds)
              const tokens = [];
              for(var i =0;i<tokenIds.length; i++){
                tokens.push(BettingInstance.getToken(tokenIds[i]));
              }
              this.state.Tokens = tokens;
              console.log(this.state.Tokens)
            });
        });
      })
      }


      render(){
        return(
          <div>
            <h3>Your Tokens</h3>
            <h4> Total Tokens : {this.state.Tokens.length} </h4>
            <hr/>
            
            <hr/>
            
          </div>
        )
}
}
export default Profile;