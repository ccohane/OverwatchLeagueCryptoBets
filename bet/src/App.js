import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import getWeb3 from './utils/getWeb3.js';
import {Grid,Row,Col} from 'react-bootstrap';
import CoreLayer from './contracts/CoreLayer.json';
import Profile from './Profile';
import BuildToken from './BuildToken';
import Admin from './Admin';
//import Withdrawal from './Withdrawal';


class App extends Component {

  constructor(){
    super(); //This is needed in every constructor to allow the use of 'this'
    //We define the two variables we need in the state of our component, so they can be updated
    this.state = {
      web3 : '',
      address: '',
      poolSize: '',
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

      });
    }).catch( () => {
      //If no web3 provider was found, log it in the console
      console.log('Error finding web3.')
    })
  }

  getPoolSize(){
    const contract = require('truffle-contract');
    const Betting = contract(CoreLayer);
    console.log(this.state.web3.currentProvider)
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
  const Betting = contract(BettingContract);
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
        const tokens = [];
        for(var i =0;i<tokenIds.length; i++){
          tokens.push(BettingInstance.getToken(tokenIds[i])
          .then((stage) => {
            tokens={Stage: stage[0].toNumber(), Winner: stage[1].toNumber() , Runner: stage[2].toNumber(), Time: stage[3].toNumber()}
            return tokens;
          })
          )
        }
        this.setState({
          Tokens: tokens,
        })
        console.log(this.state.Tokens)
      });
  });
})
}
  

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
          <div id='Tokens'></div>
          <Row><Profile/></Row>
          <Row>
            <div> 
              <h2>Stage 1 Pool Size</h2>
              <p>{this.state.poolSize} Ether</p>
            </div>
          </Row>
          <Row><BuildToken/></Row>
          <Row></Row>

          <Row><Admin/></Row>

        </Grid>
      </div>
    );
  }
  }



export default App;
