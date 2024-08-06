const passport = require("passport");
const router = require("express").Router();

const { genPassword } = require("../lib/utils");
const connection = require("../config/database");
const { isAuth, isAdmin } = require("./authMiddleware");

const User = connection.models.User;

// ROUTE POST

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login-failure",
    successRedirect: "/login-success",
  })
);

router.post("/register", async (req, res, next) => {
  if (!req.body.username || !req.body.password)
    res.status(400).send("Invalid Input");

  const saltHash = genPassword(req.body.password);
  const { salt, hash } = saltHash;

  const newUser = new User({
    username: req.body.username,
    hash: hash,
    salt: salt,
    admin: true,
  });

  try {
    const user = await newUser.save();
    console.log("User Created >>> ", user);
  } catch (error) {
    console.log("Error >>> ", error);
  }

  res.redirect("/login");
});

// ROUTE GET

router.get("/", (req, res, next) => {
  const comp = `
    <div>
      <h1>Hello World</h1>
      <a href="/register" >Register</a>
    </div>
  `;

  res.send(comp);
});

router.get("/login", (req, res, next) => {
  const comp = `
    <div>
      <h1>Login Page</h1>

      <form method='POST' action='/login'>
        <input type='text' name='username' placeholder='Username'/> <br />
        <input type='password' name='password' placeholder='Password'/> <br />
        <input type='submit' value='submit'/> <br /><br />
      </form>
    </div>
  `;

  res.send(comp);
});

router.get("/register", (req, res, next) => {
  const comp = `
    <div>
      <h1>Register Page</h1>

      <form method='POST' action='/register' >
        <input type='text' name='username' placeholder='Username'/> <br />
        <input type='password' name='password' placeholder='Password'/> <br />
        <input type='submit' value='submit'/> <br /><br />
      </form>
    </div>
  `;

  res.send(comp);
});

router.get("/protected-route", isAuth, (req, res, next) => {
  res.send(`<div>
      <h1>You Are Authenticated</h1>
      <a href="/logout">Logout & Reload</a>
    </div>`);
});

router.get("/admin-route", isAdmin, (req, res, next) => {
  res.send(`<div>
      <h1>You Are Admin</h1>
      <a href="/logout">Logout & Reload</a>
    </div>`);
});

router.get("/logout", (req, res, next) => {
  req.logout(() => res.redirect("/protected-route"));
});

router.get("/login-success", (req, res, next) => {
  res.send(`<div>
      <h1>Successfully Login</h1>
      <a href="/protected-route">Move To Protected Route</a>
    </div>`);
});

router.get("/login-failure", (req, res, next) => {
  res.send(`<p>Entered Wrong Password</p>`);
});

module.exports = router;
