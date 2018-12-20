pragma solidity ^0.4.22;
//pragma experimental ABIEncoderV2;

//import "./testingDataCalls.sol";


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

contract DataLayer{
    using SafeMath for *;

    address public adminAddress = 0xDd8A98ace58C038497bA8196A0c682613F7b4161;

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

    
    // List of all tokens
    Token[] public tokens;
    Stage1Winners[] public stage1Winners;
    bool public stage1Ended = false;

    // List of all tokens that won 
    uint256[] Stage1WinningTokens;

    mapping (address => uint256[]) public tokensOfOwnerMap;
    mapping (uint256 => address) public ownerOfTokenMap;
    mapping (uint256 => address) public tokensApprovedMap;
    mapping (uint256 => bool) public tokenToWinnerMap; 
    mapping (address => bool) public recievedPrizeMoneyMap;

    event LogTokenBuilt(address creatorAddress, uint256 tokenId, uint8 stage, uint Winner, uint Runnerup, uint64 timeStamp);
    event LogPoolSize(uint money, uint stage);

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

    modifier hasNotRecievedPrize(){
        require(recievedPrizeMoneyMap[msg.sender] != true, "You already withdrew your prize money ");
        _;
    }

    modifier checkStage1Ended(){
        require(stage1Ended != false, "Stage has not ended yet");
        _;
    }


    /**
    * @dev Transfer contract's ownership
    * @param _newAdmin Address to be set
    */
    function setAdmin(address _newAdmin) external {

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
    * @param userAddress - The address to check.
    * @param tokenId - ID of the token that needs to be verified.
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
* @title CoreLayer
* @author Callahan Cohane
* @notice Main contract
*/
contract CoreLayer is OverwatchLeagueToken{

    using SafeMath for *;
    uint256 public stage1Pool;  
    uint256 public stage1Payout;
    
    event LogPayout(uint payout);
    event LogWinners(uint winners, uint[] tokenList, uint prize, uint stage1Pool);

    constructor() public {
        adminAddress = msg.sender;
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
    function buildToken(uint8 Stage, uint WinningTeam, uint RunnerUp) public payable{
        if(Stage == 1){
            require(stage1Ended == false, "Stage 1 has ended");
        }
        Token memory token = Token({
            Stage: Stage,
            WinningTeam: WinningTeam,
            RunnerUp: RunnerUp,
            timeStamp: uint64(now)
        });

        require(msg.sender != address(0), "Address equals address 0");
        require(tokensOfOwnerMap[msg.sender].length < 100, "Reach individual token limit");

        uint256 tokenId = tokens.push(token) - 1;
        uint256 pool = msg.value;
        stage1Pool = stage1Pool.add(pool);
        

        _setTokenOwner(msg.sender, tokenId);
        emit LogTokenBuilt(msg.sender, tokenId, tokens[tokenId].Stage, tokens[tokenId].WinningTeam, tokens[tokenId].RunnerUp, tokens[tokenId].timeStamp);
        emit LogPoolSize(stage1Pool, Stage);
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

    function StageResults(uint Stage, uint winner, uint runner) external onlyAdmin {
        if(Stage == 1){
            Stage1Winners memory stage1Win = Stage1Winners(winner,runner);
            stage1Winners.push(stage1Win);
            checkStage1Winners();
            getPayout(Stage);
            stage1Ended = true;
        }       
    }


    /**
    * @notice Allows any user to retrieve their asigned prize. This would be the sum of the price of all the tokens
    * owned by the caller of this function.
    * @dev If the caller has no prize, the function will revert costing no gas to the caller.
    */
    function _withdrawPrize(uint Stage) external payable hasNotRecievedPrize checkStage1Ended{
        uint256 prize = 0;
        uint256[] memory tokenList = tokensOfOwnerMap[msg.sender];
        uint winners = 0;
        if(Stage == 1){
            for(uint256 i = 0;i < tokenList.length; i++){
                if(tokenToWinnerMap[tokenList[i]]){
                    winners = winners.add(1);
                }
            }
            prize = winners.mul(stage1Payout);
            if(prize>0){
                msg.sender.transfer(prize);
                stage1Pool = stage1Pool.sub(prize);
                emit LogWinners(winners,tokenList,prize, stage1Pool);
                winners = 0;
                recievedPrizeMoneyMap[msg.sender] = true;
            }else {
                emit LogWinners(winners,tokenList,prize, stage1Pool); 
                recievedPrizeMoneyMap[msg.sender] = true;
            }
        }
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

    function getPayout(uint Stage) internal onlyAdmin {
        if(Stage == 1){
            stage1Payout = stage1Pool.div(Stage1WinningTokens.length);
            emit LogPayout(stage1Payout);
            
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