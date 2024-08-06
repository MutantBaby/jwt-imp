const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const jsonWebToken = require("jsonwebtoken");

require("dotenv").config();

const pathToKey = path.join(__dirname, "..", "keys", "id_rsa_pri.pem");
const privateKey = fs.readFileSync(pathToKey, "utf8");

function validPassword(password, hash, salt) {
  return crypto
    .pbkdf2Sync(password, salt, 10001, 64, "sha512")
    .toString("hex") === hash
    ? true
    : false;
}

function genPassword(password) {
  const salt = crypto.randomBytes(32).toString("hex");
  const genHash = crypto
    .pbkdf2Sync(password, salt, 10001, 64, "sha512")
    .toString("hex");

  return {
    salt: salt,
    hash: genHash,
  };
}

/**
 * @typedef {import('mongoose').Document} NewUser
 */

/**
 * @param {NewUser} user
 * @returns {{token: string, expires: string}}
 */

function genToken(user) {
  const _id = user._id;
  const expiresIn = "1d";

  const payload = {
    sub: _id,
    iat: Date.now(),
  };

  const signedToken = jsonWebToken.sign(payload, privateKey, {
    expiresIn,
    algorithm: "RS256",
  });

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn,
  };
}

module.exports.validPassword = validPassword;
module.exports.genPassword = genPassword;
module.exports.genToken = genToken;
