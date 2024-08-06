const fs = require("node:fs");
const jwt = require("jsonwebtoken");

const publicKey = fs.readFileSync(__dirname + "/pub_key.pem", "utf8");
const privateKey = fs.readFileSync(__dirname + "/pri_key.pem", "utf8");

const payloadObj = {
  sub: "1234567890",
  name: "John Doe",
  admin: true,
  iat: 1516239022,
};

const signedJWT = jwt.sign(payloadObj, privateKey, { algorithm: "RS256" });
console.log("signedJWT ", signedJWT);

jwt.verify(signedJWT, publicKey, { algorithms: "RS256" }, (err, payload) => {
  console.log("payload ", payload);
});
