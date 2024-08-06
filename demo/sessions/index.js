const express = require("express");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const router = require("../routes/index");

const app = express();

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db_url = `mongodb://${process.env.NAME}:${process.env.PASSWORD}@ac-mheu7uz-shard-00-00.g2nhctu.mongodb.net:27017,ac-mheu7uz-shard-00-01.g2nhctu.mongodb.net:27017,ac-mheu7uz-shard-00-02.g2nhctu.mongodb.net:27017/?ssl=true&replicaSet=atlas-xhyklz-shard-0&authSource=admin&retryWrites=true&w=majority&appName=practice-jwt-Cluster1`;

const sessionStore = MongoStore.create({
  mongoUrl: db_url,
  dbName: "dbPracticeSession",
  collectionName: "sessions",
});

app.use(
  session({
    resave: false,
    store: sessionStore,
    saveUninitialized: true,
    secret: process.env.SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, //Equals 24 hours
    },
  })
);

require("../config/passport");

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log("Session >>> ", req.session);
  console.log("User >>> ", req.user);
  next();
});

app.use(router);

app.listen(3000);
