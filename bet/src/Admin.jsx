import React, { Component } from 'react';
import {Grid,Row,Col} from 'react-bootstrap';
import getWeb3 from './utils/getWeb3.js';
import BettingContract from './contracts/CoreLayer.json';
import './App.css';

class Admin extends Component {
    constructor(){
        super();
        this.state={
          web3: '',
        }
        this.getWinners = this.getWinners.bind(this);

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
          this.getWinners(results)
        }).catch( () => {
          //If no web3 provider was found, log it in the console
          console.log('Error finding web3.')
        })
      }

      getWinners(web3){
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
            BettingInstance.StageResults(1,4410,4403)
            .then((result) => {
                console.log("StageResults set");
            })
        });
      })
      }

      SetAdmin(web3){
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
            BettingInstance.SetAdmin(accounts[0])
            .then((result) => {
                console.log("Admin set as "+ accounts[0]);
            })
        });
      })
      }


      render(){
        return(
          <div>
            <hr/>
            <button className="btn btn-primary btn-block" onClick={this.SetAdmin}>Set Admin</button>
            <hr/>
            <button className="btn btn-primary btn-block" onClick={this.StageResults}>Get Stage Results</button>
          </div>
        )
}
}
export default Admin;