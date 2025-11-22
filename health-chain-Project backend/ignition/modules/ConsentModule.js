const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("ConsentModule", (m) => {
  const consentContract = m.contract("ConsentContract", [
    "0x5FbDB2315678afecb367f032d93F642f64180aa3"
  ]);

  return { consentContract };
});
