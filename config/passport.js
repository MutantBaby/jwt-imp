const fs = require("node:fs");
const path = require("node:path");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const User = require("mongoose").model("User");

const pathToKey = path.join(__dirname, "..", "keys", "id_rsa_pub.pem");
const publicKey = fs.readFileSync(pathToKey, "utf8");

// ! Example
const passportJWTOption = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: publicKey,
  algorithms: ["RS256"],
  issuer: "Enter issuer here",
  audience: "Enter audience here",
  ignoreExpiration: false,
  passReqToCallback: false,
  jsonWebTokenOptions: {
    maxAge: "2d",
    complete: false,
    clockTolerance: "100",
    nonce: "String here for OPENID",
  },
};

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: publicKey,
  algorithms: ["RS256"],
};

const verifyCallback = async (payload, cb) => {
  try {
    const user = User.findOne({ _id: payload.sub });

    if (!user) return cb(null, false);

    return cb(null, user);
  } catch (error) {
    return cb(error, null);
  }
};

const strategy = new JwtStrategy(options, verifyCallback);

passport.use(strategy);

module.exports = passport;
