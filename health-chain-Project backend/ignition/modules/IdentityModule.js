const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("IdentityModule", (m) => {
  // Attach to deployed IdentityContract
  const identityContract = m.contract("IdentityContract");

  return { identityContract };
});
