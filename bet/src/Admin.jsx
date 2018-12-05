import React, { Component } from 'react';
//import {Grid,Row,Col} from 'react-bootstrap';
import getWeb3 from './utils/getWeb3.js';
import CoreLayer from './contracts/CoreLayer.json';
import './App.css';

class Admin extends Component {
    constructor(){
        super();
        this.state={
          web3: '',
          address: "",
        }
        this.getWinners = this.getWinners.bind(this);
        this.SetAdmin = this.SetAdmin.bind(this);
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
          //this.SetAdmin(results)
        }).catch( () => {
          //If no web3 provider was found, log it in the console
          console.log('Error finding web3.')
        })
      }

      /**
       * Allows administrator to input the winning and runner up to the smart contract
       * Called when Get stage results button is pressed 
       */
      getWinners(){
        //Get the contract
        const contract = require('truffle-contract');
        const Betting = contract(CoreLayer);
        Betting.setProvider(this.state.web3.currentProvider);
        var BettingInstance;
        this.state.web3.eth.getAccounts((error, accounts) => {
          Betting.deployed().then((instance) => {
          //Instantiate the contract in a promise
            BettingInstance = instance
          }).then((result) => {
            console.log("deployed");
            //Gets the inputs from the admin for the winning team and runner up 
            var tokenForm = document.stage;
                var WinningTeam = "";
                var RunnerUp = "";
                var i;
                for (i = 0; i < tokenForm.length; i++) {
                    if (tokenForm[i].name === "Winner" && tokenForm[i].checked) {
                        WinningTeam = tokenForm[i].value;
                        if(WinningTeam){
                            console.log("Here")
                        }
                    } else if(tokenForm[i].name === "RunnerUp" && tokenForm[i].checked){
                        RunnerUp = tokenForm[i].value;
                        if(RunnerUp){
                            console.log("Here1")
                        }
                    }
                }
                //Sends winning token to the smart contract 
            BettingInstance.StageResults(1,WinningTeam,RunnerUp, {from : accounts[0]})
            .then((result) => {
              this.setState({
                finalResults: true,
              })
                console.log("StageResults set");
            })
        });
      })
      }

      /**
       * Fail safe to set admin to correct admin address
       */
      SetAdmin(){
        //Get the contract
        console.log("set admin function")
        const contract = require('truffle-contract');
        const Betting = contract(CoreLayer);
        Betting.setProvider(this.state.web3.currentProvider);
        var BettingInstance;
        this.state.web3.eth.getAccounts((error, accounts) => {
          Betting.deployed().then((instance) => {
          //Instantiate the contract in a promise
            BettingInstance = instance
          }).then((result) => {
            console.log("deployed in set admin");
            BettingInstance.adminAddress.call().then(value => {
              console.log(value)
            })
            BettingInstance.setAdmin('0xDd8A98ace58C038497bA8196A0c682613F7b4161')
            .then((result) => {
                console.log("Admin set as "+ accounts[0]);
            })
        });
      })
      }


      render(){
        //Only renders if the metamask address is the admin
        if(this.state.address === "0xDd8A98ace58C038497bA8196A0c682613F7b4161"){
        return(
          <div>
            <hr/>
            <button className="btn btn-primary btn-block" onClick={this.SetAdmin}>Set Admin</button>
            <hr/>
            <button className="btn btn-primary btn-block" onClick={this.getWinners}>Get Stage Results</button>
          </div>
        )}
        else{
          return (<p></p> )
        }
}
}
export default Admin;