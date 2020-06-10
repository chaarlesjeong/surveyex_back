const mongoose = require("mongoose");

const { Schema } = mongoose;
const userSchema = new Schema({
  gender: {
    type: Number,
    required: true,
  },
  animal: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
