const crypto = require("node:crypto");

require("dotenv").config();

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

module.exports.validPassword = validPassword;
module.exports.genPassword = genPassword;
