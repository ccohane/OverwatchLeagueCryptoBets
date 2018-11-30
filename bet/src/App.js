import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';
import getWeb3 from './utils/getWeb3.js';
import {Grid,Row,Col,} from 'react-bootstrap';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle} from 'reactstrap';
import CoreLayer from './contracts/CoreLayer.json';
//import Profile from './Profile';
import BuildToken from './BuildToken';
import Admin from './Admin';

import Withdrawal from './Withdrawal';
import teams from './teams';


class App extends Component {

  constructor(){
    super(); //This is needed in every constructor to allow the use of 'this'
    //We define the two variables we need in the state of our component, so they can be updated
    this.state = {
      web3 : '',
      address: '',
      poolSize: '',
      finalResults: "",
    };
    this.getPoolSize = this.getPoolSize.bind(this)

  }

  componentDidMount() {
    getWeb3.then(results => {
      /*After getting web3, we save the informations of the web3 user by
      editing the state variables of the component */
      results.web3.eth.getAccounts( (error,acc) => {
        //this.setState is used to edit the state variables
        this.setState({
          address: acc[0],
          web3: results.web3, 
        })
        this.getPoolSize()
        this.getTokens(results.web3)
      });
    }).catch( () => {
      //If no web3 provider was found, log it in the console
      console.log('Error finding web3.')
    })
  }

  getPoolSize(){
    const contract = require('truffle-contract');
    const Betting = contract(CoreLayer);
    Betting.setProvider(this.state.web3.currentProvider);
    var BettingInstance;
    this.state.web3.eth.getAccounts((error, accounts) => {
        Betting.deployed().then((instance) => {
            BettingInstance = instance
        })
        .then((result) => {
          BettingInstance.stage1Pool.call()
          .then((result) => {
            console.log(result['c'][0])
            var pool = result['c'][0]
            pool = pool/10000;
            this.setState({
            poolSize: pool,
          })
          
        })
    })
  })
}
  getTokens(web3){
    $("#Tokens").empty();
    //Get the contract
    const contract = require('truffle-contract');
    const Betting = contract(CoreLayer);
    Betting.setProvider(web3.currentProvider);
    var BettingInstance;
    web3.eth.getAccounts((error, accounts) => {
      Betting.deployed().then((instance) => {
      //Instantiate the contract in a promise
        BettingInstance = instance
      })
      .then((result) => {
        console.log("this work");
        BettingInstance.tokensOfOwner(accounts[0])
        
        .then((tokenIds) => {
          console.log('made it past tokens of owner')
          var cols = tokenIds.length;
          cols = cols/12;

          for(var i =0;i<tokenIds.length; i++){
            //tokens.push(BettingInstance.getToken(tokenIds[i])
            BettingInstance.getToken(tokenIds[i])
              .then(function(token) {
              console.log(token)
              // Using ES6's "template literals" to inject variables into the HTML.
              // Append each one to our #tokens div
              $("#Tokens").append(
                `<div class="card col-sm-${cols}">
                  <img class="card-img-top" src="..." alt="Card image cap">
                  <div class="card-body">
                    <h5 class="card-title">Stage: ${token[0].toNumber()}</h5>
                    <p class="card-text">Winning Team: ${teams[token[1].toNumber()]} 
                    <br> Runner Up: ${teams[token[2].toNumber()]}</p>
                    <div class="card-footer text-muted">
                    ${token[3].toNumber()}</div>
                  </div>
                </div>`
              );
          })
    }})
  })
  })}
  

  render() {

    return (
      <div className="App">
      <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Overwatch League CryptoBets</h1>
        </header>
        <div>
          Welcome on my Overwatch League CryptoBets website <br/>
        Your Wallet address is {this.state.address}
        </div>
        {/*We define a grid*/}
        <Grid>
          {/*corresponding to class="row"*/}
          <Card><div id='Tokens' className="card-deck"></div></Card>
          
          <Row>
            <div> 
              <h2>Stage 1 Pool Size</h2>
              <p>{this.state.poolSize} Ether</p>
            </div>
          </Row>
          <Row><BuildToken/></Row>
          <Row><Withdrawal/></Row>

          <Row><Admin/></Row>

        </Grid>
      </div>
    );
  }
  }



export default App;
