import React, { Component } from 'react';
//import {Grid,Row,Col} from 'react-bootstrap';
import getWeb3 from './utils/getWeb3.js';
import CoreLayer from './contracts/CoreLayer.json';
import './App.css';
import $ from 'jquery';

class tokenBuiltEvent extends Component {
    constructor(){
        super();
        this.state={
          
        }
        this.tokenBuiltEvent = this.tokenBuiltEvent.bind(this);
        
      }

      componentDidMount(){
        getWeb3.then(results => {
          /*After getting web3, we save the informations of the web3 user by
          editing the state variables of the component */
          results.web3.eth.getAccounts( (error,acc) => {
            //this.setState is used to edit the state variables
            console.log(results.web3)
            this.setState({
              web3: results.web3,
              address: acc[0],
            })
          });
          //At the end of the first promise, we return the loaded web3
          return results.web3
        }).then(results => {
          //In the next promise, we pass web3 (in results) to the getAmount function
          this.tokenBuiltEvent(results)
        }).catch( () => {
          //If no web3 provider was found, log it in the console
          console.log('Error finding web3.')
        })
      }

    /**
     * FIXME: create a function to render when a event is triggered on the smart contract  
     */
    tokenBuiltEvent(web3){
        const contract = require('truffle-contract');
        const Betting = contract(CoreLayer);
        Betting.setProvider(web3.currentProvider);
        var BettingInstance;
        var logTokenBuiltEvent;
        web3.eth.getAccounts((error, accounts) => {
        Betting.deployed().then((instance) => {
        //Instantiate the contract in a promise
            BettingInstance = instance
        })
        .then((result) => {
            logTokenBuiltEvent = BettingInstance.LogTokenBuilt();
            logTokenBuiltEvent.watch(function(error, result){
                if (!error)
                    {
                        $("#loader").hide();
                        $("#instructor").html(result.args.creatorAddress + ' built a token! Token: Stage ' + result.args.stage + ', First Place: '+ result.args.Winner + ', Second Place: '+ result.args.Runnerup + ', TimeStamp: '+ result.args.timeStamp);
                    } else {
                        $("#loader").hide();
                        console.log(error);
                    }
            });
        })
        })
    }
  

  render(){
    return(
      <div id='instructor'>
      </div>
    )}
}
export default tokenBuiltEvent;