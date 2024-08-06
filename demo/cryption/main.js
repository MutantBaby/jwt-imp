const fs = require("node:fs");
const { encryptWithPublicKey } = require("./encrypt");
const { decryptWithPrivateKey } = require("./decrypt");

const publicKey = fs.readFileSync(__dirname + "/id_rsa_pub.pem", "utf8");
const encryptedMessage = encryptWithPublicKey(publicKey, "Hello, World!");

console.log(encryptedMessage.toString());

const privateKey = fs.readFileSync(__dirname + "/id_rsa_pri.pem", "utf8");
const decryptedMessage = decryptWithPrivateKey(privateKey, encryptedMessage);

console.log(decryptedMessage.toString());
