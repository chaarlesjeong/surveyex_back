//Express
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.PORT || 4000;
const USER = require("./models/user");

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

//mongoDB
const mongoose = require("mongoose");

const MONGO_URL = `mongodb+srv://scott:tiger@cluster0-0gyic.mongodb.net/react_survey?retryWrites=true&w=majority`;

mongoose
  .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch((e) => {
    console.error("Connection error", e.message);
  });
const db = mongoose.connection;

db.once("open", () => {
  console.log("mongoDB Connected");
});

app.post("/submit", (req, res) => {
  const user = new USER({
    gender: req.body.gender,
    animal: req.body.animal,
  });

  user.save().then((r) => res.status(201).json(r));

  /* res.json({
    gender: req.body.gender,
    animal: req.body.animal,
  }); */
});

app.get("/result",async (req, res) => {
  // USER.find().count();
  let result = {
    mt: await USER.countDocuments({ gender: "Male", animal: "Tiger" }),
    me: await USER.countDocuments({ gender: "Male", animal: "Elephant" }),
    ft: await USER.countDocuments({ gender: "Female", animal: "Tiger" }),
    fe: await USER.countDocuments({ gender: "Female", animal: "Elephant" }),
  };

  res.json(result);
});

app.listen(port, () => {
  console.log(`Express server has running on port ${port}`);
});
