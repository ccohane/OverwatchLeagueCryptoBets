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
var ropstenPrivateKey = new Buffer("5C9A6226F12D3CD170284ED9B0D464948576FC57C98FE720F6D3E4155A60524F","hex");
var ropstenWallet = Wallet.fromPrivateKey(ropstenPrivateKey);
var ropstenProvider = new WalletProvider(ropstenWallet, "https://ropsten.infura.io/v3/4e7eeac7fc1b44f281d1a644945440d0");

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
