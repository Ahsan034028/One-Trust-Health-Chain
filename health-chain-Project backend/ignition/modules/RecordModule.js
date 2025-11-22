const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("RecordModule", (m) => {
  // Try to obtain dependency modules when running inside Ignition normally.
  // If `m.getModule` is not available (deploying the module in isolation),
  // fall back to reading previously written deployed addresses file.
  const path = require("path");
  const fs = require("fs");

  let identityAddress;
  let consentAddress;

  if (m && typeof m.getModule === "function") {
    const identity = m.getModule("IdentityModule");
    const consent = m.getModule("ConsentModule");
    identityAddress = identity.identityContract.address;
    consentAddress = consent.consentContract.address;
  } else {
    // fallback: read from ignition deployments file
    const deployedPath = path.join(process.cwd(), "ignition", "deployments", "chain-31337", "deployed_addresses.json");
    if (!fs.existsSync(deployedPath)) throw new Error(`Cannot find deployed addresses at ${deployedPath}`);
    const deployed = JSON.parse(fs.readFileSync(deployedPath, "utf8"));
    identityAddress = deployed["IdentityModule#IdentityContract"];
    consentAddress = deployed["ConsentModule#ConsentContract"];
    if (!identityAddress || !consentAddress) throw new Error("Missing Identity or Consent addresses in deployments file");
  }

  const recordContract = m.contract("RecordContract", [identityAddress, consentAddress]);
  return { recordContract };
});
