require("dotenv").config();

const mongoose = require("mongoose");

const db_url = `mongodb://${process.env.NAME}:${process.env.PASSWORD}@ac-mheu7uz-shard-00-00.g2nhctu.mongodb.net:27017,ac-mheu7uz-shard-00-01.g2nhctu.mongodb.net:27017,ac-mheu7uz-shard-00-02.g2nhctu.mongodb.net:27017/?ssl=true&replicaSet=atlas-xhyklz-shard-0&authSource=admin&retryWrites=true&w=majority&appName=practice-jwt-Cluster1`;

mongoose.connect(db_url);
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});
