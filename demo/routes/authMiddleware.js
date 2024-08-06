function isAuth(req, res, next) {
  if (req.isAuthenticated()) next();
  else res.status(401).json({ message: "Not Authenticated" });
}

function isAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.admin) next();
  else res.status(401).json({ message: "Only Admin Can Access" });
}

module.exports.isAuth = isAuth;
module.exports.isAdmin = isAdmin;
