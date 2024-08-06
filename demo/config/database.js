const mongoose = require("mongoose");

require("dotenv").config();

const db_url = `mongodb://${process.env.NAME}:${process.env.PASSWORD}@ac-mheu7uz-shard-00-00.g2nhctu.mongodb.net:27017,ac-mheu7uz-shard-00-01.g2nhctu.mongodb.net:27017,ac-mheu7uz-shard-00-02.g2nhctu.mongodb.net:27017/?ssl=true&replicaSet=atlas-xhyklz-shard-0&authSource=admin&retryWrites=true&w=majority&appName=practice-jwt-Cluster1`;

const connection = mongoose.createConnection(db_url);

const UserSchema = new mongoose.Schema({
  username: String,
  hash: String,
  salt: String,
  admin: Boolean,
});

const User = connection.model("User", UserSchema);

module.exports = connection;
