const mongoose = require("mongoose");

const recepieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
  },
  img: {
    type: String,
  },
  category: {
    type: String,
  },
});

const Recepie = mongoose.model("Recepie", recepieSchema);

module.exports = Recepie;
