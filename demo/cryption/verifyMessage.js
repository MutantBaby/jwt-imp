const fs = require("node:fs");
const crypto = require("node:crypto");

const { decryptWithPublicKey } = require("./decrypt");
const { packageOfDateToSend } = require("./signMessage");

const hash = crypto.createHash(packageOfDateToSend.algorithm);
const senderPublicKey = fs.readFileSync(__dirname + "/id_rsa_pub.pem", "utf8");
const hashData = decryptWithPublicKey(
  senderPublicKey,
  packageOfDateToSend.signature
);

const hashDataString = hashData.toString();
hash.update(JSON.stringify(packageOfDateToSend.originalData));
const data = hash.digest("hex");

if (data === hashDataString) console.log("Data is safe");
else console.log("Data is compromised");
