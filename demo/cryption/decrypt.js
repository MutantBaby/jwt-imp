const crypto = require("node:crypto");

// data protection
function decryptWithPrivateKey(privateKey, encryptedMessage) {
  return crypto.privateDecrypt(privateKey, encryptedMessage);
}

// digital signature
function decryptWithPublicKey(privateKey, encryptedMessage) {
  return crypto.publicDecrypt(privateKey, encryptedMessage);
}

module.exports.decryptWithPrivateKey = decryptWithPrivateKey;
module.exports.decryptWithPublicKey = decryptWithPublicKey;
