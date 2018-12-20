import React, { Component } from 'react';
import './App.css';


class SmartContract extends Component {
    constructor(){
        super();
        this.state={
          githubEmbed: ''
        }
      }

    render(){
    
    return(
        <div>
            <hr/>
            
            <a class="btn btn-primary" href="https://github.com/ccohane/OverwatchLeagueCryptoBets/blob/master/bet/contracts/Betting.sol" target="_blank" role="button" aria-expanded="false">
                Smart Contract Code
            </a>
            
        </div>
    )}

}
export default SmartContract;