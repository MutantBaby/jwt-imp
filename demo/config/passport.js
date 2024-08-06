const passport = require("passport");
const LocalStrategy = require("passport-local");

const connection = require("./database");
const { validPassword } = require("../lib/utils");

require("dotenv").config();

const User = connection.models.User;

const customFields = {
  usernameField: "uname" | "name" | "username",
  passwordField: "pw" | "pword" | "password",
};

const verifyCallback = async (username, password, cb) => {
  try {
    const user = await User.findOne({ username: username });

    if (!user) return cb(null, false);

    const isValid = validPassword(password, user.hash, user.salt);

    if (!isValid) return cb(null, false);
    else return cb(null, user);
  } catch (error) {
    return cb(error);
  }
};

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser(function (user, cd) {
  cd(null, user.id);
});

passport.deserializeUser(async function (id, cd) {
  try {
    const user = await User.findById(id);
    cd(null, user);
  } catch (error) {
    cd(error);
  }
});
