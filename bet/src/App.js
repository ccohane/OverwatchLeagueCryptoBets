import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import getWeb3 from './utils/getWeb3.js';
import {Grid,Row,Col} from 'react-bootstrap';
//import Profile from './Profile.jsx';
//import BuildToken from './BuildToken';
import Profile from './Profile';
import BuildToken from './BuildToken';
import Admin from './Admin';
import Withdrawal from './Withdrawal';


class App extends Component {

  constructor(){
    super(); //This is needed in every constructor to allow the use of 'this'
    //We define the two variables we need in the state of our component, so they can be updated
    this.state = {
      web3 : '',
      address: '',
    };
  }

  componentDidMount() {
    getWeb3.then(results => {
      /*After getting web3, we save the informations of the web3 user by
      editing the state variables of the component */
      results.web3.eth.getAccounts( (error,acc) => {
        //this.setState is used to edit the state variables
        this.setState({
          address: acc[0],
          web3: results.web3
        })
      });
    }).catch( () => {
      //If no web3 provider was found, log it in the console
      console.log('Error finding web3.')
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
          <Row><Profile/></Row>
          <Row><BuildToken/></Row>
          <Row><Withdrawal/></Row>

          <Row><Admin/></Row>

        </Grid>
      </div>
    );
  }
  }



export default App;
