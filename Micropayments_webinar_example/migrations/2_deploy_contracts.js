var Micropayments = artifacts.require("./Micropayments.sol");

module.exports = function(deployer) {
    deployer.deploy(Micropayments);
};