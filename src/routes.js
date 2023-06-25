const routes = require("express").Router();
const homeController = require("./controllers/homeController");
const userController = require("./controllers/userController");
const animalsController = require("./controllers/animalsController");

routes.use(homeController);
routes.use("/users", userController);
routes.use("/animals", animalsController);
routes.use("*", (req, res) => {
  res.redirect("/404");
});

module.exports = routes;
