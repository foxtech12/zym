const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  selectedClass: String,
  message: String,
  date: { type: Date, default: Date.now }, // Automatically stores the current date
  time: { type: String, default: () => new Date().toLocaleTimeString() }, // Stores the current time
});

module.exports = mongoose.model("Contact", ContactSchema);
