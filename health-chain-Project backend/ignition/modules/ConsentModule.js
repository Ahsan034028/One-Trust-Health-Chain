const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("ConsentModule", (m) => {
  // Use IdentityContract from IdentityModule
  const identity = m.getModule("IdentityModule");

  const consentContract = m.contract("ConsentContract", [
    identity.identityContract.address // pass deployed IdentityContract address
  ]);

  return { consentContract };
});
