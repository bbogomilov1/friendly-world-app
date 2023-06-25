const mongoose = require("mongoose");

const animalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    min: [2, "Name should be at least 2 characters long"],
  },

  years: {
    type: Number,
    required: [true, "Years are required"],
    min: [1, "Years should be between 1 and 100"],
    max: [100, "Years should be between 1 and 100"],
  },
  kind: {
    type: String,
    required: [true, "Kind is required"],
    min: [3, "Name should be at least 3 characters long"],
  },
  imageUrl: {
    type: String,
    required: [true, "Link to image is required"],
    match: [/^htpps?:\/\//, "Invalid link to image"],
  },
  need: {
    type: String,
    required: [true, "Need is required"],
    min: [3, "Need should be at least 3 characters long"],
    max: [20, "Need should not be longer than 20 characters"],
  },
  location: {
    type: String,
    required: [true, "Location is required"],
    min: [5, "Need should be at least 5 characters long"],
    max: [15, "Need should not be longer than 15 characters"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    min: [5, "Need should be at least 5 characters long"],
    max: [50, "Need should not be longer than 50 characters"],
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  donations: [
    {
      userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    },
  ],
});

const Animal = mongoose.model("Animal", animalSchema);

module.exports = Animal;
