const mongoose = require("mongoose");

const { Schema } = mongoose;
const userSchema = new Schema({
  gender: {
    type: String,
    required: true,
  },
  animal: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
