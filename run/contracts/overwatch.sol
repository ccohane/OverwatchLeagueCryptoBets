pragma solidity ^0.4.22;
pragma experimental ABIEncoderV2;

import "./testingDataCalls.sol";


/**
 * @title SafeMath
 * @dev Math operations with safety checks that throw on error
 */
library SafeMath {

    /**
    * @dev Multiplies two numbers, throws on overflow.
    */
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        if (a == 0) {
            return 0;
        }
        uint256 c = a * b;
        assert(c / a == b);
        return c;
    }

  /**
  * @dev Integer division of two numbers, truncating the quotient.
  */
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        // assert(b > 0); // Solidity automatically throws when dividing by 0
        uint256 c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold
        return c;
    }

  /**
  * @dev Subtracts two numbers, throws on overflow (i.e. if subtrahend is greater than minuend).
  */
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        assert(b <= a);
        return a - b;
    }

  /**
  * @dev Adds two numbers, throws on overflow.
  */
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        assert(c >= a);
        return c;
    }
}


///Author Dieter Shirley (https://github.com/dete)
contract ERC721 {

    event LogTransfer(address from, address to, uint256 tokenId);
    event LogApproval(address owner, address approved, uint256 tokenId);

    function name() public view returns (string);
    function symbol() public view returns (string);
    function totalSupply() public view returns (uint256 total);
    function balanceOf(address _owner) public view returns (uint256 balance);
    function ownerOf(uint256 _tokenId) external view returns (address owner);
    function approve(address _to, uint256 _tokenId) external;
    function transfer(address _to, uint256 _tokenId) external;
    function transferFrom(address _from, address _to, uint256 _tokenId) external;
    function tokensOfOwner(address _owner) external view returns (uint256[] tokenIds);

}


/**
* @title DataLayer.
* @author Callahan Cohane
*/
contract DataLayer{
    
    uint256 constant OWLTOKEN_CREATION_LIMIT = 5000000;
    uint256 constant STARTING_PRICE = 50 finney;
    
    /// Epoch times for when each stage starts.
    uint256 constant FIRST_PHASE  = 1547146800; 
    uint256 constant SECOND_PHASE  = 1550775600;
    uint256 constant THIRD_PHASE  = 1554404400;
    uint256 constant FOURTH_PHASE  = 1558033200;   
    uint256 constant PLAYOFF_PHASE  = 1562871600;

    /// Pool amounts
    uint256 adminPool =0;
    uint256 stage1Pool =0;
    uint256 stage2Pool =0;
    uint256 stage3Pool =0;
    uint256 stage4Pool =0;
    uint256 playoffPool =0;

    /// payout amount per winner token, calculated by (stage prize pool * .9 )/amount ofwinning tokens  
    uint256 stage1Payout = 0;
    uint256 stage2Payout = 0;
    uint256 stage3Payout = 0;
    uint256 stage4Payout = 0;
    uint256 playoffPayout = 0;

    address public adminAddress;
    uint256 public deploymentTime;

    /**
    * WinningTeam   TeamId of a predicted stage winner
    * RunnerUp      TeamId of a predicted stage runner up
    * Stage         Stage Chosen (1,2,3,4,5  --- 5 being playoffs)
    * timeStamp     Creation timestamp
    */
    struct Token {
        uint WinningTeam;
        uint RunnerUp;
        uint64 timeStamp;
        uint8 Stage;
    }

    struct Stage1Winners {
        uint WinningTeam;
        uint RunnerUp;
    }

    struct Stage2Winners {
        uint WinningTeam;
        uint RunnerUp;
    }

    struct Stage3Winners {
        uint WinningTeam;
        uint RunnerUp;
    }

    struct Stage4Winners {
        uint WinningTeam;
        uint RunnerUp;
    }

    struct PlayoffWinner {
        uint WinningTeam;
        uint RunnerUp;
    }
    
    // List of all tokens
    Token[] public tokens;

    Stage1Winners[] public stage1Winners;
    Stage2Winners[] public stage2Winners;
    Stage3Winners[] public stage3Winners;
    Stage4Winners[] public stage4Winners;
    PlayoffWinner[] public playoffWinners;

    // List of all tokens that won 
    uint256[] Stage1WinningTokens;
    uint256[] Stage2WinningTokens;
    uint256[] Stage3WinningTokens;
    uint256[] Stage4WinningTokens;
    uint256[] PlayoffWinningTokens;

    mapping (address => uint256[]) public tokensOfOwnerMap;
    mapping (uint256 => address) public ownerOfTokenMap;
    mapping (uint256 => address) public tokensApprovedMap;
    mapping (uint256 => bool) public tokenToWinnerMap; 
    

    event LogTokenBuilt(address creatorAddress, uint256 tokenId, Token token);

}


/**
* @title AccessControlLayer
* @author Callahan Cohane
* @dev Containes basic admin modifiers to restrict access to some functions. Allows
* for pauseing, and setting emergency stops.
*/
contract AccessControlLayer is DataLayer{

   /**
   * @dev Main modifier to limit access to delicate functions.
   */
    modifier onlyAdmin() {
        require(msg.sender == adminAddress,"Not admin");
        _;
    }


    /**
    * @dev Transfer contract's ownership
    * @param _newAdmin Address to be set
    */
    function setAdmin(address _newAdmin) external onlyAdmin {

        require(_newAdmin != address(0), "New admin cannot equals address 0.");
        adminAddress = _newAdmin;
    }
}


/**
* @title OverwatchLeagueToken, main implemantations of the ERC721 standard
* @author Callahan Cohane
*/
contract OverwatchLeagueToken is AccessControlLayer, ERC721 {

    //FUNCTIONALTIY
    /**
    * @notice checks if a user owns a token
    * @param userAddress - The address to check.
    * @param tokenId - ID of the token that needs to be verified.
    * @return true if the userAddress provided owns the token.
    */
    function _userOwnsToken(address userAddress, uint256 tokenId) internal view returns (bool){
        return ownerOfTokenMap[tokenId] == userAddress;
    }

    /**
    * @notice checks if the address provided is approved for a given token 
    * @param userAddress 
    * @param tokenId 
    * @return true if it is aproved
    */
    function _tokenIsApproved(address userAddress, uint256 tokenId) internal view returns (bool) {
        return tokensApprovedMap[tokenId] == userAddress;
    }

    /**
    * @notice transfers the token specified from sneder address to receiver address.
    * @param fromAddress the sender address that initially holds the token.
    * @param toAddress the receipient of the token.
    * @param tokenId ID of the token that will be sent.
    */
    function _transfer(address fromAddress, address toAddress, uint256 tokenId) internal {

        require(tokensOfOwnerMap[toAddress].length < 100, " ");
        
        tokensOfOwnerMap[toAddress].push(tokenId);
        ownerOfTokenMap[tokenId] = toAddress;

        uint256[] storage tokenArray = tokensOfOwnerMap[fromAddress];
        for (uint256 i = 0; i < tokenArray.length; i++){
            if(tokenArray[i] == tokenId){
                tokenArray[i] = tokenArray[tokenArray.length-1];
            }
        }
        delete tokenArray[tokenArray.length-1];
        tokenArray.length--;

        delete tokensApprovedMap[tokenId];

    }

    /**
    * @notice Approve the address for a given token
    * @param tokenId - ID of token to be approved
    * @param userAddress - Address that will be approved
    */
    function _approve(uint256 tokenId, address userAddress) internal {
        tokensApprovedMap[tokenId] = userAddress;
    }

    /**
    * @notice set token owner to an address
    * @dev sets token owner on the contract data structures
    * @param ownerAddress address to be set
    * @param tokenId Id of token to be used
    */
    function _setTokenOwner(address ownerAddress, uint256 tokenId) internal{

        tokensOfOwnerMap[ownerAddress].push(tokenId);
        ownerOfTokenMap[tokenId] = ownerAddress;
    
    }

    //ERC721 INTERFACE
    function name() public view returns (string){
        return "OverwatchLeagueToken";
    }

    function symbol() public view returns (string){
        return "OWLT";
    }

    function balanceOf(address userAddress) public view returns (uint256 count) {
        return tokensOfOwnerMap[userAddress].length;

    }

    function transfer(address toAddress,uint256 tokenId) external {

        require(toAddress != address(0)," ");
        require(toAddress != address(this)," ");
        require(_userOwnsToken(msg.sender, tokenId)," ");

        _transfer(msg.sender, toAddress, tokenId);
        emit LogTransfer(msg.sender, toAddress, tokenId);

    }

    function transferFrom(address fromAddress, address toAddress, uint256 tokenId) external {

        require(toAddress != address(0)," ");
        require(toAddress != address(this)," ");
        require(_tokenIsApproved(msg.sender, tokenId)," ");
        require(_userOwnsToken(fromAddress, tokenId)," ");

        _transfer(fromAddress, toAddress, tokenId);
        emit LogTransfer(fromAddress, toAddress, tokenId);

    }

    function approve( address toAddress, uint256 tokenId) external {

        require(toAddress != address(0)," ");
        require(_userOwnsToken(msg.sender, tokenId)," ");

        _approve(tokenId, toAddress);
        emit LogApproval(msg.sender, toAddress, tokenId);

    }

    function totalSupply() public view returns (uint) {

        return tokens.length;

    }

    function ownerOf(uint256 tokenId) external view returns (address ownerAddress) {

        ownerAddress = ownerOfTokenMap[tokenId];
        require(ownerAddress != address(0)," ");

    }

    function tokensOfOwner(address ownerAddress) external view returns(uint256[] tokenIds) {

        tokenIds = tokensOfOwnerMap[ownerAddress];

    }


}


/**
* @title GameLogicLayer, contract in charge of everything related to calculating points, asigning
* winners, and distributing prizes.
* @author Callahan Cohane
*/
contract GameLogicLayer is OverwatchLeagueToken, stage1WinnerDataSource, stage1Team1DataSource, stage1Team2DataSource, stage2WinnerDataSource, stage2Team1DataSource, stage2Team2DataSource,stage3WinnerDataSource, stage3Team1DataSource, stage3Team2DataSource,stage4WinnerDataSource, stage4Team1DataSource, stage4Team2DataSource,playoffWinnerDataSource,playoffTeam1DataSource,playoffTeam2DataSource{

    using SafeMath for *;

    function addPoolSize(uint Stage, uint amount) internal {
        if(Stage == 1){
            stage1Pool.add(amount);
        } else if(Stage == 2){
            stage2Pool.add(amount);
        } else if(Stage == 3){
            stage3Pool.add(amount);
        } else if(Stage == 4){
            stage4Pool.add(amount);
        } else if(Stage == 5){
            playoffPool.add(amount);
        }
    }

    function addAdminPool(uint amount) internal{
        adminPool.add(amount);
    }
    
    function getStage1() internal onlyAdmin{
        getStage1Winner();
        getStage1Team1();
        getStage1Team2();
        uint winner = stage1Winner;
        uint team1 = stage1Team1;
        uint team2 = stage1Team2;
        if(winner == team1){
            uint runner = team2;
        } else {
            runner = team1;
        }
        Stage1Winners memory stage1Win = Stage1Winners(winner,runner);
        stage1Winners.push(stage1Win);
    }

    function getStage2() internal onlyAdmin{
        getStage2Winner();
        getStage2Team1();
        getStage2Team2();
        uint winner = stage2Winner;
        uint team1 = stage2Team1;
        uint team2 = stage2Team2;
        if(winner == team1){
            uint runner = team2;
        } else {
            runner = team1;
        }
        Stage2Winners memory stage2Win = Stage2Winners(winner,runner);
        stage2Winners.push(stage2Win);
    }

    function getStage3() internal onlyAdmin{
        getStage3Winner();
        getStage3Team1();
        getStage3Team2();
        uint winner = stage3Winner;
        uint team1 = stage3Team1;
        uint team2 = stage3Team2;
        if(winner == team1){
            uint runner = team2;
        } else {
            runner = team1;
        }
        Stage3Winners memory stage3Win = Stage3Winners(winner,runner);
        stage3Winners.push(stage3Win);
    }

    function getStage4() internal onlyAdmin{
        getStage4Winner();
        getStage4Team1();
        getStage4Team2();
        uint winner = stage4Winner;
        uint team1 = stage4Team1;
        uint team2 = stage4Team2;
        if(winner == team1){
            uint runner = team2;
        } else {
            runner = team1;
        }
        Stage4Winners memory stage4Win = Stage4Winners(winner,runner);
        stage4Winners.push(stage4Win);
    }

    function getPlayoffs() internal onlyAdmin{
        getPlayoffWinner();
        getPlayoffTeam1();
        getPlayoffTeam2();
        uint winner = playoffWinner;
        uint team1 = playoffTeam1;
        uint team2 = playoffTeam2;
        if(winner == team1){
            uint runner = team2;
        } else {
            runner = team1;
        }
        PlayoffWinner memory playoffWin = PlayoffWinner(winner,runner);
        playoffWinners.push(playoffWin);
    }

    function checkStage1Winners() internal onlyAdmin {

        for(uint i = 0; i < tokens.length; i++){
            if(tokens[i].Stage == 1 && tokens[i].WinningTeam == stage1Winners[0].WinningTeam && tokens[i].RunnerUp == stage1Winners[0].RunnerUp){
                Stage1WinningTokens.push(i);
                tokenToWinnerMap[i] = true;
            } else {
                tokenToWinnerMap[i] = false;
            }
        }
    }
    function checkStage2Winners() internal onlyAdmin {

        for(uint i = 0; i<tokens.length; i++){
            if(tokens[i].Stage == 2 && tokens[i].WinningTeam == stage2Winners[0].WinningTeam && tokens[i].RunnerUp == stage2Winners[0].RunnerUp){
                Stage2WinningTokens.push(i);
            }
        }
    }
    function checkStage3Winners() internal onlyAdmin {

        for(uint i = 0; i<tokens.length; i++){
            if(tokens[i].Stage == 3 && tokens[i].WinningTeam == stage3Winners[0].WinningTeam && tokens[i].RunnerUp == stage3Winners[0].RunnerUp){
                Stage3WinningTokens.push(i);
            }
        }
    }
    function checkStage4Winners() internal onlyAdmin {

        for(uint i = 0; i<tokens.length; i++){
            if(tokens[i].Stage == 4 && tokens[i].WinningTeam == stage4Winners[0].WinningTeam && tokens[i].RunnerUp == stage4Winners[0].RunnerUp){
                Stage4WinningTokens.push(i);
            }
        }
    }
    function checkPlayoffWinners() internal onlyAdmin {

        for(uint i = 0; i<tokens.length; i++){
            if(tokens[i].Stage == 5 && tokens[i].WinningTeam == playoffWinners[0].WinningTeam && tokens[i].RunnerUp == playoffWinners[0].RunnerUp){
                PlayoffWinningTokens.push(i);
            }
        }
    }
    function getPayout(uint Stage) internal onlyAdmin {
        if(Stage == 1){

            stage1Payout = stage1Pool.div(Stage1WinningTokens.length);

        } else if(Stage == 2){

            stage2Payout = stage2Pool.div(Stage2WinningTokens.length);

        } else if(Stage == 3){

            stage3Payout = stage3Pool.div(Stage3WinningTokens.length);

        } else if(Stage == 4){

            stage4Payout = stage4Pool.div(Stage4WinningTokens.length);

        } else if(Stage == 5){

            playoffPayout = playoffPool.div(PlayoffWinningTokens.length);
        }
        
    }

}


/**
* @title CoreLayer
* @author Callahan Cohane
* @notice Main contract
*/
contract CoreLayer is GameLogicLayer{

    constructor() public {
        adminAddress = msg.sender;
        deploymentTime = now;
    }

    /** 
    * @dev Only accept eth from the admin
    */
    function() external payable {
        require(msg.sender == adminAddress," ");
    }

    /** 
    * @notice Builds ERC721 token with the predictions provided by the user.
    * @param Stage  - Stage that is being bet on (1,2,3,4,5).
    * @param WinningTeam -  Team being bet on to win.
    * @param RunnerUp -  Team being bet on to come in second.
    * @dev An automatic timestamp is added for internal use.
    */
    function buildToken(uint8 Stage, uint WinningTeam, uint RunnerUp) external payable {
        if(Stage == 1){
            require(now <= FIRST_PHASE," ");
        } else if(Stage == 2){
            require(now <= SECOND_PHASE," ");
        } else if(Stage == 3){
            require(now <= THIRD_PHASE," ");
        } else if(Stage == 4){
            require(now <= FOURTH_PHASE," ");
        } else if(Stage == 5){
            require(now <= PLAYOFF_PHASE," ");
        }

        Token memory token = Token({
            Stage: Stage,
            WinningTeam: WinningTeam,
            RunnerUp: RunnerUp,
            timeStamp: uint64(now)
        });

        require(msg.value == _getTokenPrice(Stage), "Value doesn't equal tokens price");
        require(msg.sender != address(0), "Address equals address 0");
        require(tokens.length < OWLTOKEN_CREATION_LIMIT, "Reached tournament token limit");
        require(tokensOfOwnerMap[msg.sender].length < 100, "Reach individual token limit");
        require(now < PLAYOFF_PHASE,"Reached beginning of playoffs so no more tokens"); //Overwatch League Stage 1 Start 

        uint256 tokenId = tokens.push(token) - 1;
        uint256 pool = msg.value;
        uint256 _prizePool = (pool.mul(9)).div(10);
        uint256 _adminPool = pool.div(10);

        addPoolSize(Stage, _prizePool);
        addAdminPool(_adminPool);
        _setTokenOwner(msg.sender, tokenId);
        emit LogTokenBuilt(msg.sender, tokenId, token);

    }

    /** 
    * @param tokenId - ID of token to get.
    * @return Returns all the valuable information about a specific token.
    */
    function getToken(uint256 tokenId) external view returns (uint8 Stage, uint WinningTeam, uint RunnerUp, uint64 timeStamp) {

        Token storage token = tokens[tokenId];

        Stage = token.Stage;
        WinningTeam = token.WinningTeam;
        RunnerUp = token.RunnerUp;
        timeStamp = token.timeStamp;

    }

    /**
    * @notice Gets current token price 
    */
    function _getTokenPrice(uint Stage) internal view returns(uint256 tokenPrice){
        if(Stage == 1){
            tokenPrice = STARTING_PRICE;
        } else if(Stage == 2){
            tokenPrice = (75 finney);
        } else if(Stage == 3){
            tokenPrice = (110 finney);
        } else if(Stage == 4){
            tokenPrice = (150 finney);
        } else if(Stage == 5){
            tokenPrice = (200 finney);
        }
    }


    function StageResults(uint Stage) external onlyAdmin {
        if(Stage == 1){
            
            getStage1();
            checkStage1Winners();
        } else if(Stage == 2){
            getStage2();
            checkStage2Winners();
        } else if(Stage == 3){
            getStage3();
            checkStage3Winners();
        } else if(Stage == 4){
            getStage4();
            checkStage4Winners();
        } else if(Stage == 5){
            getPlayoffs();
            checkPlayoffWinners();
        }
        
    }


    /**
    * @notice Called by the development team once the World Cup has ended (adminPool is set) 
    * @dev Allows dev team to retrieve adminPool
    */
    function adminWithdrawBalance() external onlyAdmin {

        adminAddress.transfer(adminPool);
        adminPool = 0;

    }

    /**
    * @notice Allows any user to retrieve their asigned prize. This would be the sum of the price of all the tokens
    * owned by the caller of this function.
    * @dev If the caller has no prize, the function will revert costing no gas to the caller.
    */
    function _withdrawPrize(uint Stage) external payable{
        uint256 prize = 0;
        uint256[] memory tokenList = tokensOfOwnerMap[msg.sender];
        uint winners = 0;
        if(Stage == 1){
            for(uint256 i = 0;i < tokenList.length; i++){
                if(tokenToWinnerMap[tokenList[i]]){
                    winners.add(1);
                }
            }
            prize = winners.mul(stage1Payout);
            require(prize > 0," ");
            msg.sender.transfer(prize);
            stage1Pool.sub(prize);
            winners = 0;

        } else if(Stage == 2) {

            for(uint256 j = 0;j < tokenList.length; j++){
                if(tokenToWinnerMap[tokenList[j]]){
                    winners.add(1);
                }
            }

            prize = winners.mul(stage2Payout);
            require(prize > 0," ");
            msg.sender.transfer(prize);
            stage2Pool.sub(prize);
            winners = 0;

        } else if(Stage == 3) {

            for(uint256 l = 0;l < tokenList.length; l++){
                if(tokenToWinnerMap[tokenList[l]]){
                    winners.add(1);
                }
            }

            prize = winners.mul(stage3Payout);
            require(prize > 0," ");
            msg.sender.transfer(prize);
            stage3Pool.sub(prize);
            winners = 0;

        } else if(Stage == 4) {

            for(uint256 p = 0;p < tokenList.length; p++){
                if(tokenToWinnerMap[tokenList[p]]){
                    winners.add(1);
                }
            }

            prize = winners.mul(stage4Payout);
            require(prize > 0," ");
            msg.sender.transfer(prize);
            stage4Pool.sub(prize);
            winners = 0;

        } else if(Stage == 5) {

            for(uint256 k = 0;k < tokenList.length; k++){
                if(tokenToWinnerMap[tokenList[k]]){
                    winners.add(1);
                }
            }

            prize = winners.mul(playoffPayout);
            require(prize > 0," ");
            msg.sender.transfer(prize);
            playoffPool.sub(prize);
            winners = 0;
        }
    }

     /**
    * @notice Let the admin cash-out the entire contract balance 10 days after game has finished.
    */
    function finishedGameWithdraw() external onlyAdmin{

        uint256 balance = address(this).balance;
        adminAddress.transfer(balance);

    }
    

}

