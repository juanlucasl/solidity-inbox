const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const {contractInterface, bytecode} = require('./compile');
const keys = require('./config/keys');

const provider = new HDWalletProvider(
    keys.DEPLOYER_KEY,
    keys.INFURA_API
);
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy');

    const result = await new web3.eth.Contract(JSON.parse(contractInterface))
        .deploy({
                data: bytecode,
                arguments: ['Initial message']
            }
        )
        .send({
            gas: '1000000',
            from: accounts[0]
        });

    console.log('Contract deployed to: ', result.options.address);
    provider.engine.stop();
};

deploy();