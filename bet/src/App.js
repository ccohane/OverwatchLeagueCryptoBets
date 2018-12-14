import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';
import getWeb3 from './utils/getWeb3.js';
import {Grid,Row,Col,ListGroup, ListGroupItem} from 'react-bootstrap';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, CardGroup} from 'reactstrap';
import CoreLayer from './contracts/CoreLayer.json';
//import Profile from './Profile';
import BuildToken from './BuildToken';
import Admin from './Admin';

import Withdrawal from './Withdrawal';
import teams from './teams';


//import tokenBuiltEvent from './tokenBuiltEvent';

/**
 * Future project: create 4 contracts for 4 seperate stages of OWL 
 */

class App extends Component {

  constructor(){
    super(); //This is needed in every constructor to allow the use of 'this'
    //We define the variables we need in the state of our component, so they can be updated
    /*
    web3 is instance of web3
    address is the current metamask user address 
    poolSize is the stages total pool size
    totalTokens is the total supply of tokens in the contract
    finalResults is ??? .... FIXME
    */
    this.state = {
      web3 : '',
      address: '',
      poolSize: '',
      totalTokens: '',
      finalResults: "",
    };
    this.getPoolSize = this.getPoolSize.bind(this)

  }

  /**
   * Function acts as a construtor
   * Sets web3 and calls getPoolSize function and getTokens functions
   */
  componentDidMount() {
    getWeb3.then(results => {
      /*After getting web3, we save the informations of the web3 user by
      editing the state variables of the component */
      results.web3.eth.getAccounts( (error,acc) => {
        //this.setState is used to edit the state variables
        if(acc != undefined){
          this.setState({
            address: acc[0],
            web3: results.web3, 
          })
          this.getPoolSize()
          this.getTokens(results.web3)
      }
    });
    }).catch( () => {
      //If no web3 provider was found, log it in the console
      console.log('Error finding web3.')
    })
  }

  getPoolSize(){
    /* 
    * Function makes calls to contract to get the stages pool size and total number of tokens
    */
    const contract = require('truffle-contract');
    const Betting = contract(CoreLayer);
    Betting.setProvider(this.state.web3.currentProvider);
    var BettingInstance;
    this.state.web3.eth.getAccounts((error, accounts) => {
        Betting.deployed().then((instance) => {
            BettingInstance = instance
        })
        .then((result) => {
          //Gets pool size in ether
          BettingInstance.stage1Pool.call()
          .then((result) => {
            console.log(result['c'][0])
            var pool = result['c'][0]
            pool = pool/10000;
            this.setState({
              poolSize: pool,
            })
          })
          // Gets supply of tokens
          BettingInstance.totalSupply.call()
          .then((result) => {
            console.log(result.toNumber())
            var totalTokens1 = result.toNumber()
            this.setState({
              totalTokens: totalTokens1,
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
        //Get list of token ids owned by the web3 account  
        BettingInstance.tokensOfOwner(accounts[0])
        
        .then((tokenIds) => {
          console.log('made it past tokens of owner')

          for(var i =0;i<tokenIds.length; i++){
            //Get the information about a token
            BettingInstance.getToken(tokenIds[i])
              .then(function(token) {
              console.log(token)
              //Append a card with token information to be rendered on the page
              $("#Tokens").append(
                `<div className="card ">
                 <img className="card-img-top" width="50" height="50" src=${teams[token[1].toNumber()][1]} alt="Card image cap">
                 <div className="card-body">
                   <h5 className="card-title"><b>Stage:</b> ${token[0].toNumber()}</h5>
                   <p className="card-text"><b>Winning Team</b>: ${teams[token[1].toNumber()][0]}
                   <br> <b>Runner Up</b>: ${teams[token[2].toNumber()][0]}</p>
                 </div>
               </div>`
                
              );
          })
    }})
  })
  })
  }
  
//TODO display different stages
  render() {
    return (
      <div className="App">
      <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Overwatch League CryptoBets</h1>
          <br/>
          <br/>
          <h4> Scroll Down</h4>
      </header>
        <Row style= {{backgroundColor: '#f0f5f5'}}>
          <h2>Welcome to Overwatch League CryptoBets</h2> <br/>

          <img height="200" width="250" src="https://pmcvariety.files.wordpress.com/2017/07/overwatch-league.png?w=1000&h=563&crop=1"></img>
          <br/><br/>
        Your Metamask Wallet Address is <b>{this.state.address}</b>
        </Row>
        {/*We define a grid*/}
        
          {/*corresponding to class="row"*/}
          <Row>
          
            <Col>
            <h3 style={{color:'#FF0000'}}> Install Metamask</h3>
            <ListGroup style= {{backgroundColor: '#f0f5f5'}}> 
              <ListGroupItem style= {{backgroundColor: '#f0f5f5'}}>To use OWL Cryptobets you need to install Metamask's Chrome Extension</ListGroupItem>
              <ListGroupItem >Click here to install <a href="https://metamask.io/">Metamask</a> and create a Metmask account</ListGroupItem>
              <ListGroupItem style= {{backgroundColor: '#f0f5f5'}}>Click on the Metamask Extention Icon and change the networks at the top from the Main Ethereum Network to the Ropsten Test Network</ListGroupItem>
              <ListGroupItem >Go to <a href="https://faucet.metamask.io/"> Ropsten Faucet</a> and request 1 ether from the wallet. (This may take a few minute to process)</ListGroupItem>
              <ListGroupItem style= {{backgroundColor: '#f0f5f5'}}>Now you are ready to bet on Overwatch League Stage 1</ListGroupItem>     
            </ListGroup>
            </Col>
            
          </Row>
          <h3 style={{color:'#FF0000'}}>Rules</h3>
        <ListGroup style= {{backgroundColor: '#f0f5f5'}}> 
          <ListGroupItem style= {{backgroundColor: '#f0f5f5'}}>Build a Token by choosing 1 team to win the Stage and 1 team to come in second place for the stage</ListGroupItem>
          <ListGroupItem >Tokens cost .1 Ether</ListGroupItem>
          <ListGroupItem style= {{backgroundColor: '#f0f5f5'}}>Users can have up to 100 tokens</ListGroupItem>
          <ListGroupItem >Winning Tokens are determined if both teams picked are correctly</ListGroupItem>
          <ListGroupItem style= {{backgroundColor: '#f0f5f5'}}>Winners can collect their prize money once the Stage has completed!</ListGroupItem>
        </ListGroup>
        <Row>
          <br/>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/iCiALLXueZY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> <br/>
           Learn more about Overwatch League <br/> <a href= "https://overwatchleague.com/en-us/about">
            Overwatch League</a>
            <br/>
          </Row>
        <Row style= {{backgroundColor: '#f0f5f5', marginLeft: 0, marginRight: 0}}>
            <Col md={6} mdPush={6}>
            <h2>Stage 1 Pool Size</h2>
            <p>{this.state.poolSize} Ether</p>
            </Col>
            <Col md={6} mdPull={6}>
            <h2>Number of Tokens</h2>
            <p>{this.state.totalTokens} Tokens</p>
            </Col>
          </Row>
          <Row>
            <BuildToken/>
            <Withdrawal/>
          </Row>
          <Admin/>
          <Row style= {{backgroundColor: '#f0f5f5'}}><tokenBuiltEvent/></Row>
          <hr/>
          <h1>Your Tokens</h1>
          <div className="card-deck" style= {{backgroundColor: '#f0f5f5'}}> 
            <CardGroup id= 'Tokens'>
            </CardGroup>
            <div id='Tokens' className="card-deck">
            </div> 
          </div>

          <hr/>
          <p>Creator: Callahan Cohane</p>
          <p>Email: Ccohane@gmail.com</p>
      </div>
    );
  }
  }



export default App;
