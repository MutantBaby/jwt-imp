require("dotenv").config();

const cors = require("cors");
const path = require("node:path");
const express = require("express");
const passport = require("passport");

const session = require("./sessions/index");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.use(session);

require("./database");
require("./models/index");
require("./config/passport");

app.use(passport.initialize());
app.use(passport.session());

app.use(require("./routes"));

app.listen(3000);
