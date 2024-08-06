const fs = require("node:fs");
const crypto = require("node:crypto");

const { encryptWithPrivateKey } = require("./encrypt");

const hash = crypto.createHash("sha256");

const data = {
  firstName: "mutant",
  lastName: "baby",
  socialSecurityNumber: "123-45-6789",
};

const dataString = JSON.stringify(data);

hash.update(dataString);
const hashedData = hash.digest("hex");

const senderPrivateKey = fs.readFileSync(__dirname + "/id_rsa_pri.pem", "utf8");
const signature = encryptWithPrivateKey(senderPrivateKey, hashedData);

const packageOfDateToSend = {
  signature,
  originalData: data,
  algorithm: "sha256",
};

module.exports.packageOfDateToSend = packageOfDateToSend;
