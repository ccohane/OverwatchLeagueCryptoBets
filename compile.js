const path = require('path');
const fs = require('fs');
const solc = require('solc');
const owlPath = path.resolve("run", 'contracts', 'overwatch.sol');
const source = fs.readFileSync(owlPath, 'UTF-8');

console.log(solc.compile(source,1).contracts[':CoreLayer'])

//module.exports = solc.compile(source, 1).contracts[':Hello'];