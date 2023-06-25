const router = require("express").Router();
const animalManager = require("../managers/animalManager");

router.get("/", async (req, res) => {
  const animals = await animalManager.getAll().lean();
  const lastAnimalsAdded = animals.slice(-3).reverse();

  res.render("home", { lastAnimalsAdded });
});

router.get("/search", async (req, res) => {
  const filteredAnimals = await animalManager.getAll().lean();

  res.render("search", { filteredAnimals });
});

router.post("/search", async (req, res) => {
  const animals = await animalManager.getAll().lean();
  const searchedWord = req.body.search;
  const filteredAnimals = animals.filter((animal) =>
    animal.location.toLowerCase().includes(searchedWord.toLowerCase())
  );

  res.render("search", { filteredAnimals });
});

router.get("/404", (req, res) => {
  res.render("404");
});

module.exports = router;
