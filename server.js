//mongoDB
const mongoose = require("mongoose");

const { MONGO_ID, MONGO_PASSWORD, NODE_ENV } = process.env;
const MONGO_URL = `mongodb://${MONGO_ID}:${MONGO_PASSWORD}@localhost:4000/admin`;

module.exports = () => {
  const connect = () => {
    if (NODE_ENV !== "production") {
      mongoose.set("debug", true);
    }
    mongoose.connect(
      MONGO_URL,
      {
        dbName: "reactdb_survey",
      },
      (error) => {
        if (error) {
          console.log("mongoDB Connect Failed", error);
        } else {
          console.log("mongoDB Connect Success");
        }
      }
    );
  };
  connect();

  mongoose.connection.on("error", (error) => {
    console.error("mongoDB Connect Error", error);
  });
  mongoose.connection.on("disconnected", () => {
    console.error("mongoDB Disconnected. Reconnecting...");
    connect();
  });

  require("./user");
};

//Express
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.PORT || 4000;

app.use(express.static("public"));
app.use(cors());
app.use(bodyParser.json());

app.post("/");

app.listen(port, () => {
  console.log(`Express server has running on port ${port}`);
});
