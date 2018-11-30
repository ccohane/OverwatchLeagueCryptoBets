import React, { Component } from 'react';
import {Grid,Row,Col} from 'react-bootstrap';
import getWeb3 from './utils/getWeb3.js';
import CoreLayer from './contracts/CoreLayer.json';
import './App.css';


class BuildToken extends Component {
    constructor(){
        super();
        this.state={
          web3: '',
          address: "",
          InputAmount: '.1',
          weiConversion : 1000000000000000000
        }
        this.BuildToken = this.BuildToken.bind(this);
      }

      componentDidMount(){
        getWeb3.then(results => {
          /*After getting web3, we save the informations of the web3 user by
          editing the state variables of the component */
          results.web3.eth.getAccounts( (error,acc) => {
            //this.setState is used to edit the state variables
            this.setState({
              web3: results.web3,
              address: acc[0],
            })
          });
          //At the end of the first promise, we return the loaded web3
          console.log("got web3 in BT")
          return results.web3
        }).catch( () => {
          //If no web3 provider was found, log it in the console
          console.log('Error finding web3.')
        })
      }
    
      BuildToken(){
        console.log("I made it here") 
        const contract = require('truffle-contract');
        const Betting = contract(CoreLayer);
        console.log(this.state.web3.currentProvider)
        Betting.setProvider(this.state.web3.currentProvider);
        var BettingInstance;
        this.state.web3.eth.getAccounts((error, accounts) => {
            Betting.deployed().then((instance) => {
                BettingInstance = instance
              console.log("I deployed")
            })
            .then((result) => {
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
              // Get the value from the contract to prove it worked.
              console.log('I am about to build a token! \n Yup')  
             console.log(WinningTeam , RunnerUp)
             console.log(accounts[0]);
             //BettingInstance.setAdmin(accounts[0])
             BettingInstance.buildToken.sendTransaction(1,WinningTeam,RunnerUp , {from: accounts[0],value: this.state.InputAmount*this.state.weiConversion, gas: 4600000})
             //BettingInstance.buildToken(1,10,11).send({from: accounts[0],value: this.state.InputAmount*this.state.weiConversion, gas: 4600000})
            })
              .then((result) => {
                  console.log('result')
              
            }).catch(() => {
              console.log("Error with betting")
            }) 
        })
        }
      

      render(){
        return(

    <div className="card">
        <div className="card-body">
            <div id="txStatus"></div>
            <form name="stage" className="form-signin">
                <h2 className="card-title">Pick a Team To Win</h2>
                <Grid>
          {/*corresponding to class="row"*/}
          <Row>
            {/* we define the two columns. The bootstrap grid is divided by 12
            parts so if we want two columns, they will take 6 parts each */}
            <Col xs={3} sm={3}> 
            <div className="form-check form-check-inline ">
                <input className="form-check-input" type="checkbox" name="Winner" value="4402"/>
                <label className="form-check-label" htmlFor="inlineCheckbox1">Boston Uprising</label>
                </div>
                <div className="form-check form-check-inline ml-2">
                <input className="form-check-input" type="checkbox" name="Winner" value="4523"/>
                <label className="form-check-label" htmlFor="inlineCheckbox2">Dallas Fuel</label>
                </div>
                <div className="form-check form-check-inline ml-1">
                <input className="form-check-input" type="checkbox" name="Winner" value="4407"/>
                <label className="form-check-label" htmlFor="inlineCheckbox3">Florida Mayhem</label>
                </div>
                <div className="form-check form-check-inline ml-1">
                <input className="form-check-input" type="checkbox" name="Winner" value="4525"/>
                <label className="form-check-label" htmlFor="inlineCheckbox4">Houston Outlaws</label>
                </div>
                <div className="form-check form-check-inline ml-1">
                <input className="form-check-input" type="checkbox" name="Winner" value="4410"/>
                <label className="form-check-label" htmlFor="inlineCheckbox5">London Spitfire</label>
                </div>
        {/*We will import Team A component here */}
                </Col>
            <Col xs={3} sm={3}> <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" name="Winner" value="4406"/>
                <label className="form-check-label" htmlFor="inlineCheckbox6">Los Angeles Gladiators</label>
                </div>
                <div className="form-check form-check-inline ml-1">
                <input className="form-check-input" type="checkbox" name="Winner" value="4405"/>
                <label className="form-check-label" htmlFor="inlineCheckbox7">Los Angeles Valiant</label>
                </div>
                <div className="form-check form-check-inline ml-1">
                <input className="form-check-input" type="checkbox" name="Winner" value="4403"/>
                <label className="form-check-label" htmlFor="inlineCheckbox8">New York Excelsior</label>
                </div>
                <div className="form-check form-check-inline ml-1">
                <input className="form-check-input" type="checkbox" name="Winner" value="4524"/>
                <label className="form-check-label" htmlFor="inlineCheckbox9">Philadelphia Fushion</label>
                </div>
                <div className="form-check form-check-inline ml-1">
                <input className="form-check-input" type="checkbox" name="Winner" value="4404"/>
                <label className="form-check-label" htmlFor="inlineCheckbox10">San Francisco Shock</label>
                </div>
            {/*We will import Team B component here */}</Col>
            <Col xs={3} sm={3}>
            
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" name="Winner" value="4409"/>
                <label className="form-check-label" htmlFor="inlineCheckbox11">Seoul Dynasty</label>
                </div>
                <div className="form-check form-check-inline ml-2">
                <input className="form-check-input" type="checkbox" name="Winner" value="4408"/>
                <label className="form-check-label" htmlFor="inlineCheckbox12">Shanghai Dragons</label>
                </div>
                <div className="form-check form-check-inline ml-1">
                <input className="form-check-input" type="checkbox" name="Winner" value="13"/>
                <label className="form-check-label" htmlFor="inlineCheckbox13">Atlanta</label>
                </div>
                <div className="form-check form-check-inline ml-1">
                <input className="form-check-input" type="checkbox" name="Winner" value="14"/>
                <label className="form-check-label" htmlFor="inlineCheckbox14">Guangzhou</label>
                </div>
                <div className="form-check form-check-inline ml-1">
                <input className="form-check-input" type="checkbox" name="Winner" value="15"/>
                <label className="form-check-label" htmlFor="inlineCheckbox15">Chengdu</label>
                </div>
            
            </Col>
            <Col xs={3} sm={3}>
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" name="Winner" value="16"/>
                <label className="form-check-label" htmlFor="inlineCheckbox16">Hangzhou</label>
                </div>
                <div className="form-check form-check-inline ml-2">
                <input className="form-check-input" type="checkbox" name="Winner" value="17"/>
                <label className="form-check-label" htmlFor="inlineCheckbox17">Paris</label>
                </div>
                <div className="form-check form-check-inline ml-1">
                <input className="form-check-input" type="checkbox" name="Winner" value="18"/>
                <label className="form-check-label" htmlFor="inlineCheckbox18">Toronto</label>
                </div> 
                <div className="form-check form-check-inline ml-1">
                <input className="form-check-input" type="checkbox" name="Winner" value="19"/>
                <label className="form-check-label" htmlFor="inlineCheckbox19">Vancouver</label>
                </div>
                <div className="form-check form-check-inline ml-1">
                <input className="form-check-input" type="checkbox" name="Winner" value="20"/>
                <label className="form-check-label" htmlFor="inlineCheckbox20">Washington, D.C</label>
                </div>
               
            </Col>
          </Row>
          <Row>
          <h2 className="card-title">Pick a Team To Come In Second Place!</h2>
              <Col xs={3} sm={3}>
              <div className="form-check form-check-inline ">
                <input className="form-check-input" type="checkbox" name="RunnerUp" value="4402"/>
                <label className="form-check-label" htmlFor="inlineCheckbox1">Boston Uprising</label>
                </div>
                <div className="form-check form-check-inline ml-2">
                <input className="form-check-input" type="checkbox" name="RunnerUp" value="4523"/>
                <label className="form-check-label" htmlFor="inlineCheckbox2">Dallas Fuel</label>
                </div>
                <div className="form-check form-check-inline ml-1">
                <input className="form-check-input" type="checkbox" name="RunnerUp" value="4407"/>
                <label className="form-check-label" htmlFor="inlineCheckbox3">Florida Mayhem</label>
                </div>
                <div className="form-check form-check-inline ml-1">
                <input className="form-check-input" type="checkbox" name="RunnerUp" value="4525"/>
                <label className="form-check-label" htmlFor="inlineCheckbox4">Houston Outlaws</label>
                </div>
                <div className="form-check form-check-inline ml-1">
                <input className="form-check-input" type="checkbox" name="RunnerUp" value="4410"/>
                <label className="form-check-label" htmlFor="inlineCheckbox5">London Spitfire</label>
                </div>
                
              </Col>
              <Col xs={3} sm={3}>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" name="RunnerUp" value="4406"/>
                <label className="form-check-label" htmlFor="inlineCheckbox6">Los Angeles Gladiators</label>
                </div>
                <div className="form-check form-check-inline ml-1">
                <input className="form-check-input" type="checkbox" name="RunnerUp" value="4405"/>
                <label className="form-check-label" htmlFor="inlineCheckbox7">Los Angeles Valiant</label>
                </div>
                <div className="form-check form-check-inline ml-1">
                <input className="form-check-input" type="checkbox" name="RunnerUp" value="4403"/>
                <label className="form-check-label" htmlFor="inlineCheckbox8">New York Excelsior</label>
                </div>
                <div className="form-check form-check-inline ml-1">
                <input className="form-check-input" type="checkbox" name="RunnerUp" value="4524"/>
                <label className="form-check-label" htmlFor="inlineCheckbox9">Philadelphia Fushion</label>
                </div>
                <div className="form-check form-check-inline ml-1">
                <input className="form-check-input" type="checkbox" name="RunnerUp" value="4404"/>
                <label className="form-check-label" htmlFor="inlineCheckbox10">San Francisco Shock</label>
                </div>
               
              </Col>
              <Col xs={3} sm={3}>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" name="RunnerUp" value="4409"/>
                <label className="form-check-label" htmlFor="inlineCheckbox11">Seoul Dynasty</label>
                </div>
                <div className="form-check form-check-inline ml-2">
                <input className="form-check-input" type="checkbox" name="RunnerUp" value="4408"/>
                <label className="form-check-label" htmlFor="inlineCheckbox12">Shanghai Dragons</label>
                </div>
                <div className="form-check form-check-inline ml-1">
                <input className="form-check-input" type="checkbox" name="RunnerUp" value="13"/>
                <label className="form-check-label" htmlFor="inlineCheckbox13">Atlanta</label>
                </div>
                <div className="form-check form-check-inline ml-1">
                <input className="form-check-input" type="checkbox" name="RunnerUp" value="14"/>
                <label className="form-check-label" htmlFor="inlineCheckbox14">Guangzhou</label>
                </div>
                <div className="form-check form-check-inline ml-1">
                <input className="form-check-input" type="checkbox" name="RunnerUp" value="15"/>
                <label className="form-check-label" htmlFor="inlineCheckbox15">Chengdu</label>
                </div>
                
              </Col>
              <Col xs={3} sm={3}>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" name="RunnerUp" value="16"/>
                <label className="form-check-label" htmlFor="inlineCheckbox16">Hangzhou</label>
                </div>
                <div className="form-check form-check-inline ml-2">
                <input className="form-check-input" type="checkbox" name="RunnerUp" value="17"/>
                <label className="form-check-label" htmlFor="inlineCheckbox17">Paris</label>
                </div>
                <div className="form-check form-check-inline ml-1">
                <input className="form-check-input" type="checkbox" name="RunnerUp" value="18"/>
                <label className="form-check-label" htmlFor="inlineCheckbox18">Toronto</label>
                </div> 
                <div className="form-check form-check-inline ml-1">
                <input className="form-check-input" type="checkbox" name="RunnerUp" value="19"/>
                <label className="form-check-label" htmlFor="inlineCheckbox19">Vancouver</label>
                </div>
                <div className="form-check form-check-inline ml-1">
                <input className="form-check-input" type="checkbox" name="RunnerUp" value="20"/>
                <label className="form-check-label" htmlFor="inlineCheckbox20">Washington, D.C</label>
                </div>
               
              </Col>
          </Row>
        </Grid>
            <br/>
                <button className="btn btn-primary btn-block" onClick={this.BuildToken}>Build Token</button>
                </form>
                <div id="txStatus"></div>
        </div>
    </div>
        )
}
}
export default BuildToken;