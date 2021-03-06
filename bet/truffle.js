/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a 
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() { 
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>') 
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */

var WalletProvider = require("truffle-wallet-provider");
const Wallet = require('ethereumjs-wallet');
//Configuration for ropsten test network using infura account
var ropstenPrivateKey = new Buffer("5C9A6226F12D3CD170284ED9B0D464948576FC57C98FE720F6D3E4155A60524F","hex");
var ropstenWallet = Wallet.fromPrivateKey(ropstenPrivateKey);
var ropstenProvider = new WalletProvider(ropstenWallet, "https://ropsten.infura.io/v3/b0e2bc022dd54924b00776fe72d4bbe4");

//Configuration for rinkeby test network using infura account
//Do not use Rinkeby provider because getting fake ether is very not cool
var rinkebyPrivateKey = new Buffer("5C9A6226F12D3CD170284ED9B0D464948576FC57C98FE720F6D3E4155A60524F","hex");
var rinkebyWallet = Wallet.fromPrivateKey(rinkebyPrivateKey);
var rinkebyProvider = new WalletProvider(rinkebyWallet, "https://rinkeby.infura.io/v3/3d00da48ab1b46f7b6c32d8ede6ce694");


module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*", // Match any network id
    },
    ropsten: {
      provider: ropstenProvider,
      gas: 4600000,
      network_id: 3
    },
    rinkeby: {
      provider: rinkebyProvider,
      network_id: 4,
      gas: 5000000,
    },

  }
};
