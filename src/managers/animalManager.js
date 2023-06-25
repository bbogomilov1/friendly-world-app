const Animal = require("../models/animalModel");

exports.getAll = () => Animal.find().populate("owner");

exports.getOne = (animalId) => Animal.findById(animalId).populate("owner");

exports.create = (animalData) => Animal.create(animalData);

exports.edit = (animalId, animalData) =>
  Animal.findByIdAndUpdate(animalId, animalData);

// exports.donate = async (animalId, userId) => {
//   const animal = await Animal.findById(animalId);

//   animal.donations.push(userId);

//   return animal.save();
// };

exports.delete = (animalId) => Animal.findByIdAndDelete(animalId);
