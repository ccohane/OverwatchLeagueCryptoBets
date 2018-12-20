import React, { Component } from 'react';
import './App.css';


class SmartContract extends Component {
    constructor(){
        super();
        this.state={
          
        }
        this.SmartContract = this.SmartContract.bind(this);
      }

    render(){
    
    return(
        <div>
            <hr/>
            <p>
            <a class="btn btn-primary" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                Smart Contract Code
            </a>
            </p>
            <div class="collapse" id="collapseExample">
            <SyntaxHighlighter language='javascript' style={docco}>{codeString}</SyntaxHighlighter>

            </div>
        </div>
    )}

}
export default SmartContract;