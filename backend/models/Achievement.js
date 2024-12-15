const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Registration",
    required: true,
  },
  eventName: {
    type: String,
    required: false, // No longer required
  },
  eventDate: {
    type: Date,
    required: false, // No longer required
  },
  rank: {
    type: String,
    required: false, // No longer required
  },
  place: {
    type: String,
    required: false, // No longer required
  },
  state: {
    type: String,
    required: false, // No longer required
  },
  eventtype: {
    type: String,
    required: false, // No longer required
  },
  location: {
    type: String,
    required: false, // No longer required
  },
  certificate: {
    type: String, // Store the binary data of the certificate
    required: false, // No longer required
  },
}, { timestamps: true });

const Achievement = mongoose.model("Achievement", achievementSchema);

module.exports = Achievement;
