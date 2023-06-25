const animalManager = require("../managers/animalManager");
const { getErrorMessage } = require("../utils/errorHelpers");

const router = require("express").Router();

router.get("/dashboard", async (req, res) => {
  const animals = await animalManager.getAll().lean();

  res.render("animals/dashboard", { animals });
});

router.get("/create", (req, res) => {
  res.render("animals/create");
});

router.post("/create", async (req, res) => {
  const animalData = { ...req.body, owner: req.user._id };

  try {
    await animalManager.create(animalData);

    res.redirect("/animals/dashboard");
  } catch (error) {
    res.render("animals/create", { error: getErrorMessage(error), animalData });
  }
});

router.get("/:animalId/details", async (req, res) => {
  const animalId = req.params.animalId;
  const animal = await animalManager.getOne(animalId).lean();
  const isOwner = req.user?._id == animal.owner._id;

  res.render("animals/details", { animal, isOwner });
});

router.get("/:animalId/delete", async (req, res) => {
  const animalId = req.params.animalId;

  try {
    await animalManager.delete(animalId);

    res.redirect("/animals/dashboard");
  } catch (error) {
    res.render("animals/details", {
      error: "Could not delete photo :(",
    });
  }
});

router.get("/:animalId/edit", async (req, res) => {
  const animalId = req.params.animalId;
  const animal = await animalManager.getOne(animalId).lean();

  res.render("animals/edit", { animal });
});

router.post("/:animalId/edit", async (req, res) => {
  const animalId = req.params.animalId;
  const animalData = req.body;

  try {
    await animalManager.edit(animalId, animalData);

    res.redirect(`/animals/${animalId}/details`);
  } catch (error) {
    res.render(`animals/details`, {
      error: "Could not update animal :(",
      ...animalData,
    });
  }
});

// router.post("/:animalId/donate", async (req, res) => {
//   const animalId = req.params.animalId;
//   const userId = req.user._id;

//   try {
//     await animalManager.donate(animalId, { userId });

//     res.redirect(`/animals/${animalId}/details`);
//   } catch (error) {
//     res.render("animals/details", {
//       error: "Could not donate :(",
//     });
//   }
// });

module.exports = router;
