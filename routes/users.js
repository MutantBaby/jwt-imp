const mongoose = require("mongoose");
const router = require("express").Router();

const passport = require("../config/passport");
const { authMiddleware } = require("../middleware/authentication");
const { genPassword, genToken, validPassword } = require("../utils/index");

const User = mongoose.model("User");

// passport middleware for handling jwt
router.get(
  "/protected1",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.json({ success: true, message: "You are authenticated" });
  }
);

// custom middleware for handling jwt
router.get("/protected2", authMiddleware, (req, res, next) => {
  res.json({ success: true, message: "You are authenticated" });
});
 
router.post("/register", async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password || username === "" || password === "")
    res.status(400).json({ success: false, message: "Invalid Input" });

  const saltHash = genPassword(password);
  const { salt, hash } = saltHash;

  /**
   * @type {mongoose.Document}
   */

  const newUser = new User({
    username: username,
    hash: hash,
    salt: salt,
    admin: true,
  });

  try {
    const user = await newUser.save();

    if (!user)
      res.status(400).json({
        success: false,
        message: "Some Issue Occured. Sign-up Again",
      });

    res.json({ success: true, message: "User is Created" });
  } catch (error) {
    console.log("Error >>> ", error);
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password || username === "" || password === "")
    res.status(400).send("Invalid Input");

  try {
    /**
     * @type {mongoose.Document}
     */

    const user = await User.findOne({ username });

    if (!user)
      res.status(400).json({ success: false, message: "User Not Found!" });

    const isValid = validPassword(password, user.hash, user.salt);

    if (!isValid)
      res.status(400).json({ success: false, message: "Invalid Password" });

    const { token, expires } = genToken(user);
    res.json({ success: true, user: user, token: token, expiresIn: expires });
  } catch (error) {
    console.log("Error >>> ", error);
    next(error);
  }
});

module.exports = router;
