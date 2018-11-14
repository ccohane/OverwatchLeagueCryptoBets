pragma solidity ^0.4.18;


import "./oraclizeAPI_4_25.sol";

contract stage1WinnerDataSource is usingOraclize {

    uint public stage1Winner; 

    mapping(bytes32 => bool) validIds; // used for validating Query IDs
    uint constant gasLimitForOraclize = 175000; // gas limit for Oraclize callback

    event LogOraclizeQuery(string description);
    event LogStage1Winner(uint number);

    constructor() public {
        oraclize_setProof(proofType_TLSNotary | proofStorage_IPFS);
        oraclize_setCustomGasPrice(1000000000 wei); // 1 Gwei
    }

    function getStage1Winner() public payable {
        require(msg.value >= 0.000175 ether,""); // 175,000 gas * 1 Gwei = 0.000175 ETH
        bytes32 queryId = oraclize_query("URL", "json(https://api.overwatchleague.com/schedule).data.stages.1.matches.61.winner.id");        
        emit LogOraclizeQuery("Oraclize query was sent for stage 1 winner, standing by for the answer..");
        validIds[queryId] = true;
    }
    
    function __callback(bytes32 queryId, string result, bytes proof) public {
        require(msg.sender == oraclize_cbAddress(),"");
        require(validIds[queryId],"");
        stage1Winner = parseInt(result); 
        emit LogStage1Winner(stage1Winner); 
        validIds[queryId] = false;
    }
}

contract stage1Team1DataSource is usingOraclize {

    uint public stage1Team1; 

    mapping(bytes32 => bool) validIds; // used for validating Query IDs
    uint constant gasLimitForOraclize = 175000; // gas limit for Oraclize callback

    event LogOraclizeQuery(string description);
    event LogStage1Winner(uint number);

    constructor() public {
        oraclize_setProof(proofType_TLSNotary | proofStorage_IPFS);
        oraclize_setCustomGasPrice(1000000000 wei); // 1 Gwei
    }

    function getStage1Team1() public payable {
        require(msg.value >= 0.000175 ether,""); // 175,000 gas * 1 Gwei = 0.000175 ETH
        bytes32 queryId = oraclize_query("URL", "json(https://api.overwatchleague.com/schedule).data.stages.1.matches.61.competitors.0.id");        
        emit LogOraclizeQuery("Oraclize query was sent for stage 1 Team1, standing by for the answer..");
        validIds[queryId] = true;
    }
    
    function __callback(bytes32 queryId, string result, bytes proof) public {
        require(msg.sender == oraclize_cbAddress(),"");
        require(validIds[queryId],"");
        stage1Team1 = parseInt(result); 
        emit LogStage1Winner(stage1Team1); 
        validIds[queryId] = false;
    }
}

contract stage1Team2DataSource is usingOraclize {

    uint public stage1Team2; 

    mapping(bytes32 => bool) validIds; // used for validating Query IDs
    uint constant gasLimitForOraclize = 175000; // gas limit for Oraclize callback

    event LogOraclizeQuery(string description);
    event LogStage1Winner(uint number);

    constructor() public {
        oraclize_setProof(proofType_TLSNotary | proofStorage_IPFS);
        oraclize_setCustomGasPrice(1000000000 wei); // 1 Gwei
    }

    function getStage1Team2() public payable {
        require(msg.value >= 0.000175 ether,""); // 175,000 gas * 1 Gwei = 0.000175 ETH
        bytes32 queryId = oraclize_query("URL", "json(https://api.overwatchleague.com/schedule).data.stages.1.matches.61.competitors.1.id");        
        emit LogOraclizeQuery("Oraclize query was sent for stage 1 Team2, standing by for the answer..");
        validIds[queryId] = true;
    }
    
    function __callback(bytes32 queryId, string result, bytes proof) public {
        require(msg.sender == oraclize_cbAddress(),"");
        require(validIds[queryId],"");
        stage1Team2 = parseInt(result); 
        emit LogStage1Winner(stage1Team2); 
        validIds[queryId] = false;
    }
}

contract stage2WinnerDataSource is usingOraclize {

    uint public stage2Winner; 

    mapping(bytes32 => bool) validIds; // used for validating Query IDs
    uint constant gasLimitForOraclize = 175000; // gas limit for Oraclize callback

    event LogOraclizeQuery(string description);
    event LogStage2Winner(uint number);

    constructor() public {
        oraclize_setProof(proofType_TLSNotary | proofStorage_IPFS);
        oraclize_setCustomGasPrice(1000000000 wei); // 1 Gwei
    }

    function getStage2Winner() public payable {
        require(msg.value >= 0.000175 ether,""); // 175,000 gas * 1 Gwei = 0.000175 ETH
        bytes32 queryId = oraclize_query("URL", "json(https://api.overwatchleague.com/schedule).data.stages.2.matches.61.winner.id");        
        emit LogOraclizeQuery("Oraclize query was sent for stage 2 winner, standing by for the answer..");
        validIds[queryId] = true;
    }
    
    function __callback(bytes32 queryId, string result, bytes proof) public {
        require(msg.sender == oraclize_cbAddress(),"");
        require(validIds[queryId],"");
        stage2Winner = parseInt(result); 
        emit LogStage2Winner(stage2Winner); 
        validIds[queryId] = false;
    }
}

contract stage2Team1DataSource is usingOraclize {

    uint public stage2Team1; 

    mapping(bytes32 => bool) validIds; // used for validating Query IDs
    uint constant gasLimitForOraclize = 175000; // gas limit for Oraclize callback

    event LogOraclizeQuery(string description);
    event LogStage1Winner(uint number);

    constructor() public {
        oraclize_setProof(proofType_TLSNotary | proofStorage_IPFS);
        oraclize_setCustomGasPrice(1000000000 wei); // 1 Gwei
    }

    function getStage2Team1() public payable {
        require(msg.value >= 0.000175 ether,""); // 175,000 gas * 1 Gwei = 0.000175 ETH
        bytes32 queryId = oraclize_query("URL", "json(https://api.overwatchleague.com/schedule).data.stages.2.matches.61.competitors.0.id");        
        emit LogOraclizeQuery("Oraclize query was sent for stage 2 Team1, standing by for the answer..");
        validIds[queryId] = true;
    }
    
    function __callback(bytes32 queryId, string result, bytes proof) public {
        require(msg.sender == oraclize_cbAddress(),"");
        require(validIds[queryId],"");
        stage2Team1 = parseInt(result); 
        emit LogStage1Winner(stage2Team1); 
        validIds[queryId] = false;
    }
}

contract stage2Team2DataSource is usingOraclize {

    uint public stage2Team2; 

    mapping(bytes32 => bool) validIds; // used for validating Query IDs
    uint constant gasLimitForOraclize = 175000; // gas limit for Oraclize callback

    event LogOraclizeQuery(string description);
    event LogStage2Winner(uint number);

    constructor() public {
        oraclize_setProof(proofType_TLSNotary | proofStorage_IPFS);
        oraclize_setCustomGasPrice(1000000000 wei); // 1 Gwei
    }

    function getStage2Team2() public payable {
        require(msg.value >= 0.000175 ether,""); // 175,000 gas * 1 Gwei = 0.000175 ETH
        bytes32 queryId = oraclize_query("URL", "json(https://api.overwatchleague.com/schedule).data.stages.2.matches.61.competitors.1.id");        
        emit LogOraclizeQuery("Oraclize query was sent for stage 2 Team2, standing by for the answer..");
        validIds[queryId] = true;
    }
    
    function __callback(bytes32 queryId, string result, bytes proof) public {
        require(msg.sender == oraclize_cbAddress(),"");
        require(validIds[queryId],"");
        stage2Team2 = parseInt(result); 
        emit LogStage2Winner(stage2Team2); 
        validIds[queryId] = false;
    }
}

contract stage3WinnerDataSource is usingOraclize {

    uint public stage3Winner; 

    mapping(bytes32 => bool) validIds; // used for validating Query IDs
    uint constant gasLimitForOraclize = 175000; // gas limit for Oraclize callback

    event LogOraclizeQuery(string description);
    event LogStage3Winner(uint number);

    constructor() public {
        oraclize_setProof(proofType_TLSNotary | proofStorage_IPFS);
        oraclize_setCustomGasPrice(1000000000 wei); // 1 Gwei
    }

    function getStage3Winner() public payable {
        require(msg.value >= 0.000175 ether,""); // 175,000 gas * 1 Gwei = 0.000175 ETH
        bytes32 queryId = oraclize_query("URL", "json(https://api.overwatchleague.com/schedule).data.stages.3.matches.62.winner.id");        
        emit LogOraclizeQuery("Oraclize query was sent for stage 3 winner, standing by for the answer..");
        validIds[queryId] = true;
    }
    
    function __callback(bytes32 queryId, string result, bytes proof) public {
        require(msg.sender == oraclize_cbAddress(),"");
        require(validIds[queryId],"");
        stage3Winner = parseInt(result); 
        emit LogStage3Winner(stage3Winner); 
        validIds[queryId] = false;
    }
}

contract stage3Team1DataSource is usingOraclize {

    uint public stage3Team1; 

    mapping(bytes32 => bool) validIds; // used for validating Query IDs
    uint constant gasLimitForOraclize = 175000; // gas limit for Oraclize callback

    event LogOraclizeQuery(string description);
    event LogStage3Winner(uint number);

    constructor() public {
        oraclize_setProof(proofType_TLSNotary | proofStorage_IPFS);
        oraclize_setCustomGasPrice(1000000000 wei); // 1 Gwei
    }

    function getStage3Team1() public payable {
        require(msg.value >= 0.000175 ether,""); // 175,000 gas * 1 Gwei = 0.000175 ETH
        bytes32 queryId = oraclize_query("URL", "json(https://api.overwatchleague.com/schedule).data.stages.3.matches.62.competitors.0.id");        
        emit LogOraclizeQuery("Oraclize query was sent for stage 3 Team1, standing by for the answer..");
        validIds[queryId] = true;
    }
    
    function __callback(bytes32 queryId, string result, bytes proof) public {
        require(msg.sender == oraclize_cbAddress(),"");
        require(validIds[queryId],"");
        stage3Team1 = parseInt(result); 
        emit LogStage3Winner(stage3Team1); 
        validIds[queryId] = false;
    }
}

contract stage3Team2DataSource is usingOraclize {

    uint public stage3Team2; 

    mapping(bytes32 => bool) validIds; // used for validating Query IDs
    uint constant gasLimitForOraclize = 175000; // gas limit for Oraclize callback

    event LogOraclizeQuery(string description);
    event LogStage3Winner(uint number);

    constructor() public {
        oraclize_setProof(proofType_TLSNotary | proofStorage_IPFS);
        oraclize_setCustomGasPrice(1000000000 wei); // 1 Gwei
    }

    function getStage3Team2() public payable {
        require(msg.value >= 0.000175 ether,""); // 175,000 gas * 1 Gwei = 0.000175 ETH
        bytes32 queryId = oraclize_query("URL", "json(https://api.overwatchleague.com/schedule).data.stages.3.matches.62.competitors.1.id");        
        emit LogOraclizeQuery("Oraclize query was sent for stage 3 Team2, standing by for the answer..");
        validIds[queryId] = true;
    }
    
    function __callback(bytes32 queryId, string result, bytes proof) public {
        require(msg.sender == oraclize_cbAddress(),"");
        require(validIds[queryId],"");
        stage3Team2 = parseInt(result); 
        emit LogStage3Winner(stage3Team2); 
        validIds[queryId] = false;
    }
}

contract stage4WinnerDataSource is usingOraclize {

    uint public stage4Winner; 

    mapping(bytes32 => bool) validIds; // used for validating Query IDs
    uint constant gasLimitForOraclize = 175000; // gas limit for Oraclize callback

    event LogOraclizeQuery(string description);
    event LogStage4Winner(uint number);

    constructor() public {
        oraclize_setProof(proofType_TLSNotary | proofStorage_IPFS);
        oraclize_setCustomGasPrice(1000000000 wei); // 1 Gwei
    }

    function getStage4Winner() public payable {
        require(msg.value >= 0.000175 ether,""); // 175,000 gas * 1 Gwei = 0.000175 ETH
        bytes32 queryId = oraclize_query("URL", "json(https://api.overwatchleague.com/schedule).data.stages.4.matches.62.winner.id");        
        emit LogOraclizeQuery("Oraclize query was sent for stage 4 winner, standing by for the answer..");
        validIds[queryId] = true;
    }
    
    function __callback(bytes32 queryId, string result, bytes proof) public {
        require(msg.sender == oraclize_cbAddress(),"");
        require(validIds[queryId],"");
        stage4Winner = parseInt(result); 
        emit LogStage4Winner(stage4Winner); 
        validIds[queryId] = false;
    }
}

contract stage4Team1DataSource is usingOraclize {

    uint public stage4Team1; 

    mapping(bytes32 => bool) validIds; // used for validating Query IDs
    uint constant gasLimitForOraclize = 175000; // gas limit for Oraclize callback

    event LogOraclizeQuery(string description);
    event LogStage4Winner(uint number);

    constructor() public {
        oraclize_setProof(proofType_TLSNotary | proofStorage_IPFS);
        oraclize_setCustomGasPrice(1000000000 wei); // 1 Gwei
    }

    function getStage4Team1() public payable {
        require(msg.value >= 0.000175 ether,""); // 175,000 gas * 1 Gwei = 0.000175 ETH
        bytes32 queryId = oraclize_query("URL", "json(https://api.overwatchleague.com/schedule).data.stages.4.matches.62.competitors.0.id");        
        emit LogOraclizeQuery("Oraclize query was sent for stage 4 Team1, standing by for the answer..");
        validIds[queryId] = true;
    }
    
    function __callback(bytes32 queryId, string result, bytes proof) public {
        require(msg.sender == oraclize_cbAddress(),"");
        require(validIds[queryId],"");
        stage4Team1 = parseInt(result); 
        emit LogStage4Winner(stage4Team1); 
        validIds[queryId] = false;
    }
}

contract stage4Team2DataSource is usingOraclize {

    uint public stage4Team2; 

    mapping(bytes32 => bool) validIds; // used for validating Query IDs
    uint constant gasLimitForOraclize = 175000; // gas limit for Oraclize callback

    event LogOraclizeQuery(string description);
    event LogStage4Winner(uint number);

    constructor() public {
        oraclize_setProof(proofType_TLSNotary | proofStorage_IPFS);
        oraclize_setCustomGasPrice(1000000000 wei); // 1 Gwei
    }

    function getStage4Team2() public payable {
        require(msg.value >= 0.000175 ether,""); // 175,000 gas * 1 Gwei = 0.000175 ETH
        bytes32 queryId = oraclize_query("URL", "json(https://api.overwatchleague.com/schedule).data.stages.4.matches.62.competitors.1.id");        
        emit LogOraclizeQuery("Oraclize query was sent for stage 4 Team2, standing by for the answer..");
        validIds[queryId] = true;
    }
    
    function __callback(bytes32 queryId, string result, bytes proof) public {
        require(msg.sender == oraclize_cbAddress(),"");
        require(validIds[queryId],"");
        stage4Team2 = parseInt(result); 
        emit LogStage4Winner(stage4Team2); 
        validIds[queryId] = false;
    }
}

contract playoffWinnerDataSource is usingOraclize {

    uint public playoffWinner; 

    mapping(bytes32 => bool) validIds; // used for validating Query IDs
    uint constant gasLimitForOraclize = 175000; // gas limit for Oraclize callback

    event LogOraclizeQuery(string description);
    event LogPlayoffWinner(uint number);

    constructor() public {
        oraclize_setProof(proofType_TLSNotary | proofStorage_IPFS);
        oraclize_setCustomGasPrice(1000000000 wei); // 1 Gwei
    }

    function getPlayoffWinner() public payable {
        require(msg.value >= 0.000175 ether,""); // 175,000 gas * 1 Gwei = 0.000175 ETH
        bytes32 queryId = oraclize_query("URL", "json(https://api.overwatchleague.com/schedule).data.stages.5.matches.11.winner.id");        
        emit LogOraclizeQuery("Oraclize query was sent for playoff winner, standing by for the answer..");
        validIds[queryId] = true;
    }
    
    function __callback(bytes32 queryId, string result, bytes proof) public {
        require(msg.sender == oraclize_cbAddress(),"");
        require(validIds[queryId],"");
        playoffWinner = parseInt(result); 
        emit LogPlayoffWinner(playoffWinner); 
        validIds[queryId] = false;
    }
}

contract playoffTeam1DataSource is usingOraclize {

    uint public playoffTeam1; 

    mapping(bytes32 => bool) validIds; // used for validating Query IDs
    uint constant gasLimitForOraclize = 175000; // gas limit for Oraclize callback

    event LogOraclizeQuery(string description);
    event LogPlayoffWinner(uint number);

    constructor() public {
        oraclize_setProof(proofType_TLSNotary | proofStorage_IPFS);
        oraclize_setCustomGasPrice(1000000000 wei); // 1 Gwei
    }

    function getPlayoffTeam1() public payable {
        require(msg.value >= 0.000175 ether,""); // 175,000 gas * 1 Gwei = 0.000175 ETH
        bytes32 queryId = oraclize_query("URL", "json(https://api.overwatchleague.com/schedule).data.stages.5.matches.11.competitors.0.id");        
        emit LogOraclizeQuery("Oraclize query was sent for playoff Team1, standing by for the answer..");
        validIds[queryId] = true;
    }
    
    function __callback(bytes32 queryId, string result, bytes proof) public {
        require(msg.sender == oraclize_cbAddress(),"");
        require(validIds[queryId],"");
        playoffTeam1 = parseInt(result); 
        emit LogPlayoffWinner(playoffTeam1); 
        validIds[queryId] = false;
    }
}

contract playoffTeam2DataSource is usingOraclize {

    uint public playoffTeam2; 

    mapping(bytes32 => bool) validIds; // used for validating Query IDs
    uint constant gasLimitForOraclize = 175000; // gas limit for Oraclize callback

    event LogOraclizeQuery(string description);
    event LogPlayoffWinner(uint number);

    constructor() public {
        oraclize_setProof(proofType_TLSNotary | proofStorage_IPFS);
        oraclize_setCustomGasPrice(1000000000 wei); // 1 Gwei
    }

    function getPlayoffTeam2() public payable {
        require(msg.value >= 0.000175 ether,""); // 175,000 gas * 1 Gwei = 0.000175 ETH
        bytes32 queryId = oraclize_query("URL", "json(https://api.overwatchleague.com/schedule).data.stages.5.matches.11.competitors.1.id");        
        emit LogOraclizeQuery("Oraclize query was sent for playoff Team2, standing by for the answer..");
        validIds[queryId] = true;
    }
    
    function __callback(bytes32 queryId, string result, bytes proof) public {
        require(msg.sender == oraclize_cbAddress(),"");
        require(validIds[queryId],"");
        playoffTeam2 = parseInt(result); 
        emit LogPlayoffWinner(playoffTeam2); 
        validIds[queryId] = false;
    }
}