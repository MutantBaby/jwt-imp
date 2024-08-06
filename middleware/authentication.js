const fs = require("node:fs");
const path = require("node:path");
const jsonWebToken = require("jsonwebtoken");

const pathToPriKey = path.join(__dirname, "..", "keys", "id_rsa_pri.pem");
const privateKey = fs.readFileSync(pathToPriKey, "utf8");

const pathToPubKey = path.join(__dirname, "..", "keys", "id_rsa_pub.pem");
const publicKey = fs.readFileSync(pathToPubKey, "utf8");

async function authMiddleware(req, res, next) {
  const tokenParts = req.headers.authorization.split(" ");

  if (
    tokenParts[0] !== "Bearer" &&
    tokenParts[1].match(/\S+\.\S+\.\S+/) === null
  )
    res.status(401).json({ success: false, message: "Not Authorized" });

  try {
    const payload = jsonWebToken.verify(tokenParts[1], publicKey, {
      algorithms: ["RS256"],
    });

    req.jwt = payload;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Not Authorized" });
  }
}

module.exports.authMiddleware = authMiddleware;
