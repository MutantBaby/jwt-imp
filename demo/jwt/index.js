const fs = require("node:fs");
const crypto = require("node:crypto");
const base64url = require("base64url");

const verifyFunction = crypto.createVerify("RSA-SHA256");
const signatureFunction = crypto.createSign("RSA-SHA256");

// INSSUANCE

const headerObj = { alg: "RS256", typ: "JWT" };

const payloadObj = {
  sub: "1234567890",
  name: "John Doe",
  admin: true,
  iat: 1516239022,
};

const headerObjStr = JSON.stringify(headerObj);
const payloadObjStr = JSON.stringify(payloadObj);

const base64urlHeader = base64url(headerObjStr);
const base64urlPayload = base64url(payloadObjStr);

signatureFunction.write(base64urlHeader + "." + base64urlPayload);
signatureFunction.end();

const privateKey = fs.readFileSync(__dirname + "/pri_key.pem", "utf8");
const signatureBase64 = signatureFunction.sign(privateKey, "base64url");

// console.log("signatureBase64 ", signatureBase64);

// INSSUANCE

// VERIFICATION

const JWT =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.NHVaYe26MbtOYhSKkoKYdFVomg4i8ZJd8_-RU8VNbftc4TSMb4bXP3l3YlNWACwyXPGffz5aXHc6lty1Y2t4SWRqGteragsVdZufDn5BlnJl9pdR_kdVFUsra2rWKEofkZeIC4yWytE58sMIihvo9H1ScmmVwBcQP6XETqYd0aSHp1gOa9RdUPDvoXQ5oqygTqVtxaDr6wUFKrKItgBMzWIdNZ6y7O9E0DhEPTbE9rfBo6KTFsHAZnMg4k68CDp2woYIaXbmYTWcvbzIuHO7_37GT79XdIwkm95QJ7hYC9RiwrV7mesbY4PAahERJawntho0my942XheVLmGwLMBkQ";

const jwtParts = JWT.split(".");

const headerInBase64UrlFormat = jwtParts[0];
const payloadInBase64UrlFormat = jwtParts[1];
const signatureInBase64UrlFormat = jwtParts[2];

verifyFunction.write(headerInBase64UrlFormat + "." + payloadInBase64UrlFormat);
verifyFunction.end();

const jwtSignatureBase64 = base64url.toBase64(signatureInBase64UrlFormat);
const publicKey = fs.readFileSync(__dirname + "/pub_key.pem", "utf8");

const signatureIsValid = verifyFunction.verify(
  publicKey,
  jwtSignatureBase64,
  "base64"
);

console.log("signatureIsValid ", signatureIsValid);

// VERIFICATION

const decodedHeader = base64url.decode(headerInBase64UrlFormat);
const decodedPayload = base64url.decode(payloadInBase64UrlFormat);
const decodedSignature = base64url.decode(signatureInBase64UrlFormat);

console.log("\n\n Header: ", decodedHeader, "\n\n Payload: ", decodedPayload);
