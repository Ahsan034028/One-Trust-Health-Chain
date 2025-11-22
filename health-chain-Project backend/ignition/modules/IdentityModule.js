const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("IdentityModule", (m) => {
  const identityContract = m.contract("IdentityContract"); // deploys new contract
  return { identityContract };
});
