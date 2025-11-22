const { ethers } = require("ethers");
const dotenv = require("dotenv");
const express = require("express");
const router = express.Router();
// ABI and contract addresses would be imported/defined elsewhere
const Consent = require("../../../artifacts/contracts/ConsentContract.sol/ConsentContract.json");
const Identity = require("../../../artifacts/contracts/IdentityContract.sol/IdentityContract.json");
const requirePatientAuth = require("../middlewares/requirePatientAuth");


// Provider and signer setup (usually via wallet, session, or server-held privateKey)
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const consentContract = new ethers.Contract("0x5FbDB2315678afecb367f032d93F642f64180aa3", Consent.abi, provider);
const identityContract = new ethers.Contract("0x5FbDB2315678afecb367f032d93F642f64180aa3", Identity.abi, provider);


dotenv.config();


// Example POST /api/access/grant
router.post("/grant", requirePatientAuth, async (req, res) => {
  try {
    const { privateKey, walletAddress } = req.body;

    if (!privateKey || !walletAddress) {
      return res.status(400).json({ error: "Private key and doctor address required" });
    }

    const patientWallet = new ethers.Wallet(privateKey, provider);
 console.log(patientWallet)
    // Ensure the patient is the logged-in user
    if (patientWallet.address.toLowerCase() !== req.patient.walletAddress.toLowerCase()) {
      return res.status(403).json({ error: "Private key does not match logged-in patient" });
    }

    // Check patient is registered on blockchain
    const role = await identityContract.getRole(patientWallet.address);
    console.log(role)

    if (Number(role) !== 3) {
      return res.status(403).json({ error: "Wallet is NOT registered as Patient on blockchain" });
    }
console.log(walletAddress)
    // Check doctor is valid doctor
    const doctorRole = await identityContract.getRole(walletAddress);
    console.log(doctorRole)
    if (Number(doctorRole) !== 2) {
      return res.status(400).json({ error: "Provided address is NOT a registered Doctor" });
    }

    const consentWithSigner = consentContract.connect(patientWallet);
    console.log(consentWithSigner)
    const tx = await consentWithSigner.giveConsent(walletAddress);
    await tx.wait();

    res.json({
      success: true,
      message: "Consent granted successfully",
      txHash: tx.hash
    });

  } catch (err) {
    console.error("Consent error:", err);
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;