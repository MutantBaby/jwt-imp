const crypto = require("node:crypto");

// data protection
function encryptWithPublicKey(publicKey, message) {
  const buffer = Buffer.from(message, "utf8");

  return crypto.publicEncrypt(publicKey, buffer);
}

// digital signature
function encryptWithPrivateKey(publicKey, message) {
  const buffer = Buffer.from(message, "utf8");

  return crypto.privateEncrypt(publicKey, buffer);
}

module.exports.encryptWithPublicKey = encryptWithPublicKey;
module.exports.encryptWithPrivateKey = encryptWithPrivateKey;
