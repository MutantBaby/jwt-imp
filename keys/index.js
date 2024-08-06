const fs = require("node:fs");
const crypto = require("node:crypto");

function genKeyPair() {
  const keepPair = crypto.generateKeyPairSync("rsa", {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
  });

  fs.writeFileSync(__dirname + "/id_rsa_pub.pem", keepPair.publicKey);
  fs.writeFileSync(__dirname + "/id_rsa_pri.pem", keepPair.privateKey);
}

genKeyPair();
